import { Turn } from "../lib/types";
import { BaseContentScript } from "./base";

/**
 * Content script for Grok (grok.x.ai)
 * Monitors the conversation DOM and extracts human/AI turns.
 * Uses generic heuristics since Grok's DOM structure may vary.
 */
class GrokContentScript extends BaseContentScript {
  private static readonly CONTAINER_SELECTORS = [
    '[class*="conversation"]',
    '[class*="chat-container"]',
    '[class*="messages"]',
    'main [class*="scroll"]',
    "main",
    '[role="main"]',
  ];

  private static readonly HUMAN_SELECTORS = [
    '[data-role="user"]',
    '[class*="user-message"]',
    '[class*="human"]',
    '.message[data-sender="user"]',
  ];

  private static readonly AI_SELECTORS = [
    '[data-role="assistant"]',
    '[class*="assistant-message"]',
    '[class*="grok-response"]',
    '[class*="bot-message"]',
    '.message[data-sender="assistant"]',
  ];

  constructor() {
    super("grok");
  }

  protected getChatContainer(): Element | null {
    for (const selector of GrokContentScript.CONTAINER_SELECTORS) {
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
      GrokContentScript.CONTAINER_SELECTORS,
      20000
    );
  }

  protected extractTurns(): Turn[] {
    // Strategy 1: Try specific role-based selectors
    const humanEls = this.queryAll(GrokContentScript.HUMAN_SELECTORS);
    const aiEls = this.queryAll(GrokContentScript.AI_SELECTORS);

    if (humanEls.length > 0 || aiEls.length > 0) {
      return this.extractFromSeparateSelectors(humanEls, aiEls);
    }

    // Strategy 2: Look for generic message elements
    const messageEls = this.queryAll([
      '[class*="message"]',
      '[class*="turn"]',
      '[class*="chat-item"]',
      '[role="row"]',
      '[role="listitem"]',
    ]);

    if (messageEls.length > 0) {
      return this.extractFromMessageElements(messageEls);
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
   * Extract turns from generic message elements.
   * Attempt to determine role from class names, data attributes, or structure.
   */
  private extractFromMessageElements(elements: Element[]): Turn[] {
    const turns: Turn[] = [];

    for (const el of elements) {
      const text = this.getTextContent(el);
      if (text.length < 3) continue;

      const className = (el.className || "").toLowerCase();
      const dataRole = el.getAttribute("data-role") || "";
      const dataSender = el.getAttribute("data-sender") || "";

      let role: "human" | "ai";

      if (
        className.includes("user") ||
        dataRole === "user" ||
        dataSender === "user" ||
        className.includes("human")
      ) {
        role = "human";
      } else if (
        className.includes("assistant") ||
        className.includes("bot") ||
        className.includes("grok") ||
        dataRole === "assistant" ||
        dataSender === "assistant"
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
new GrokContentScript();
