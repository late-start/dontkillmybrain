import { Turn } from "../lib/types";
import { BaseContentScript } from "./base";

/**
 * Content script for Perplexity (perplexity.ai)
 * Monitors the conversation DOM and extracts human/AI turns.
 * Perplexity has a unique UI with search results mixed into AI responses.
 */
class PerplexityContentScript extends BaseContentScript {
  private static readonly CONTAINER_SELECTORS = [
    '[class*="thread"]',
    '[class*="conversation"]',
    '[class*="results"]',
    "main",
    '[role="main"]',
  ];

  private static readonly HUMAN_SELECTORS = [
    '[class*="query"]',
    '[class*="user-question"]',
    '[class*="search-query"]',
    '[data-role="user"]',
    '[class*="ask"]',
  ];

  private static readonly AI_SELECTORS = [
    '[class*="answer"]',
    '[class*="response"]',
    '[class*="result-content"]',
    '[data-role="assistant"]',
    '[class*="prose"]',
  ];

  constructor() {
    super("perplexity");
  }

  protected getChatContainer(): Element | null {
    for (const selector of PerplexityContentScript.CONTAINER_SELECTORS) {
      try {
        const el = document.querySelector(selector);
        if (el) return el;
      } catch {
        // Invalid selector, skip
      }
    }
    return null;
  }

  protected async waitForChat(): Promise<Element> {
    return this.waitForAnyElement(
      PerplexityContentScript.CONTAINER_SELECTORS,
      20000
    );
  }

  protected extractTurns(): Turn[] {
    // Strategy 1: Try specific Perplexity selectors
    const humanEls = this.queryAll(
      PerplexityContentScript.HUMAN_SELECTORS
    );
    const aiEls = this.queryAll(PerplexityContentScript.AI_SELECTORS);

    if (humanEls.length > 0 || aiEls.length > 0) {
      return this.extractFromSeparateSelectors(humanEls, aiEls);
    }

    // Strategy 2: Look for Perplexity's question-answer blocks
    // Perplexity typically shows a question followed by a response section
    const blocks = this.queryAll([
      '[class*="thread-block"]',
      '[class*="qa-block"]',
      '[class*="search-result"]',
    ]);

    if (blocks.length > 0) {
      return this.extractFromBlocks(blocks);
    }

    // Strategy 3: Container-based fallback
    const container = this.getChatContainer();
    if (!container) return [];

    return this.extractFromContainer(container);
  }

  /**
   * Extract turns from separate human and AI element lists.
   */
  private extractFromSeparateSelectors(
    humanEls: Element[],
    aiEls: Element[]
  ): Turn[] {
    const tagged: Array<{ el: Element; role: "human" | "ai" }> = [
      ...humanEls.map((el) => ({ el, role: "human" as const })),
      ...aiEls.map((el) => ({ el, role: "ai" as const })),
    ];

    tagged.sort((a, b) => {
      const pos = a.el.compareDocumentPosition(b.el);
      if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
      if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
      return 0;
    });

    return tagged
      .map((item, index) => ({
        role: item.role,
        content: this.getTextContent(item.el),
        index,
        timestamp: Date.now(),
      }))
      .filter((t) => t.content.length > 0);
  }

  /**
   * Extract turns from question-answer blocks.
   * Each block typically contains a query and a response.
   */
  private extractFromBlocks(blocks: Element[]): Turn[] {
    const turns: Turn[] = [];

    for (const block of blocks) {
      // Try to find the question within the block
      const queryEl =
        block.querySelector('[class*="query"]') ||
        block.querySelector('[class*="question"]') ||
        block.querySelector("h2") ||
        block.querySelector("h3");

      // Try to find the answer within the block
      const answerEl =
        block.querySelector('[class*="answer"]') ||
        block.querySelector('[class*="response"]') ||
        block.querySelector('[class*="prose"]') ||
        block.querySelector('[class*="text"]');

      if (queryEl) {
        const queryText = this.getTextContent(queryEl);
        if (queryText.length > 0) {
          turns.push({
            role: "human",
            content: queryText,
            index: turns.length,
            timestamp: Date.now(),
          });
        }
      }

      if (answerEl) {
        const answerText = this.getTextContent(answerEl);
        if (answerText.length > 0) {
          turns.push({
            role: "ai",
            content: answerText,
            index: turns.length,
            timestamp: Date.now(),
          });
        }
      }
    }

    return turns;
  }

  /**
   * Fallback: extract from container by looking for large text blocks.
   */
  private extractFromContainer(container: Element): Turn[] {
    const turns: Turn[] = [];
    const children = Array.from(container.children);

    let turnIndex = 0;
    for (const child of children) {
      const text = this.getTextContent(child);
      if (text.length < 5) continue;

      // Perplexity often has search queries as short text and responses as long text
      const role: "human" | "ai" = turnIndex % 2 === 0 ? "human" : "ai";
      turns.push({
        role,
        content: text,
        index: turnIndex,
        timestamp: Date.now(),
      });
      turnIndex++;
    }

    return turns;
  }

  /**
   * Query all elements matching any of the given selectors.
   */
  private queryAll(selectors: string[]): Element[] {
    for (const selector of selectors) {
      try {
        const els = document.querySelectorAll(selector);
        if (els.length > 0) return Array.from(els);
      } catch {
        // Invalid selector, skip
      }
    }
    return [];
  }
}

// Instantiate the content script
new PerplexityContentScript();
