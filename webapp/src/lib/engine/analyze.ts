import { Transcript, AnalysisResult } from "@/lib/engine/types";
import { classifyTurns } from "@/lib/engine/classifier";
import { generateNarrative } from "@/lib/engine/narrator";

export async function analyzeTranscript(
  transcript: Transcript,
  apiKey?: string
): Promise<AnalysisResult> {
  const resolvedKey = apiKey || process.env.ANTHROPIC_API_KEY;

  if (!resolvedKey) {
    throw new Error(
      "No API key provided. Pass an API key or set ANTHROPIC_API_KEY environment variable."
    );
  }

  // Stage 1: Classify each human turn
  const turnSignals = await classifyTurns(transcript.turns, resolvedKey);

  // Stage 2: Generate narrative, highlights, and nudge
  const { sessionTitle, introNarrative, narrative, highlights, nudge } =
    await generateNarrative(transcript.turns, turnSignals, resolvedKey);

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
