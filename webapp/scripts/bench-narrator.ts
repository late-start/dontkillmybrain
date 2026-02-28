/**
 * Compare narrator output across models for the real conversation.
 * First classifies with gpt-5.2, then runs the narrator with each model.
 *
 * Usage: npx tsx scripts/bench-narrator.ts
 */

import { readFileSync, writeFileSync } from "fs";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { classifyTurns } from "../src/lib/engine/classifier";
import { NARRATOR_PROMPT } from "../src/lib/engine/prompts";
import type { Turn, TurnClassification, HighlightedMoment } from "../src/lib/engine/types";

function buildNarratorMessage(turns: Turn[], classifications: TurnClassification[]): string {
  const transcriptText = turns
    .map((t) => `[Turn ${t.index}] ${t.role.toUpperCase()}:\n${t.content}`)
    .join("\n\n---\n\n");

  const classificationsText = classifications
    .map((c) => `Turn ${c.turnIndex}: ${c.signal} (confidence: ${c.confidence}) — ${c.rationale}`)
    .join("\n");

  return `Here is the conversation transcript:\n\n${transcriptText}\n\n---\n\nHere are the turn-by-turn classifications:\n\n${classificationsText}\n\nPlease analyze this conversation and return the JSON response.`;
}

function parseNarratorResponse(text: string) {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
  }
  return JSON.parse(cleaned.trim());
}

async function narrateWithAnthropic(model: string, userMessage: string, apiKey: string) {
  const client = new Anthropic({ apiKey });
  const start = Date.now();
  const response = await client.messages.create({
    model,
    max_tokens: 4096,
    system: NARRATOR_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });
  const elapsed = Date.now() - start;
  const text = response.content[0].type === "text" ? response.content[0].text : "";
  return { parsed: parseNarratorResponse(text), elapsed };
}

async function narrateWithOpenAI(model: string, userMessage: string, apiKey: string) {
  const client = new OpenAI({ apiKey });
  const start = Date.now();
  const requestOptions: any = {
    model,
    max_completion_tokens: 4096,
    service_tier: "flex",
    store: false,
    messages: [
      { role: "system", content: NARRATOR_PROMPT },
      { role: "user", content: userMessage },
    ],
  };
  if (model.startsWith("gpt-5")) {
    requestOptions.reasoning_effort = "none";
  }
  const response = await client.chat.completions.create(requestOptions);
  const elapsed = Date.now() - start;
  const text = response.choices[0]?.message?.content || "";
  return { parsed: parseNarratorResponse(text), elapsed };
}

async function main() {
  const openaiKey = process.env.OPENAI_API_KEY!;
  const anthropicKey = process.env.ANTHROPIC_API_KEY!;

  const transcript = JSON.parse(
    readFileSync("/Users/kalyandudala/dontkillmybrain/test-real-conv.json", "utf-8")
  );
  const turns: Turn[] = transcript.turns;

  // Step 1: classify with gpt-5.2 (shared across all narrator runs)
  console.log("Classifying with gpt-5.2...");
  const classifications = await classifyTurns(turns, openaiKey, {
    provider: "openai",
    model: "gpt-5.2",
    noContext: true,
  });
  console.log(`  ${classifications.length} turns classified\n`);

  const userMessage = buildNarratorMessage(turns, classifications);

  // Step 2: run narrator with each model
  const models = [
    { name: "gpt-5.2", provider: "openai" },
    { name: "claude-sonnet-4-6", provider: "anthropic" },
  ];

  for (const m of models) {
    console.log(`=== Narrator: ${m.name} ===\n`);
    try {
      const { parsed, elapsed } = m.provider === "openai"
        ? await narrateWithOpenAI(m.name, userMessage, openaiKey)
        : await narrateWithAnthropic(m.name, userMessage, anthropicKey);

      console.log(`Time: ${(elapsed / 1000).toFixed(1)}s\n`);
      console.log(`Title: ${parsed.sessionTitle}\n`);
      console.log(`Intro: ${parsed.introNarrative}\n`);
      console.log(`Narrative:\n${parsed.narrative}\n`);
      console.log(`Highlights:`);
      for (const h of parsed.highlights || []) {
        console.log(`  Turn ${h.turnIndex}: ${h.annotation}`);
      }
      console.log(`\nNudge: ${parsed.nudge}\n`);
      console.log("---\n");
    } catch (err: any) {
      console.log(`ERROR: ${err.message}\n---\n`);
    }
  }
}

main().catch(console.error);
