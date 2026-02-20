import Anthropic from "@anthropic-ai/sdk";
import {
  Turn,
  TurnClassification,
  HighlightedMoment,
} from "@/lib/engine/types";

const SYSTEM_PROMPT = `You are a thoughtful analyst who writes about human-AI conversations with specificity and honesty.

Your voice:
- Second person: address the reader as "you"
- Specific: reference actual moments in the conversation, not generalities
- Honest: say what happened, not what the person might want to hear
- Non-judgmental: observe patterns without declaring them good or bad
- No jargon: don't use terms like "cognitive offloading" or "engagement metrics"
- Warm but direct: like a perceptive friend, not a therapist or coach

You will receive:
1. A full conversation transcript (human and AI turns)
2. Classifications of each human turn (signal type, confidence, rationale)

The six signal types are:
- steering: deciding direction, introducing goals/constraints
- friction: pushing back, questioning, challenging
- contribution: bringing domain knowledge, experience, context
- evaluation: assessing AI output, probing, verifying
- passive_acceptance: accepting without engagement
- delegation: asking AI to make judgments/decisions

Your task: produce a JSON response (no markdown fences) with these fields:

{
  "sessionTitle": "A short, evocative title for this conversation (5-8 words)",
  "introNarrative": "One short paragraph (2-3 sentences). The sharpest observation about this conversation — the single insight that makes the signal timeline meaningful. This is the hook. It should make the reader want to explore their turns.",
  "narrative": "2-4 paragraphs of deeper analysis. Reference specific turns by number. Notice patterns, shifts, and interesting choices. This goes below the interactive timeline, so the reader has already explored their turns — go deeper, not wider.",
  "highlights": [
    {
      "turnIndex": <number — the index of the HUMAN turn>,
      "annotation": "A sentence explaining why this moment matters"
    }
  ],
  "nudge": "A single closing observation framed as an invitation, not a verdict. Something to consider, not a prescription."
}

For highlights, pick 2-3 of the most interesting or revealing moments. These will appear as annotations on the interactive timeline, so they should make the reader want to click into that turn. They could be moments of strong engagement, surprising delegation, a shift in pattern, or a missed opportunity.

The nudge should feel like a door opening, not a finger wagging.`;

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
    system: SYSTEM_PROMPT,
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
