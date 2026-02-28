/**
 * Evaluation harness for the dontkillmybrain classifier.
 *
 * Parses test conversations from /conversations/*.md, runs them through
 * the classifier, compares against ground-truth labels, and reports accuracy.
 *
 * Usage:
 *   npx tsx scripts/eval.ts                                    # default (haiku)
 *   npx tsx scripts/eval.ts --model=gpt-5-mini                 # OpenAI model
 *   npx tsx scripts/eval.ts --model=claude-sonnet-4-6           # Anthropic model
 *   npx tsx scripts/eval.ts --file=01-strong-collaborator.md    # single file
 */

import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";
import { classifyTurns } from "../src/lib/engine/classifier";
import type { Turn, TurnClassification, Signal } from "../src/lib/engine/types";

interface ExpectedSignal {
  turn: number;
  signal: Signal;
  rationale: string;
}

interface TestConversation {
  filename: string;
  title: string;
  scenario: string;
  expectedSignals: ExpectedSignal[];
  turns: Turn[];
}

function parseConversationFile(filepath: string): TestConversation {
  const raw = readFileSync(filepath, "utf-8");

  // Split frontmatter from body
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) throw new Error(`No frontmatter in ${filepath}`);

  const frontmatter = fmMatch[1];
  const body = fmMatch[2];

  // Parse frontmatter (simple YAML parsing)
  const title = frontmatter.match(/title:\s*"([^"]+)"/)?.[1] || "Untitled";
  const scenario = frontmatter.match(/scenario:\s*"([^"]+)"/)?.[1] || "";

  // Parse expected signals
  const expectedSignals: ExpectedSignal[] = [];
  const signalBlocks = frontmatter.split(/\s+-\s+turn:\s+/).slice(1);
  for (const block of signalBlocks) {
    const turnMatch = block.match(/^(\d+)/);
    const signalMatch = block.match(/signal:\s*"([^"]+)"/);
    const rationaleMatch = block.match(/rationale:\s*"([^"]+)"/);
    if (turnMatch && signalMatch) {
      expectedSignals.push({
        turn: parseInt(turnMatch[1]),
        signal: signalMatch[1] as Signal,
        rationale: rationaleMatch?.[1] || "",
      });
    }
  }

  // Parse conversation turns
  const turns: Turn[] = [];
  const turnPattern = /\*\*(Human|AI):\*\*\s*([\s\S]*?)(?=\*\*(?:Human|AI):\*\*|$)/g;
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

  return {
    filename: filepath.split("/").pop()!,
    title,
    scenario,
    expectedSignals,
    turns,
  };
}

interface TurnResult {
  turnIndex: number;
  expected: Signal;
  actual: Signal;
  confidence: number;
  match: boolean;
  expectedRationale: string;
  actualRationale: string;
}

interface ConversationResult {
  filename: string;
  title: string;
  scenario: string;
  turnResults: TurnResult[];
  accuracy: number;
  totalTurns: number;
  correctTurns: number;
}

function resolveModelConfig(modelArg: string | undefined) {
  const model = modelArg || "claude-haiku-4-5-20251001";

  const provider = model.startsWith("claude") ? "anthropic" : "openai";

  const apiKey =
    provider === "openai"
      ? process.env.OPENAI_API_KEY
      : process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error(
      `${provider === "openai" ? "OPENAI_API_KEY" : "ANTHROPIC_API_KEY"} not set`
    );
    process.exit(1);
  }

  return { provider: provider as "anthropic" | "openai", model, apiKey };
}

async function evaluateConversation(
  conv: TestConversation,
  apiKey: string,
  config: { provider: "anthropic" | "openai"; model: string; reasoningEffort?: string; noContext?: boolean }
): Promise<ConversationResult> {
  console.log(
    `  Classifying ${conv.filename} (${conv.turns.filter((t) => t.role === "human").length} human turns)...`
  );

  const classifications = await classifyTurns(conv.turns, apiKey, config);

  const turnResults: TurnResult[] = [];

  for (const expected of conv.expectedSignals) {
    const humanTurns = conv.turns.filter((t) => t.role === "human");
    const humanTurn = humanTurns[expected.turn];
    if (!humanTurn) continue;

    const actual = classifications.find(
      (c) => c.turnIndex === humanTurn.index
    );

    if (actual) {
      turnResults.push({
        turnIndex: expected.turn,
        expected: expected.signal,
        actual: actual.signal,
        confidence: actual.confidence,
        match: expected.signal === actual.signal,
        expectedRationale: expected.rationale,
        actualRationale: actual.rationale,
      });
    }
  }

  const correctTurns = turnResults.filter((r) => r.match).length;

  return {
    filename: conv.filename,
    title: conv.title,
    scenario: conv.scenario,
    turnResults,
    accuracy: turnResults.length > 0 ? correctTurns / turnResults.length : 0,
    totalTurns: turnResults.length,
    correctTurns,
  };
}

