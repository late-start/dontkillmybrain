import { NextRequest, NextResponse } from "next/server";
import { parseInput } from "@/lib/parsers";
import { analyzeTranscript } from "@/lib/engine/analyze";

// Allow up to 60 seconds for headless browser scraping + AI analysis
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { input } = body as { input?: string };

    if (!input || typeof input !== "string" || !input.trim()) {
      return NextResponse.json(
        { error: "Missing or empty 'input' field." },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server API key not configured." },
        { status: 500 }
      );
    }

    // Stage 0: Parse the input into a structured transcript
    let transcript;
    try {
      transcript = await parseInput(input);
    } catch (parseError) {
      return NextResponse.json(
        {
          error:
            parseError instanceof Error
              ? parseError.message
              : "Failed to parse input.",
        },
        { status: 422 }
      );
    }

    // Stage 1 + 2: Classify turns and generate narrative
    const result = await analyzeTranscript(transcript, apiKey);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis error:", error);

    const message =
      error instanceof Error ? error.message : "Internal server error";

    if (message.includes("429") || message.includes("rate")) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again in a moment." },
        { status: 429 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
