import Anthropic from "@anthropic-ai/sdk";
import { Turn, TurnClassification, Signal } from "@/lib/engine/types";

const SYSTEM_PROMPT = `You are an expert at analyzing human cognitive engagement in human-AI conversations.

Given a pair of messages (an AI message followed by a human response), classify the human's cognitive engagement into exactly ONE of these signals:

- **steering**: The human is deciding direction — introducing goals, constraints, or redirecting the conversation. They are shaping what happens next.
- **friction**: The human is pushing back — questioning, rejecting, challenging, or raising the bar. They disagree or want better.
- **contribution**: The human is bringing something the AI doesn't have — domain knowledge, personal experience, context, taste, or judgment that only they possess.
- **evaluation**: The human is assessing the AI's output — probing, verifying, modifying, or testing what the AI produced. They are actively checking quality.
- **passive_acceptance**: The human is accepting without meaningful engagement — short acknowledgments like "ok", "thanks", "got it", moving on without evaluation.
- **delegation**: The human is asking the AI to make judgments or decisions for them — offloading thinking, asking "what should I do?", or letting the AI choose.

Respond with ONLY a JSON object in this exact format (no markdown, no code fences):
{"signal": "<one of the 6 signals>", "confidence": <0.0 to 1.0>, "rationale": "<brief explanation>"}`;

const VALID_SIGNALS: Signal[] = [
  "steering",
  "friction",
  "contribution",
  "evaluation",
  "passive_acceptance",
  "delegation",
];

async function classifySingleTurn(
  client: Anthropic,
  precedingAiTurn: Turn | null,
  humanTurn: Turn
): Promise<TurnClassification> {
  const messages: Anthropic.MessageParam[] = [];

  let userContent = "";
  if (precedingAiTurn) {
    userContent += `AI message:\n${precedingAiTurn.content}\n\n`;
  }
  userContent += `Human response:\n${humanTurn.content}`;

  messages.push({ role: "user", content: userContent });

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 256,
      system: SYSTEM_PROMPT,
      messages,
    });

    let text =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Strip markdown code fences if present
    text = text.trim();
    if (text.startsWith("```")) {
      text = text.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
    }

    const parsed = JSON.parse(text.trim());

    const signal: Signal = VALID_SIGNALS.includes(parsed.signal)
      ? parsed.signal
      : "passive_acceptance";

    const confidence =
      typeof parsed.confidence === "number"
        ? Math.max(0, Math.min(1, parsed.confidence))
        : 0.5;

    const rationale =
      typeof parsed.rationale === "string"
        ? parsed.rationale
        : "Unable to determine rationale.";

    return {
      turnIndex: humanTurn.index,
      signal,
      confidence,
      rationale,
    };
  } catch (error) {
    return {
      turnIndex: humanTurn.index,
      signal: "passive_acceptance",
      confidence: 0,
      rationale: `Classification failed: ${error instanceof Error ? error.message : "unknown error"}`,
    };
  }
}

export async function classifyTurns(
  turns: Turn[],
  apiKey: string
): Promise<TurnClassification[]> {
  const client = new Anthropic({ apiKey });

  const humanTurns = turns.filter((t) => t.role === "human");

  const classificationTasks = humanTurns.map((humanTurn) => {
    const precedingAiTurn =
      turns.find(
        (t) => t.role === "ai" && t.index === humanTurn.index - 1
      ) ?? null;

    return { precedingAiTurn, humanTurn };
  });

  const results: TurnClassification[] = [];
  const BATCH_SIZE = 5;

  for (let i = 0; i < classificationTasks.length; i += BATCH_SIZE) {
    const batch = classificationTasks.slice(i, i + BATCH_SIZE);

    const batchResults = await Promise.all(
      batch.map((task) =>
        classifySingleTurn(client, task.precedingAiTurn, task.humanTurn)
      )
    );

    results.push(...batchResults);
  }

  return results.sort((a, b) => a.turnIndex - b.turnIndex);
}
