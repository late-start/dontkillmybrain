"use client";

import { useState } from "react";
import { sampleReport } from "@/lib/sampleReport";
import SignalTimeline from "@/components/SignalTimeline";

export default function SampleReport() {
  const [showNarrative, setShowNarrative] = useState(false);
  const result = sampleReport;

  const narrativeParagraphs = result.narrative
    .split("\n")
    .filter((p) => p.trim().length > 0);

  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-6">
      {/* Session header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="rounded bg-[var(--color-bg)] px-2 py-0.5 text-xs text-[var(--color-text-muted)] border border-[var(--color-border)]">
            {result.platform}
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">
            {result.humanTurnCount} human messages
          </span>
        </div>
        <h3 className="text-lg font-semibold text-[var(--color-text)]">
          {result.sessionTitle}
        </h3>
      </div>

      {/* Intro narrative */}
      <p className="text-sm leading-[1.7] text-[var(--color-text-secondary)]">
        {result.introNarrative}
      </p>

      {/* Interactive Signal Timeline */}
      <SignalTimeline
        signals={result.turnSignals}
        turns={result.turns}
        highlights={result.highlights}
      />

      {/* Nudge */}
      <div className="rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-4">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
          A nudge
        </p>
        <p className="text-sm italic leading-[1.7] text-[var(--color-text-secondary)]">
          {result.nudge}
        </p>
      </div>

      {/* Expandable full narrative */}
      <div className="border-t border-[var(--color-border)] pt-4">
        <button
          onClick={() => setShowNarrative(!showNarrative)}
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
        >
          {showNarrative ? "Hide full analysis" : "Read full analysis"}
        </button>

        {showNarrative && (
          <div className="mt-4 space-y-3">
            {narrativeParagraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-sm leading-[1.7] text-[var(--color-text-secondary)]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
