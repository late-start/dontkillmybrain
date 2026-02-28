import Link from "next/link";

const papers = [
  {
    summary:
      "Students using GPT-4 performed 48% better on practice problems \u2014 but when AI access was removed, they scored 17% worse than students who never had it. The gains were a crutch, not learning.",
    authors: "Bastani, H., Bayber, O., & Iyengar, R.",
    title: "Generative AI Can Harm Learning",
    year: 2024,
    venue: "SSRN Working Paper, University of Pennsylvania",
    url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4895486",
  },
  {
    summary:
      "In a study of 758 consultants, AI made people 40% better at tasks inside its capabilities \u2014 but 19% worse at tasks outside them. Most people couldn\u2019t tell the difference.",
    authors: "Dell\u2019Acqua, F., McFowland, E., et al.",
    title: "Navigating the Jagged Technological Frontier",
    year: 2023,
    venue: "SSRN Working Paper, Harvard Business School",
    url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4573321",
  },
  {
    summary:
      "Working with AI demands constant metacognitive effort \u2014 knowing when to delegate, how to evaluate output, and whether to trust it. These are skills that atrophy without practice.",
    authors: "Tankelevitch, L., Kewenig, V., et al.",
    title: "The Metacognitive Demands and Opportunities of Generative AI",
    year: 2024,
    venue: "CHI \u201924, ACM",
    url: "https://dl.acm.org/doi/10.1145/3613904.3642902",
  },
  {
    summary:
      "Introduces \"cognitive surrender\" as a framework for how AI reshapes reasoning. Draws on Kahneman\u2019s System 1/2 model to argue AI acts as a hyper-efficient System 1 substitute, allowing users to bypass effortful thinking entirely.",
    authors: "Shaw, S. D. & Nave, G.",
    title:
      "Thinking \u2014 Fast, Slow, and Artificial: How AI is Reshaping Human Reasoning and the Rise of Cognitive Surrender",
    year: 2026,
    venue: "SSRN Working Paper, The Wharton School",
    url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6097646",
  },
  {
    summary:
      "Identifies six distinct human-AI interaction patterns ranging from full delegation to active collaboration. Finds that AI\u2019s impact on skill development depends more on the interaction pattern than on the task itself.",
    authors: "Shen, J. H. & Tamkin, A.",
    title: "How AI Impacts Skill Formation",
    year: 2026,
    venue: "arXiv preprint, Anthropic",
    url: "https://arxiv.org/abs/2601.20245",
  },
  {
    summary:
      "A survey of 319 knowledge workers found that most reported reduced critical thinking when using AI. Higher confidence in AI correlated with less cognitive effort \u2014 but higher confidence in their own domain skills correlated with more.",
    authors: "Lee, H.-P. H., Sarkar, A., et al.",
    title:
      "The Impact of Generative AI on Critical Thinking: Self-Reported Reductions in Cognitive Effort and Confidence Effects",
    year: 2025,
    venue: "CHI \u201925, Microsoft Research & CMU",
    url: "https://doi.org/10.1145/3706598.3713778",
  },
];

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-[700px] px-4">
      <section className="pb-16 pt-24 sm:pt-32">
        <h1 className="text-2xl font-semibold leading-tight tracking-tight text-[var(--color-text)] sm:text-3xl">
          Research
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          The science behind dontkillmybrain. These papers informed our
          classification framework and signal taxonomy.
        </p>

        <div className="mt-12 space-y-10">
          {papers.map((paper) => (
            <div
              key={paper.url}
              className="border-l-2 border-[var(--color-border)] pl-5 space-y-2"
            >
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {paper.summary}
              </p>
              <div className="space-y-0.5">
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {paper.title}
                </a>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {paper.authors} ({paper.year}) &middot; {paper.venue}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-[var(--color-border)] pt-8">
          <Link
            href="/"
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            &larr; Back to analyzer
          </Link>
        </div>
      </section>

      <div className="h-16" />
    </div>
  );
}