function generateReport(
  results: ConversationResult[],
  modelLabel: string
): string {
  const totalTurns = results.reduce((s, r) => s + r.totalTurns, 0);
  const totalCorrect = results.reduce((s, r) => s + r.correctTurns, 0);
  const overallAccuracy = totalTurns > 0 ? totalCorrect / totalTurns : 0;

  let report = `# Classifier Evaluation Report\n\n`;
  report += `**Date:** ${new Date().toISOString().split("T")[0]}\n`;
  report += `**Model:** ${modelLabel}\n`;
  report += `**Overall Accuracy:** ${(overallAccuracy * 100).toFixed(1)}% (${totalCorrect}/${totalTurns} turns)\n\n`;

  // Per-conversation summary
  report += `## Summary\n\n`;
  report += `| Conversation | Accuracy | Correct/Total | Scenario |\n`;
  report += `|---|---|---|---|\n`;
  for (const r of results) {
    const pct = (r.accuracy * 100).toFixed(0);
    report += `| ${r.filename} | ${pct}% | ${r.correctTurns}/${r.totalTurns} | ${r.scenario.slice(0, 60)}... |\n`;
  }

  // Confusion matrix
  const signals: Signal[] = [
    "steering",
    "friction",
    "contribution",
    "evaluation",
    "passive_acceptance",
    "delegation",
    "capitulation",
    "unknown",
  ];
  const matrix: Record<string, Record<string, number>> = {};
  for (const s of signals) {
    matrix[s] = {};
    for (const s2 of signals) matrix[s][s2] = 0;
  }
  for (const r of results) {
    for (const t of r.turnResults) {
      if (matrix[t.expected] && matrix[t.expected][t.actual] !== undefined) {
        matrix[t.expected][t.actual]++;
      }
    }
  }

  report += `\n## Confusion Matrix\n\n`;
  report += `| Expected \\ Actual | ${signals.filter((s) => s !== "unknown").join(" | ")} |\n`;
  report += `|---|${signals
    .filter((s) => s !== "unknown")
    .map(() => "---")
    .join("|")}|\n`;
  for (const expected of signals) {
    if (expected === "unknown") continue;
    const counts = signals
      .filter((s) => s !== "unknown")
      .map((actual) => {
        const count = matrix[expected]?.[actual] || 0;
        return count > 0 ? String(count) : ".";
      });
    report += `| ${expected} | ${counts.join(" | ")} |\n`;
  }

  // Per-signal accuracy
  report += `\n## Per-Signal Accuracy\n\n`;
  report += `| Signal | Correct | Total | Accuracy | Most Common Misclass |\n`;
  report += `|---|---|---|---|---|\n`;
  for (const signal of signals) {
    if (signal === "unknown") continue;
    const turns = results.flatMap((r) =>
      r.turnResults.filter((t) => t.expected === signal)
    );
    if (turns.length === 0) continue;
    const correct = turns.filter((t) => t.match).length;
    const pct = ((correct / turns.length) * 100).toFixed(0);

    const misses = turns.filter((t) => !t.match);
    const missCounts: Record<string, number> = {};
    for (const m of misses) {
      missCounts[m.actual] = (missCounts[m.actual] || 0) + 1;
    }
    const topMiss = Object.entries(missCounts).sort(
      (a, b) => b[1] - a[1]
    )[0];
    const missLabel = topMiss ? `${topMiss[0]} (${topMiss[1]})` : "-";

    report += `| ${signal} | ${correct} | ${turns.length} | ${pct}% | ${missLabel} |\n`;
  }

  // Detailed misclassifications
  report += `\n## Misclassifications\n\n`;
  for (const r of results) {
    const misses = r.turnResults.filter((t) => !t.match);
    if (misses.length === 0) continue;

    report += `### ${r.filename}\n\n`;
    for (const m of misses) {
      report += `**Turn ${m.turnIndex}:** Expected \`${m.expected}\` → Got \`${m.actual}\` (confidence: ${(m.confidence * 100).toFixed(0)}%)\n`;
      report += `- Expected because: ${m.expectedRationale}\n`;
      report += `- Classifier said: ${m.actualRationale}\n\n`;
    }
  }

  return report;
}

async function main() {
  const args = process.argv.slice(2);
  const fileFilter = args.find((a) => a.startsWith("--file="))?.split("=")[1];
  const modelArg = args.find((a) => a.startsWith("--model="))?.split("=")[1];
  const reasoningArg = args.find((a) => a.startsWith("--reasoning="))?.split("=")[1];
  const noContext = args.includes("--no-context");

  const { provider, model, apiKey } = resolveModelConfig(modelArg);

  console.log(`\nModel: ${model} (${provider})${reasoningArg ? ` [reasoning: ${reasoningArg}]` : ""}${noContext ? " [no-context]" : " [context-window]"}`);

  const convDir = join(process.cwd(), "..", "conversations");
  let files = readdirSync(convDir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  if (fileFilter) {
    files = files.filter((f) => f.includes(fileFilter));
  }

  if (files.length === 0) {
    console.error("No conversation files found");
    process.exit(1);
  }

  console.log(
    `Running classifier evaluation on ${files.length} conversations...\n`
  );

  const conversations = files.map((f) =>
    parseConversationFile(join(convDir, f))
  );

  const results: ConversationResult[] = [];
  for (const conv of conversations) {
    const result = await evaluateConversation(conv, apiKey, {
      provider,
      model,
      reasoningEffort: reasoningArg,
      noContext,
    });
    const pct = (result.accuracy * 100).toFixed(0);
    console.log(
      `  → ${result.filename}: ${pct}% (${result.correctTurns}/${result.totalTurns})`
    );
    results.push(result);
  }

  const modelLabel = reasoningArg ? `${model}-reasoning-${reasoningArg}` : model;
  const report = generateReport(results, modelLabel);
  const reportPath = join(process.cwd(), "..", `eval-results-${modelLabel}.md`);
  writeFileSync(reportPath, report);

  const totalTurns = results.reduce((s, r) => s + r.totalTurns, 0);
  const totalCorrect = results.reduce((s, r) => s + r.correctTurns, 0);
  const overall = ((totalCorrect / totalTurns) * 100).toFixed(1);

  console.log(`\n========================================`);
  console.log(`Model: ${model}`);
  console.log(`Overall accuracy: ${overall}% (${totalCorrect}/${totalTurns})`);
  console.log(`Report written to: ${reportPath}`);
  console.log(`========================================\n`);
}

main().catch(console.error);
