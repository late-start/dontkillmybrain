import { Transcript, AnalysisResult } from "@/lib/engine/types";
import { classifyTurns } from "@/lib/engine/classifier";
import { generateNarrative } from "@/lib/engine/narrator";

export async function analyzeTranscript(
  transcript: Transcript,
): Promise<AnalysisResult> {
  // Classifier uses OpenAI (gpt-5.2 with flex processing)
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    throw new Error("OPENAI_API_KEY not configured.");
  }

  // Narrator uses Anthropic
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    throw new Error("ANTHROPIC_API_KEY not configured.");
  }

  // Stage 1: Classify each human turn (OpenAI gpt-5.2 flex)
  const turnSignals = await classifyTurns(transcript.turns, openaiKey);

  // Stage 2: Generate narrative, highlights, and nudge (Anthropic)
  const { sessionTitle, introNarrative, narrative, highlights, nudge } =
    await generateNarrative(transcript.turns, turnSignals, anthropicKey);

  const humanTurnCount = transcript.turns.filter(
    (t) => t.role === "human"
  ).length;

  return {
    sessionTitle,
    humanTurnCount,
    turnSignals,
    introNarrative,
    narrative,
    highlights,
    nudge,
    platform: transcript.platform,
    turns: transcript.turns,
  };
}
