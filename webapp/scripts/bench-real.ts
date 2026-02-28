import { parseInput } from "../src/lib/parsers";
import { classifyTurns } from "../src/lib/engine/classifier";
import { generateNarrative } from "../src/lib/engine/narrator";

async function main() {
  const url = "https://claude.ai/share/c21d3700-7c18-47d1-ada9-444d08c18e07";
  const openaiKey = process.env.OPENAI_API_KEY!;
  const anthropicKey = process.env.ANTHROPIC_API_KEY!;

  console.log("Stage 0: Parsing/scraping...");
  let t0 = Date.now();
  const transcript = await parseInput(url);
  const parseMs = Date.now() - t0;
  const humanCount = transcript.turns.filter(t => t.role === "human").length;
  console.log(`  Parse: ${(parseMs / 1000).toFixed(1)}s — ${transcript.turns.length} turns (${humanCount} human)\n`);

  console.log("Stage 1: Classification (flex)...");
  t0 = Date.now();
  const signals = await classifyTurns(transcript.turns, openaiKey);
  const classifyMs = Date.now() - t0;
  console.log(`  Classify: ${(classifyMs / 1000).toFixed(1)}s (${(classifyMs / humanCount / 1000).toFixed(1)}s/turn)\n`);

  console.log("Stage 2: Narrator (Sonnet)...");
  t0 = Date.now();
  await generateNarrative(transcript.turns, signals, anthropicKey);
  const narratorMs = Date.now() - t0;
  console.log(`  Narrator: ${(narratorMs / 1000).toFixed(1)}s\n`);

  const total = parseMs + classifyMs + narratorMs;
  console.log(`=== TOTAL: ${(total / 1000).toFixed(1)}s ===`);
  console.log(`  Parse:    ${((parseMs / total) * 100).toFixed(0)}%`);
  console.log(`  Classify: ${((classifyMs / total) * 100).toFixed(0)}%`);
  console.log(`  Narrator: ${((narratorMs / total) * 100).toFixed(0)}%`);
}

main().catch(console.error);
