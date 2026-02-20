import AnalysisInput from "@/components/AnalysisInput";

export default function Home() {
  return (
    <div className="mx-auto max-w-[700px] px-4">
      {/* Hero section */}
      <section className="pb-16 pt-24 sm:pt-32">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-[var(--color-text)] sm:text-4xl">
          Who&apos;s doing the thinking?
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
          Paste an AI conversation. See who was doing the thinking.
        </p>

        <div className="mt-10">
          <AnalysisInput />
        </div>
      </section>

      {/* What we measure */}
      <section className="border-t border-[var(--color-border)] py-16">
        <h2 className="mb-8 text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
          dontkillmybrain measures
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-sm bg-[var(--color-steering)]" />
              <h3 className="text-sm font-medium text-[var(--color-text)]">
                Steering
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-[var(--color-text-secondary)] pl-4">
              Whether you set the direction, defined constraints, or reframed
              the problem in your own terms.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-sm bg-[var(--color-friction)]" />
              <h3 className="text-sm font-medium text-[var(--color-text)]">
                Friction
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-[var(--color-text-secondary)] pl-4">
              Whether you pushed back on AI output, questioned assumptions, or
              rejected suggestions.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-sm bg-[var(--color-contribution)]" />
              <h3 className="text-sm font-medium text-[var(--color-text)]">
                Contribution
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-[var(--color-text-secondary)] pl-4">
              Whether you added original ideas, examples, or context that
              shaped the conversation.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-sm bg-[var(--color-evaluation)]" />
              <h3 className="text-sm font-medium text-[var(--color-text)]">
                Evaluation
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-[var(--color-text-secondary)] pl-4">
              Whether you critically assessed the AI&apos;s output and made a
              judgment about its quality or correctness.
            </p>
          </div>
        </div>
      </section>

      {/* Sample report preview */}
      <section className="border-t border-[var(--color-border)] py-16">
        <h2 className="mb-8 text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
          Sample report
        </h2>

        <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="rounded bg-[var(--color-bg)] px-2 py-0.5 text-xs text-[var(--color-text-muted)] border border-[var(--color-border)]">
              Claude
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">
              12 human messages
            </span>
          </div>

          <h3 className="text-lg font-semibold text-[var(--color-text)]">
            Debugging a React state management issue
          </h3>

          <p className="text-sm leading-[1.7] text-[var(--color-text-secondary)]">
            You started strong &mdash; you described the bug precisely and
            proposed a hypothesis about stale closures. But midway through, when
            Claude suggested refactoring to useReducer, you accepted without
            evaluating whether it actually addressed your root cause...
          </p>

          {/* Mini signal bar */}
          <div className="flex h-5 w-full gap-px overflow-hidden rounded">
            <div className="flex-[3]" style={{ backgroundColor: "var(--color-steering)" }} />
            <div className="flex-[2]" style={{ backgroundColor: "var(--color-contribution)" }} />
            <div className="flex-[1]" style={{ backgroundColor: "var(--color-friction)" }} />
            <div className="flex-[2]" style={{ backgroundColor: "var(--color-passive)" }} />
            <div className="flex-[1]" style={{ backgroundColor: "var(--color-evaluation)" }} />
            <div className="flex-[3]" style={{ backgroundColor: "var(--color-delegation)" }} />
          </div>

          <p className="text-sm italic text-[var(--color-text-muted)]">
            &ldquo;Next time you hit a wall, try explaining why you disagree
            before asking for alternatives.&rdquo;
          </p>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-16" />
    </div>
  );
}
