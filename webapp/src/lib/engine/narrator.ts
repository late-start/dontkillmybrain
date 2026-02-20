import Anthropic from "@anthropic-ai/sdk";
import {
  Turn,
  TurnClassification,
  HighlightedMoment,
} from "@/lib/engine/types";
import { NARRATOR_PROMPT } from "@/lib/engine/prompts";

export async function generateNarrative(
  turns: Turn[],
  classifications: TurnClassification[],
  apiKey: string
): Promise<{
  sessionTitle: string;
  introNarrative: string;
  narrative: string;
  highlights: HighlightedMoment[];
  nudge: string;
}> {
  const client = new Anthropic({ apiKey });

  const transcriptText = turns
    .map((t) => `[Turn ${t.index}] ${t.role.toUpperCase()}:\n${t.content}`)
    .join("\n\n---\n\n");

  const classificationsText = classifications
    .map(
      (c) =>
        `Turn ${c.turnIndex}: ${c.signal} (confidence: ${c.confidence}) — ${c.rationale}`
    )
    .join("\n");

  const userMessage = `Here is the conversation transcript:\n\n${transcriptText}\n\n---\n\nHere are the turn-by-turn classifications:\n\n${classificationsText}\n\nPlease analyze this conversation and return the JSON response.`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    system: NARRATOR_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  let text =
    response.content[0].type === "text" ? response.content[0].text : "";

  // Strip markdown code fences if present
  text = text.trim();
  if (text.startsWith("```")) {
    text = text.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
  }

  try {
    const parsed = JSON.parse(text.trim());

    const highlights: HighlightedMoment[] = (parsed.highlights || []).map(
      (h: { turnIndex: number; annotation: string; humanMessage?: string }) => ({
        turnIndex: typeof h.turnIndex === "number" ? h.turnIndex : 0,
        annotation: h.annotation || "",
        humanMessage: h.humanMessage || "",
      })
    );

    return {
      sessionTitle: parsed.sessionTitle || "Untitled Conversation",
      introNarrative: parsed.introNarrative || "",
      narrative: parsed.narrative || "",
      highlights,
      nudge: parsed.nudge || "",
    };
  } catch {
    throw new Error(
      `Failed to parse narrative response from Sonnet: ${text.slice(0, 200)}`
    );
  }
}
