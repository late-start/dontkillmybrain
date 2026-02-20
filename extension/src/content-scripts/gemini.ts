import { Turn } from "../lib/types";
import { BaseContentScript } from "./base";

/**
 * Content script for Google Gemini (gemini.google.com)
 * Monitors the conversation DOM and extracts human/AI turns.
 */
class GeminiContentScript extends BaseContentScript {
  private static readonly CONTAINER_SELECTORS = [
    ".conversation-container",
    '[class*="conversation"]',
    'main [class*="chat"]',
    "main",
    '[role="main"]',
  ];

  private static readonly HUMAN_SELECTORS = [
    ".user-query",
    '[class*="user-query"]',
    '[class*="query-text"]',
    '[data-role="user"]',
    ".query-content",
  ];

  private static readonly AI_SELECTORS = [
    ".model-response",
    '[class*="model-response"]',
    '[class*="response-text"]',
    '[data-role="model"]',
    ".response-content",
    "message-content",
  ];

  constructor() {
    super("gemini");
  }

  protected getChatContainer(): Element | null {
    for (const selector of GeminiContentScript.CONTAINER_SELECTORS) {
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
      GeminiContentScript.CONTAINER_SELECTORS,
      20000
    );
  }

  protected extractTurns(): Turn[] {
    // Strategy 1: Try specific Gemini selectors
    const humanEls = this.queryAll(GeminiContentScript.HUMAN_SELECTORS);
    const aiEls = this.queryAll(GeminiContentScript.AI_SELECTORS);

    if (humanEls.length > 0 || aiEls.length > 0) {
      return this.extractFromSeparateSelectors(humanEls, aiEls);
    }

    // Strategy 2: Look for turn-based elements
    const turnEls = this.queryAll([
      '[class*="turn"]',
      '[class*="message"]',
      '[class*="chat-message"]',
    ]);
    if (turnEls.length > 0) {
      return this.extractFromTurnElements(turnEls);
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

    // Sort by DOM order
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
   * Extract turns from generic turn/message elements.
   * Try to determine role from class names or content structure.
   */
  private extractFromTurnElements(elements: Element[]): Turn[] {
    const turns: Turn[] = [];

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const text = this.getTextContent(el);
      if (text.length < 3) continue;

      const className = (el.className || "").toLowerCase();
      let role: "human" | "ai";

      if (
        className.includes("user") ||
        className.includes("human") ||
        className.includes("query")
      ) {
        role = "human";
      } else if (
        className.includes("model") ||
        className.includes("assistant") ||
        className.includes("response") ||
        className.includes("bot")
      ) {
        role = "ai";
      } else {
        // Alternate based on position
        role = turns.length % 2 === 0 ? "human" : "ai";
      }

      turns.push({
        role,
        content: text,
        index: turns.length,
        timestamp: Date.now(),
      });
    }

    return turns;
  }

  /**
   * Fallback: extract from container children.
   */
  private extractFromContainer(container: Element): Turn[] {
    const turns: Turn[] = [];
    const children = Array.from(container.children);

    let turnIndex = 0;
    for (const child of children) {
      const text = this.getTextContent(child);
      if (text.length < 5) continue;

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
new GeminiContentScript();
