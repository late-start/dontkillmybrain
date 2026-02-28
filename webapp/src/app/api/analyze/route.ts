import { NextRequest } from "next/server";
import { parseInput } from "@/lib/parsers";
import { classifyTurnsStreaming } from "@/lib/engine/classifier";
import { generateNarrative } from "@/lib/engine/narrator";
import type { TurnClassification } from "@/lib/engine/types";

// Allow up to 5 minutes for flex processing retries + AI analysis
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { input } = body as { input?: string };

    if (!input || typeof input !== "string" || !input.trim()) {
      return new Response(
        JSON.stringify({ error: "Missing or empty 'input' field." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const openaiKey = process.env.OPENAI_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    if (!openaiKey || !anthropicKey) {
      return new Response(
        JSON.stringify({ error: "Server API keys not configured." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Stage 0: Parse
    let transcript;
    try {
      transcript = await parseInput(input);
    } catch (parseError) {
      return new Response(
        JSON.stringify({
          error:
            parseError instanceof Error
              ? parseError.message
              : "Failed to parse input.",
        }),
        { status: 422, headers: { "Content-Type": "application/json" } }
      );
    }

    const humanTurnCount = transcript.turns.filter(
      (t) => t.role === "human"
    ).length;

    // Stream NDJSON events
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        function send(event: Record<string, unknown>) {
          controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
        }

        try {
          // Event 1: metadata
          send({
            type: "meta",
            platform: transcript.platform,
            humanTurnCount,
            turns: transcript.turns,
          });

          // Event 2+: signals stream in as they complete
          const allSignals: TurnClassification[] = [];

          await classifyTurnsStreaming(
            transcript.turns,
            openaiKey,
            (signal) => {
              allSignals.push(signal);
              send({ type: "signal", ...signal });
            }
          );

          // Event N+1: narrative (single event when complete)
          const narrativeResult = await generateNarrative(
            transcript.turns,
            allSignals.sort((a, b) => a.turnIndex - b.turnIndex),
            anthropicKey
          );

          send({ type: "narrative", ...narrativeResult });

          // Final event
          send({ type: "done" });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Internal server error";
          send({ type: "error", error: message });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "application/x-ndjson",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Analysis error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
