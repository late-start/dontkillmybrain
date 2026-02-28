/**
 * Test classifier against a real scraped conversation.
 * Outputs per-turn classifications for manual review.
 *
 * Usage: npx tsx scripts/test-real-conv.ts [--model=claude-opus-4-6]
 */

import { readFileSync } from "fs";
import { classifyTurns } from "../src/lib/engine/classifier";
import type { Turn, TurnClassification } from "../src/lib/engine/types";

async function main() {
  const args = process.argv.slice(2);
  const modelArg = args.find((a) => a.startsWith("--model="))?.split("=")[1];
  const noContext = args.includes("--no-context");
  const model = modelArg || "gpt-5.2";
  const provider = model.startsWith("claude") ? "anthropic" : "openai";
  const apiKey =
    provider === "openai"
      ? process.env.OPENAI_API_KEY
      : process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error(`${provider === "openai" ? "OPENAI_API_KEY" : "ANTHROPIC_API_KEY"} not set`);
    process.exit(1);
  }

  const transcript = JSON.parse(
    readFileSync("/Users/kalyandudala/dontkillmybrain/test-real-conv.json", "utf-8")
  );
  const turns: Turn[] = transcript.turns;
  const humanTurns = turns.filter((t) => t.role === "human");

  console.log(`\nModel: ${model} (${provider})${noContext ? " [no-context]" : " [context-window]"}`);
  console.log(`Conversation: ${humanTurns.length} human turns\n`);

  const start = Date.now();
  const results = await classifyTurns(turns, apiKey, { provider: provider as "anthropic" | "openai", model, noContext });
  const elapsed = Date.now() - start;

  for (const r of results) {
    const humanTurn = turns.find((t) => t.index === r.turnIndex);
    const preview = humanTurn
      ? humanTurn.content.substring(0, 100).replace(/\n/g, " ")
      : "";
    console.log(
      `Turn ${r.turnIndex}: ${r.signal.padEnd(20)} (${Math.round(r.confidence * 100)}%) | "${preview}..."`
    );
    console.log(`  Rationale: ${r.rationale}\n`);
  }

  console.log(`\nClassified ${results.length} turns in ${(elapsed / 1000).toFixed(1)}s`);
}

main().catch(console.error);
