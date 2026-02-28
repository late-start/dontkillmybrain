"use client";

import { useState } from "react";
import type {
  TurnClassification,
  Turn,
  HighlightedMoment,
  Signal,
} from "@/lib/engine/types";

const signalColors: Record<Signal, string> = {
  steering: "var(--color-steering)",
  friction: "var(--color-friction)",
  contribution: "var(--color-contribution)",
  evaluation: "var(--color-evaluation)",
  passive_acceptance: "var(--color-passive)",
  delegation: "var(--color-delegation)",
  capitulation: "var(--color-capitulation)",
  unknown: "var(--color-unknown)",
};

const signalLabels: Record<Signal, string> = {
  steering: "Steering",
  friction: "Friction",
  contribution: "Contribution",
  evaluation: "Evaluation",
  passive_acceptance: "Passive",
  delegation: "Delegation",
  capitulation: "Capitulation",
  unknown: "Unknown",
};

interface Props {
  signals: TurnClassification[];
  turns?: Turn[];
  highlights?: HighlightedMoment[];
  totalExpected?: number;
}

export default function SignalTimeline({ signals, turns, highlights, totalExpected }: Props) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const totalSlots = totalExpected || signals.length;
  if (totalSlots === 0) return null;

  const highlightedTurnIndices = new Set(
    (highlights || []).map((h) => h.turnIndex)
  );

  function getHighlightAnnotation(turnIndex: number): string | null {
    const h = (highlights || []).find((h) => h.turnIndex === turnIndex);
    return h?.annotation || null;
  }

  function getTurnContent(
    turnIndex: number
  ): { human: string; ai: string } | null {
    if (!turns) return null;
    const humanTurn = turns.find(
      (t) => t.index === turnIndex && t.role === "human"
    );
    // AI turn is typically the one right after the human turn
    const aiTurn = turns.find(
      (t) => t.index === turnIndex + 1 && t.role === "ai"
    );
    // Or the one right before (if human is responding to AI)
    const aiTurnBefore = turns.find(
      (t) => t.index === turnIndex - 1 && t.role === "ai"
    );

    return {
      human: humanTurn?.content || "",
      ai: aiTurn?.content || aiTurnBefore?.content || "",
    };
  }

  function handleSegmentClick(index: number) {
    setExpandedIndex(expandedIndex === index ? null : index);
  }

  return (
    <div className="space-y-2">
      {/* Label */}
      <h2 className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
        Your turns
      </h2>

      {/* Timeline bar */}
      <div className="relative flex h-10 w-full gap-px overflow-hidden rounded">
        {Array.from({ length: totalSlots }).map((_, i) => {
          const signal = signals[i];

          if (!signal) {
            // Empty placeholder slot — not yet classified
            return (
              <div
                key={`pending-${i}`}
                className="transition-all"
                style={{
                  backgroundColor: "var(--color-border)",
                  flex: `1 1 ${Math.max(100 / totalSlots, 8)}%`,
                  minWidth: "16px",
                  opacity: 0.3,
                }}
              />
            );
          }

          const isHighlighted = highlightedTurnIndices.has(signal.turnIndex);
          const isExpanded = expandedIndex === i;

          return (
            <button
              key={signal.turnIndex}
              className="relative transition-all cursor-pointer"
              style={{
                backgroundColor: signalColors[signal.signal],
                flex: `1 1 ${Math.max(100 / totalSlots, 8)}%`,
                minWidth: "16px",
                opacity: expandedIndex !== null && !isExpanded ? 0.4 : 1,
              }}
              onClick={() => handleSegmentClick(i)}
              aria-label={`Turn ${signal.turnIndex + 1}: ${signalLabels[signal.signal]}`}
            >
              {/* Highlight marker */}
              {isHighlighted && (
                <div className="absolute top-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-white" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {Object.entries(signalLabels).map(([key, label]) => {
          const hasSignal = signals.some((s) => s.signal === key);
          if (!hasSignal) return null;
          return (
            <div key={key} className="flex items-center gap-1.5">
              <div
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: signalColors[key as Signal] }}
              />
              <span className="text-xs text-[var(--color-text-muted)]">
                {label}
              </span>
            </div>
          );
        })}
        {(highlights || []).length > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="text-xs text-[var(--color-text-muted)]">
              Highlighted moment
            </span>
          </div>
        )}
      </div>

      {/* Expanded turn detail */}
      {expandedIndex !== null && (
        <ExpandedTurn
          signal={signals[expandedIndex]}
          content={getTurnContent(signals[expandedIndex].turnIndex)}
          annotation={getHighlightAnnotation(signals[expandedIndex].turnIndex)}
          onClose={() => setExpandedIndex(null)}
        />
      )}
    </div>
  );
}

function ExpandedTurn({
  signal,
  content,
  annotation,
  onClose,
}: {
  signal: TurnClassification;
  content: { human: string; ai: string } | null;
  annotation: string | null;
  onClose: () => void;
}) {
  const [showFullAi, setShowFullAi] = useState(false);

  const aiPreviewLength = 300;
  const aiContent = content?.ai || "";
  const isAiLong = aiContent.length > aiPreviewLength;

  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-3">
          <div
            className="h-3 w-3 rounded-sm"
            style={{ backgroundColor: signalColors[signal.signal] }}
          />
          <span className="text-xs font-medium text-[var(--color-text)]">
            Turn {signal.turnIndex + 1}
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">
            {signalLabels[signal.signal]} &middot;{" "}
            {Math.round(signal.confidence * 100)}% confidence
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer"
        >
          Close
        </button>
      </div>

      {/* Highlight annotation */}
      {annotation && (
        <div className="px-4 py-3 bg-[var(--color-bg)] border-b border-[var(--color-border)]">
          <p className="text-xs font-medium text-[var(--color-text)]">
            {annotation}
          </p>
        </div>
      )}

      {content && (
        <div className="divide-y divide-[var(--color-border)]">
          {/* You said */}
          <div className="px-4 py-3">
            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
              You said
            </p>
            <p className="text-sm leading-relaxed text-[var(--color-text)]">
              {content.human}
            </p>
          </div>

          {/* AI said */}
          {content.ai && (
            <div className="px-4 py-3">
              <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                AI said
              </p>
              <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
                {showFullAi || !isAiLong
                  ? aiContent
                  : aiContent.substring(0, aiPreviewLength) + "..."}
              </p>
              {isAiLong && (
                <button
                  onClick={() => setShowFullAi(!showFullAi)}
                  className="mt-1.5 text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] cursor-pointer"
                >
                  {showFullAi ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Classification rationale */}
      <div className="px-4 py-3 border-t border-[var(--color-border)] bg-[var(--color-bg)]">
        <p className="text-xs leading-relaxed text-[var(--color-text-muted)] italic">
          {signal.rationale}
        </p>
      </div>
    </div>
  );
}
