"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/lib/engine/types";
import LoadingState from "@/components/LoadingState";
import Report from "@/components/Report";

export default function AnalysisInput() {
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!input.trim()) return;

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

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

      const data: AnalysisResult = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleNewAnalysis() {
    setResult(null);
    setInput("");
    setError(null);
  }

  if (result) {
    return <Report result={result} onNewAnalysis={handleNewAnalysis} />;
  }

  if (isAnalyzing) {
    return <LoadingState />;
  }

  return (
    <div className="w-full space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your AI conversation here, or drop a share link from Claude, ChatGPT, Gemini, or Grok..."
        rows={8}
        className="w-full resize-none rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm leading-relaxed text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-text-muted)] focus:outline-none transition-colors"
      />

      {error && (
        <p className="text-xs text-[var(--color-red)] whitespace-pre-line">{error}</p>
      )}

      <div className="flex items-center justify-between">
        <button
          onClick={handleSubmit}
          disabled={!input.trim()}
          className="rounded bg-[var(--color-text)] px-5 py-2 text-sm font-medium text-[var(--color-bg)] transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Analyze
        </button>

        <p className="text-xs text-[var(--color-text-muted)]">
          Your conversation is analyzed and immediately discarded.
        </p>
      </div>
    </div>
  );
}
