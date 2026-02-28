"use client";

import type { AnalysisResult } from "@/lib/engine/types";
import SignalTimeline from "@/components/SignalTimeline";

interface StreamingInfo {
  totalExpected: number;
  signalsReceived: number;
  narrativeReady: boolean;
}

interface Props {
  result: AnalysisResult;
  streaming?: StreamingInfo;
  onNewAnalysis?: () => void;
}

export default function Report({ result, streaming, onNewAnalysis }: Props) {
  const isStreaming = !!streaming;
  const narrativeReady = !isStreaming;

  const narrativeParagraphs = result.narrative
    .split("\n")
    .filter((p) => p.trim().length > 0);

  return (
    <article className="mx-auto max-w-[700px] space-y-10 py-12">
      {/* Session header */}
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="rounded bg-[var(--color-surface)] px-2 py-0.5 text-xs text-[var(--color-text-muted)] border border-[var(--color-border)]">
            {result.platform}
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">
            {result.humanTurnCount} human messages
          </span>
        </div>
        {narrativeReady && result.sessionTitle && (
          <h1 className="text-2xl font-semibold leading-tight text-[var(--color-text)]">
            {result.sessionTitle}
          </h1>
        )}
      </header>

      {/* Intro narrative — the hook */}
      {narrativeReady && result.introNarrative && (
        <p className="text-base leading-[1.7] text-[var(--color-text)]">
          {result.introNarrative}
        </p>
      )}

      {/* Interactive Signal Timeline with highlights baked in */}
      <section>
        {isStreaming && (
          <p className="mb-3 animate-pulse-subtle text-xs text-[var(--color-text-muted)]">
            Analyzing your turns... {streaming.signalsReceived} /{" "}
            {streaming.totalExpected}
          </p>
        )}
        <SignalTimeline
          signals={result.turnSignals}
          turns={result.turns}
          highlights={result.highlights}
          totalExpected={isStreaming ? streaming.totalExpected : undefined}
        />
      </section>

      {/* Writing indicator while narrator works */}
      {isStreaming &&
        streaming.signalsReceived === streaming.totalExpected && (
          <p className="animate-pulse-subtle text-sm text-[var(--color-text-secondary)]">
            Writing your report...
          </p>
        )}

      {/* Expanded narrative */}
      {narrativeReady && narrativeParagraphs.length > 0 && (
        <section className="space-y-4">
          {narrativeParagraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-sm leading-[1.7] text-[var(--color-text-secondary)]"
            >
              {paragraph}
            </p>
          ))}
        </section>
      )}

      {/* The Nudge */}
      {narrativeReady && result.nudge && (
        <section className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-5">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
            A nudge
          </h2>
          <p className="text-sm italic leading-[1.7] text-[var(--color-text-secondary)]">
            {result.nudge}
          </p>
        </section>
      )}

      {/* Actions */}
      {onNewAnalysis && narrativeReady && (
        <div className="border-t border-[var(--color-border)] pt-8">
          <button
            onClick={onNewAnalysis}
            className="rounded bg-[var(--color-text)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)] transition-opacity hover:opacity-90 cursor-pointer"
          >
            Analyze another chat
          </button>
        </div>
      )}
    </article>
  );
}
