import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
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

type Provider = "anthropic" | "openai";

interface ClassifierConfig {
  provider: Provider;
  model: string;
  reasoningEffort?: string;
  serviceTier?: string;
  noContext?: boolean;
}

const DEFAULT_CONFIG: ClassifierConfig = {
  provider: "openai",
  model: "gpt-5.2",
  noContext: true,
};

// Flex processing retry constants
const MAX_RETRIES = 5;
const BASE_DELAY_MS = 1000;
const MAX_DELAY_MS = 60000;
const FLEX_TIMEOUT_MS = 15 * 60 * 1000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseClassification(
  text: string,
  turnIndex: number
): TurnClassification {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned
      .replace(/^```(?:json)?\s*\n?/, "")
      .replace(/\n?```\s*$/, "");
  }

  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    cleaned = jsonMatch[0];
  }

  const parsed = JSON.parse(cleaned.trim());

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

  return { turnIndex, signal, confidence, rationale };
}

function buildTurnMessage(
  contextTurns: Turn[],
  precedingAiTurn: Turn | null,
  humanTurn: Turn
): string {
  let content = "";

  // Include preceding context window (earlier turns for pattern awareness)
  if (contextTurns.length > 0) {
    content += "Recent conversation context:\n";
    for (const t of contextTurns) {
      content += `[${t.role.toUpperCase()}]: ${t.content}\n\n`;
    }
    content += "---\n\nNow classify this human response:\n\n";
  }

  if (precedingAiTurn) {
    content += `AI message:\n${precedingAiTurn.content}\n\n`;
  }
  content += `Human response:\n${humanTurn.content}`;
  return content;
}

async function classifyWithAnthropic(
  client: Anthropic,
  model: string,
  contextTurns: Turn[],
  precedingAiTurn: Turn | null,
  humanTurn: Turn
): Promise<TurnClassification> {
  const response = await client.messages.create({
    model,
    max_tokens: 512,
    system: CLASSIFIER_PROMPT,
    messages: [{ role: "user", content: buildTurnMessage(contextTurns, precedingAiTurn, humanTurn) }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  return parseClassification(text, humanTurn.index);
}

/**
 * Classify with OpenAI using flex processing and exponential backoff retry.
 *
 * Flex processing provides batch-rate pricing (50% off) but with:
 * - Slower response times
 * - Occasional 429 "Resource Unavailable" errors (not charged)
 */
async function classifyWithOpenAI(
  client: OpenAI,
  model: string,
  contextTurns: Turn[],
  precedingAiTurn: Turn | null,
  humanTurn: Turn,
  reasoningEffort?: string,
  serviceTier?: string
): Promise<TurnClassification> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requestOptions: any = {
    model,
    max_completion_tokens: 512,
    service_tier: serviceTier || "flex",
    store: false,
    messages: [
      { role: "system", content: CLASSIFIER_PROMPT },
      { role: "user", content: buildTurnMessage(contextTurns, precedingAiTurn, humanTurn) },
    ],
  };

  // GPT-5 models: set reasoning_effort (default to 'none' for best accuracy)
  if (model.startsWith("gpt-5")) {
    requestOptions.reasoning_effort = reasoningEffort || "none";
  }

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await client.chat.completions.create(
        requestOptions,
        { timeout: FLEX_TIMEOUT_MS }
      );

      const text = response.choices[0]?.message?.content || "";
      return parseClassification(text, humanTurn.index);
    } catch (err: unknown) {
      lastError = err instanceof Error ? err : new Error(String(err));

      const is429 =
        lastError.message.includes("429") ||
        (err && typeof err === "object" && "status" in err && (err as { status: number }).status === 429);

      if (is429 && attempt < MAX_RETRIES - 1) {
        const delay = Math.min(
          BASE_DELAY_MS * Math.pow(2, attempt) + Math.random() * 1000,
          MAX_DELAY_MS
        );
        console.log(
          `[Classifier] Flex 429, retrying in ${Math.round(delay / 1000)}s (attempt ${attempt + 1}/${MAX_RETRIES})`
        );
        await sleep(delay);
        continue;
      }

      throw lastError;
    }
  }

  throw lastError || new Error("Max retries exceeded");
}

async function classifySingleTurn(
  anthropicClient: Anthropic | null,
  openaiClient: OpenAI | null,
  config: ClassifierConfig,
  contextTurns: Turn[],
  precedingAiTurn: Turn | null,
  humanTurn: Turn
): Promise<TurnClassification> {
  try {
    if (config.provider === "openai" && openaiClient) {
      return await classifyWithOpenAI(
        openaiClient,
        config.model,
        contextTurns,
        precedingAiTurn,
        humanTurn,
        config.reasoningEffort,
        config.serviceTier
      );
    } else if (anthropicClient) {
      return await classifyWithAnthropic(
        anthropicClient,
        config.model,
        contextTurns,
        precedingAiTurn,
        humanTurn
      );
    }
    throw new Error(`No client available for provider: ${config.provider}`);
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
  apiKey: string,
  config?: ClassifierConfig
): Promise<TurnClassification[]> {
  const results: TurnClassification[] = [];
  await classifyTurnsStreaming(turns, apiKey, (signal) => {
    results.push(signal);
  }, config);
  return results.sort((a, b) => a.turnIndex - b.turnIndex);
}

/**
 * Streaming classifier — calls onSignal for each classification as it completes.
 * Signals arrive in roughly chronological order (within each batch).
 */
export async function classifyTurnsStreaming(
  turns: Turn[],
  apiKey: string,
  onSignal: (signal: TurnClassification) => void,
  config?: ClassifierConfig
): Promise<void> {
  const cfg = config || DEFAULT_CONFIG;

  const anthropicClient =
    cfg.provider === "anthropic" ? new Anthropic({ apiKey }) : null;
  const openaiClient =
    cfg.provider === "openai" ? new OpenAI({ apiKey }) : null;

  const humanTurns = turns.filter((t) => t.role === "human");

  // Context window: include up to 4 preceding turns (2 exchanges) before the
  // AI+human pair being classified, so the model can see conversational flow.
  const CONTEXT_WINDOW = 4;

  const classificationTasks = humanTurns.map((humanTurn) => {
    const precedingAiTurn =
      turns.find(
        (t) => t.role === "ai" && t.index === humanTurn.index - 1
      ) ?? null;

    // Gather context: turns before the preceding AI turn (unless disabled)
    const contextEnd = precedingAiTurn ? precedingAiTurn.index : humanTurn.index;
    const contextTurns = cfg.noContext
      ? []
      : turns.filter((t) => t.index < contextEnd).slice(-CONTEXT_WINDOW);

    return { contextTurns, precedingAiTurn, humanTurn };
  });

  const BATCH_SIZE = 10;

  for (let i = 0; i < classificationTasks.length; i += BATCH_SIZE) {
    const batch = classificationTasks.slice(i, i + BATCH_SIZE);

    const batchResults = await Promise.all(
      batch.map((task) =>
        classifySingleTurn(
          anthropicClient,
          openaiClient,
          cfg,
          task.contextTurns,
          task.precedingAiTurn,
          task.humanTurn
        )
      )
    );

    // Emit each result in turn order
    batchResults
      .sort((a, b) => a.turnIndex - b.turnIndex)
      .forEach((result) => onSignal(result));
  }
}
