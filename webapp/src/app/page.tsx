import AnalysisInput from "@/components/AnalysisInput";
import SampleReport from "@/components/SampleReport";

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

      {/* Sample report */}
      <section className="border-t border-[var(--color-border)] py-16">
        <h2 className="mb-8 text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
          Sample report
        </h2>
        <SampleReport />
      </section>

      {/* Footer spacer */}
      <div className="h-16" />
    </div>
  );
}
