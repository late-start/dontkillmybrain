import Anthropic from "@anthropic-ai/sdk";
import { Turn, TurnClassification, Signal } from "@/lib/engine/types";
import { CLASSIFIER_PROMPT } from "@/lib/engine/prompts";

const VALID_SIGNALS: Signal[] = [
  "steering",
  "friction",
  "contribution",
  "evaluation",
  "passive_acceptance",
  "delegation",
  "capitulation",
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
      system: CLASSIFIER_PROMPT,
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
      : "unknown";

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
      signal: "unknown",
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
