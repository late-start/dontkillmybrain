import { Turn } from "../lib/types";
import { BaseContentScript } from "./base";

/**
 * Content script for ChatGPT (chatgpt.com)
 * Monitors the conversation DOM and extracts human/AI turns.
 */
class ChatGPTContentScript extends BaseContentScript {
  private static readonly CONTAINER_SELECTORS = [
    'main [class*="react-scroll-to-bottom"]',
    "main .flex.flex-col",
    'main [role="presentation"]',
    "main",
  ];

  constructor() {
    super("chatgpt");
  }

  protected getChatContainer(): Element | null {
    for (const selector of ChatGPTContentScript.CONTAINER_SELECTORS) {
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
      ChatGPTContentScript.CONTAINER_SELECTORS,
      20000
    );
  }

  protected extractTurns(): Turn[] {
    // Strategy 1: Use data-testid conversation-turn elements
    const turnElements = document.querySelectorAll(
      '[data-testid^="conversation-turn"]'
    );
    if (turnElements.length > 0) {
      return this.extractFromConversationTurns(Array.from(turnElements));
    }

    // Strategy 2: Use data-message-author-role attributes
    const userMessages = document.querySelectorAll(
      '[data-message-author-role="user"]'
    );
    const assistantMessages = document.querySelectorAll(
      '[data-message-author-role="assistant"]'
    );
    if (userMessages.length > 0 || assistantMessages.length > 0) {
      return this.extractFromAuthorRoles(
        Array.from(userMessages),
        Array.from(assistantMessages)
      );
    }

    // Strategy 3: Fallback to container-based extraction
    const container = this.getChatContainer();
    if (!container) return [];

    return this.extractFromContainer(container);
  }

  /**
   * Extract turns from data-testid="conversation-turn-N" elements.
   */
  private extractFromConversationTurns(elements: Element[]): Turn[] {
    const turns: Turn[] = [];

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];

      // Determine role from child elements
      const userEl = el.querySelector(
        '[data-message-author-role="user"]'
      );
      const assistantEl = el.querySelector(
        '[data-message-author-role="assistant"]'
      );

      let role: "human" | "ai";
      let contentEl: Element | null = null;

      if (userEl) {
        role = "human";
        contentEl = userEl;
      } else if (assistantEl) {
        role = "ai";
        contentEl = assistantEl;
      } else {
        // Fallback: alternate based on position (ChatGPT starts with system, then user)
        role = i % 2 === 1 ? "human" : "ai";
        contentEl = el;
      }

      const content = this.getTextContent(contentEl || el);
      if (content.length < 2) continue;

      turns.push({
        role,
        content,
        index: turns.length,
        timestamp: Date.now(),
      });
    }

    return turns;
  }

  /**
   * Extract turns from data-message-author-role elements.
   */
  private extractFromAuthorRoles(
    userEls: Element[],
    assistantEls: Element[]
  ): Turn[] {
    const tagged: Array<{ el: Element; role: "human" | "ai" }> = [
      ...userEls.map((el) => ({ el, role: "human" as const })),
      ...assistantEls.map((el) => ({ el, role: "ai" as const })),
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
   * Fallback: extract from the container by looking for message-like blocks.
   */
  private extractFromContainer(container: Element): Turn[] {
    const turns: Turn[] = [];

    // Look for elements with substantial text that might be messages
    const candidates = container.querySelectorAll(
      '[class*="message"], [class*="text"], [class*="prose"], .markdown'
    );

    let turnIndex = 0;
    for (const candidate of candidates) {
      const text = this.getTextContent(candidate);
      if (text.length < 5) continue;

      // Alternate between human and AI
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
}

// Instantiate the content script
new ChatGPTContentScript();
