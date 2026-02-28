/**
 * Quick benchmark: flex vs standard service tier for classifier latency.
 * Uses conversation 10 (4 human turns).
 *
 * Usage: npx tsx scripts/bench-tier.ts
 */

import { readFileSync } from "fs";
import { join } from "path";
import { classifyTurns } from "../src/lib/engine/classifier";
import { generateNarrative } from "../src/lib/engine/narrator";
import type { Turn } from "../src/lib/engine/types";

function parseTurns(filepath: string): Turn[] {
  const raw = readFileSync(filepath, "utf-8");
  const body = raw.replace(/^---[\s\S]*?---\n/, "");
  const turns: Turn[] = [];
  const turnPattern =
    /\*\*(Human|AI):\*\*\s*([\s\S]*?)(?=\*\*(?:Human|AI):\*\*|$)/g;
  let match;
  let index = 0;
  while ((match = turnPattern.exec(body)) !== null) {
    const role = match[1].toLowerCase() === "human" ? "human" : "ai";
    const content = match[2].trim();
    if (content) {
      turns.push({ role: role as "human" | "ai", content, index });
      index++;
    }
  }
  return turns;
}

async function bench(tier: string, turns: Turn[], apiKey: string) {
  const start = Date.now();
  await classifyTurns(turns, apiKey, {
    provider: "openai",
    model: "gpt-5.2",
    serviceTier: tier,
  } as any);
  const elapsed = Date.now() - start;
  return elapsed;
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("OPENAI_API_KEY not set");
    process.exit(1);
  }

  const convDir = join(process.cwd(), "..", "conversations");
  const files = ["10-short-conversation.md", "08-mixed-realistic.md"];
  const RUNS = 2;

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    console.error("ANTHROPIC_API_KEY not set");
    process.exit(1);
  }

  for (const file of files) {
    const turns = parseTurns(join(convDir, file));
    const humanCount = turns.filter((t) => t.role === "human").length;
    console.log(`\n=== ${file} (${humanCount} human turns) ===\n`);

    const flexTimes: number[] = [];
    const autoTimes: number[] = [];

    for (let i = 0; i < RUNS; i++) {
      console.log(`  Run ${i + 1}/${RUNS}...`);
      const flexMs = await bench("flex", turns, apiKey);
      flexTimes.push(flexMs);
      console.log(`    flex: ${(flexMs / 1000).toFixed(1)}s`);

      const autoMs = await bench("auto", turns, apiKey);
      autoTimes.push(autoMs);
      console.log(`    auto: ${(autoMs / 1000).toFixed(1)}s`);
    }

    const avgFlex = flexTimes.reduce((a, b) => a + b, 0) / RUNS;
    const avgAuto = autoTimes.reduce((a, b) => a + b, 0) / RUNS;
    console.log(`\n  Avg flex:     ${(avgFlex / 1000).toFixed(1)}s (${(avgFlex / humanCount / 1000).toFixed(1)}s/turn)`);
    console.log(`  Avg standard: ${(avgAuto / 1000).toFixed(1)}s (${(avgAuto / humanCount / 1000).toFixed(1)}s/turn)`);
    console.log(`  Speedup: ${(avgFlex / avgAuto).toFixed(2)}x`);

    // Now time the narrator (once) using standard tier classifications
    console.log(`\n  Timing narrator (Sonnet)...`);
    const classifications = await classifyTurns(turns, apiKey, {
      provider: "openai",
      model: "gpt-5.2",
      serviceTier: "auto",
    } as any);
    const narratorStart = Date.now();
    await generateNarrative(turns, classifications, anthropicKey!);
    const narratorMs = Date.now() - narratorStart;
    console.log(`  Narrator: ${(narratorMs / 1000).toFixed(1)}s`);
    console.log(`  Total (classify + narrate): ${((avgAuto + narratorMs) / 1000).toFixed(1)}s`);
  }
}

main().catch(console.error);
