"use client";

import { useEffect, useCallback } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const papers = [
  {
    summary:
      "Students using GPT-4 performed 48% better on practice problems \u2014 but when AI access was removed, they scored 17% worse than students who never had it. The gains were a crutch, not learning.",
    authors: "Bastani et al.",
    title: "Generative AI Can Harm Learning",
    year: 2024,
    url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4895486",
  },
  {
    summary:
      "In a study of 758 consultants, AI made people 40% better at tasks inside its capabilities \u2014 but 19% worse at tasks outside them. Most people couldn\u2019t tell the difference.",
    authors: "Dell\u2019Acqua et al.",
    title: "Navigating the Jagged Technological Frontier",
    year: 2023,
    url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4573321",
  },
  {
    summary:
      "Working with AI demands constant metacognitive effort \u2014 knowing when to delegate, how to evaluate output, and whether to trust it. These are skills that atrophy without practice.",
    authors: "Tankelevitch et al.",
    title: "The Metacognitive Demands and Opportunities of Generative AI",
    year: 2024,
    url: "https://dl.acm.org/doi/10.1145/3613904.3642902",
  },
];

export default function ResearchModal({ open, onClose }: Props) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-w-lg w-full mx-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
              Based on research
            </h2>
            <button
              onClick={onClose}
              className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer"
            >
              Close
            </button>
          </div>

          <div className="space-y-6">
            {papers.map((paper) => (
              <div key={paper.url} className="space-y-1.5">
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {paper.summary}
                </p>
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors underline underline-offset-2"
                >
                  {paper.authors} &ldquo;{paper.title}&rdquo; ({paper.year})
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
