import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="text-base font-semibold text-[var(--color-text)] tracking-wide hover:text-[var(--color-accent)] transition-colors"
          >
            DONTKILLMYBRAIN
          </Link>
          <Link
            href="/research"
            className="text-xs font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors tracking-wide"
          >
            RESEARCH
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/late-start/dontkillmybrain"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            GitHub
          </a>
          <span className="text-xs text-[var(--color-text-muted)]">
            Open source
          </span>
        </div>
      </div>
    </header>
  );
}
