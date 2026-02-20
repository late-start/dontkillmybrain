import { Turn } from "../lib/types";
import { BaseContentScript } from "./base";

/**
 * Content script for Claude.ai
 * Monitors the conversation DOM and extracts human/AI turns.
 */
class ClaudeContentScript extends BaseContentScript {
  private static readonly CONTAINER_SELECTORS = [
    '[data-testid="conversation"]',
    '[class*="conversation"]',
    "main .overflow-y-auto",
    "main",
  ];

  private static readonly HUMAN_SELECTORS = [
    '[data-testid="human-turn"]',
    ".human-turn",
    '[data-role="human"]',
  ];

  private static readonly AI_SELECTORS = [
    '[data-testid="ai-turn"]',
    ".ai-turn",
    '[data-role="assistant"]',
    '[data-is-streaming]',
  ];

  constructor() {
    super("claude");
  }

  protected getChatContainer(): Element | null {
    for (const selector of ClaudeContentScript.CONTAINER_SELECTORS) {
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
      ClaudeContentScript.CONTAINER_SELECTORS,
      20000
    );
  }

  protected extractTurns(): Turn[] {
    const turns: Turn[] = [];

    // Strategy 1: Try data-testid selectors
    const humanEls = this.queryAll(ClaudeContentScript.HUMAN_SELECTORS);
    const aiEls = this.queryAll(ClaudeContentScript.AI_SELECTORS);

    if (humanEls.length > 0 || aiEls.length > 0) {
      return this.extractFromSeparateSelectors(humanEls, aiEls);
    }

    // Strategy 2: Look for alternating message blocks within the container
    const container = this.getChatContainer();
    if (!container) return turns;

    return this.extractFromContainer(container);
  }

  /**
   * Extract turns when we have separate selectors for human and AI elements.
   * Merge them by their DOM order.
   */
  private extractFromSeparateSelectors(
    humanEls: Element[],
    aiEls: Element[]
  ): Turn[] {
    const tagged: Array<{ el: Element; role: "human" | "ai" }> = [
      ...humanEls.map((el) => ({ el, role: "human" as const })),
      ...aiEls.map((el) => ({ el, role: "ai" as const })),
    ];

    // Sort by DOM order
    tagged.sort((a, b) => {
      const pos = a.el.compareDocumentPosition(b.el);
      if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
      if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
      return 0;
    });

    return tagged.map((item, index) => ({
      role: item.role,
      content: this.getTextContent(item.el),
      index,
      timestamp: Date.now(),
    }));
  }

  /**
   * Fallback: extract from the container using structural heuristics.
   * Claude's conversation tends to have direct children that alternate between
   * user messages and assistant responses.
   */
  private extractFromContainer(container: Element): Turn[] {
    const turns: Turn[] = [];
    const children = Array.from(container.children);

    // Look for elements that look like message blocks
    // They typically have substantial text content and are direct children
    let turnIndex = 0;
    for (const child of children) {
      const text = this.getTextContent(child);
      if (text.length < 5) continue; // Skip decorative / empty elements

      // Heuristic: odd blocks are human, even are AI (Claude starts with human)
      // This is imperfect but serves as a fallback
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
new ClaudeContentScript();
