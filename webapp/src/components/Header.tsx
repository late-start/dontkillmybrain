"use client";

import { useState } from "react";
import Link from "next/link";
import ResearchModal from "@/components/ResearchModal";

export default function Header() {
  const [showResearch, setShowResearch] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-sm">
        <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="text-base font-semibold text-[var(--color-text)] tracking-wide hover:text-[var(--color-accent)] transition-colors"
            >
              DONTKILLMYBRAIN
            </Link>
            <button
              onClick={() => setShowResearch(true)}
              className="text-xs font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors cursor-pointer tracking-wide"
            >
              RESEARCH
            </button>
          </div>

          <span className="text-xs text-[var(--color-text-muted)]">
            Nothing is saved or stored
          </span>
        </div>
      </header>

      <ResearchModal
        open={showResearch}
        onClose={() => setShowResearch(false)}
      />
    </>
  );
}
