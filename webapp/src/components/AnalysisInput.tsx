"use client";

import { useState, useCallback } from "react";
import type {
  AnalysisResult,
  TurnClassification,
  Turn,
  HighlightedMoment,
} from "@/lib/engine/types";
import Report from "@/components/Report";

type StreamingState =
  | { phase: "idle" }
  | { phase: "parsing" }
  | {
      phase: "classifying";
      platform: string;
      humanTurnCount: number;
      turns: Turn[];
      signals: TurnClassification[];
    }
  | {
      phase: "narrating";
      platform: string;
      humanTurnCount: number;
      turns: Turn[];
      signals: TurnClassification[];
    }
  | { phase: "done"; result: AnalysisResult }
  | { phase: "error"; error: string };

export default function AnalysisInput() {
  const [input, setInput] = useState("");
  const [state, setState] = useState<StreamingState>({ phase: "idle" });

  const handleSubmit = useCallback(async () => {
    if (!input.trim()) return;

    setState({ phase: "parsing" });

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: input.trim() }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.error || `Analysis failed (${response.status})`
        );
      }

      // Read NDJSON stream
      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let buffer = "";
      let streamState: {
        platform: string;
        humanTurnCount: number;
        turns: Turn[];
        signals: TurnClassification[];
      } | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line);

          switch (event.type) {
            case "meta":
              streamState = {
                platform: event.platform,
                humanTurnCount: event.humanTurnCount,
                turns: event.turns,
                signals: [],
              };
              setState({
                phase: "classifying",
                ...streamState,
              });
              break;

            case "signal":
              if (streamState) {
                streamState.signals = [
                  ...streamState.signals,
                  {
                    turnIndex: event.turnIndex,
                    signal: event.signal,
                    confidence: event.confidence,
                    rationale: event.rationale,
                  },
                ];
                setState({
                  phase: "classifying",
                  ...streamState,
                });
              }
              break;

            case "narrative":
              if (streamState) {
                setState({ phase: "narrating", ...streamState });
                // Brief moment to show "narrating" is done, then show result
                setState({
                  phase: "done",
                  result: {
                    sessionTitle: event.sessionTitle,
                    humanTurnCount: streamState.humanTurnCount,
                    turnSignals: streamState.signals.sort(
                      (a: TurnClassification, b: TurnClassification) =>
                        a.turnIndex - b.turnIndex
                    ),
                    introNarrative: event.introNarrative,
                    narrative: event.narrative,
                    highlights: event.highlights,
                    nudge: event.nudge,
                    platform: streamState.platform,
                    turns: streamState.turns,
                  },
                });
              }
              break;

            case "error":
              throw new Error(event.error);

            case "done":
              break;
          }
        }
      }
    } catch (err) {
      setState({
        phase: "error",
        error: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }, [input]);

  function handleNewAnalysis() {
    setState({ phase: "idle" });
    setInput("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Fully done — show the complete report
  if (state.phase === "done") {
    return <Report result={state.result} onNewAnalysis={handleNewAnalysis} />;
  }

  // Streaming — show incremental report
  if (
    state.phase === "classifying" ||
    state.phase === "narrating"
  ) {
    return (
      <Report
        result={{
          sessionTitle: "",
          humanTurnCount: state.humanTurnCount,
          turnSignals: state.signals.sort((a, b) => a.turnIndex - b.turnIndex),
          introNarrative: "",
          narrative: "",
          highlights: [],
          nudge: "",
          platform: state.platform,
          turns: state.turns,
        }}
        streaming={{
          totalExpected: state.humanTurnCount,
          signalsReceived: state.signals.length,
          narrativeReady: false,
        }}
        onNewAnalysis={handleNewAnalysis}
      />
    );
  }

  // Parsing / idle / error
  return (
    <div className="w-full space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your AI conversation here, or drop a share link from Claude, ChatGPT, Gemini, or Grok..."
        rows={8}
        className="w-full resize-none rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm leading-relaxed text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-text-muted)] focus:outline-none transition-colors"
      />

      {state.phase === "error" && (
        <p className="text-xs text-[var(--color-red)] whitespace-pre-line">
          {state.error}
        </p>
      )}

      {state.phase === "parsing" && (
        <p className="animate-pulse-subtle text-sm text-[var(--color-text-secondary)]">
          Reading your conversation...
        </p>
      )}

      <div className="flex items-center justify-between">
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || state.phase === "parsing"}
          className="rounded bg-[var(--color-text)] px-5 py-2 text-sm font-medium text-[var(--color-bg)] transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Analyze
        </button>

        <p className="text-xs text-[var(--color-text-muted)]">
          We don&apos;t store your data. Analysis uses{" "}
          <a
            href="https://openai.com/policies/row-privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[var(--color-text)]"
          >
            OpenAI
          </a>{" "}
          and{" "}
          <a
            href="https://www.anthropic.com/policies/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[var(--color-text)]"
          >
            Anthropic
          </a>{" "}
          APIs. Neither trains on API data.
        </p>
      </div>
    </div>
  );
}
