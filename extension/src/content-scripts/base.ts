import { Turn } from "../lib/types";

/**
 * Base content script class that all platform-specific scripts extend.
 * Handles DOM observation, turn extraction, and messaging to the background worker.
 */
export abstract class BaseContentScript {
  protected platform: string;
  protected observer: MutationObserver | null = null;
  protected lastTurnCount: number = 0;

  constructor(platform: string) {
    this.platform = platform;
    this.init();
  }

  protected init(): void {
    this.waitForChat()
      .then((container) => {
        console.log(
          `[dontkillmybrain] ${this.platform}: Chat container found, starting observation.`
        );
        this.observeChat(container);
        this.extractExistingTurns();
      })
      .catch((err) => {
        console.warn(
          `[dontkillmybrain] ${this.platform}: Could not find chat container.`,
          err
        );
      });
  }

  /**
   * Get the chat container element. Returns null if not found.
   */
  protected abstract getChatContainer(): Element | null;

  /**
   * Wait for the chat container to appear in the DOM.
   */
  protected abstract waitForChat(): Promise<Element>;

  /**
   * Extract all conversation turns from the current DOM state.
   */
  protected abstract extractTurns(): Turn[];

  /**
   * Start observing the chat container for new messages.
   */
  protected observeChat(container: Element): void {
    this.observer = new MutationObserver(() => {
      try {
        const turns = this.extractTurns();
        if (turns.length > this.lastTurnCount) {
          const newTurns = turns.slice(this.lastTurnCount);
          this.lastTurnCount = turns.length;
          for (const turn of newTurns) {
            chrome.runtime.sendMessage({
              type: "NEW_TURN",
              turn,
              platform: this.platform,
              url: window.location.href,
            });
          }
        }
      } catch (err) {
        console.warn(
          `[dontkillmybrain] ${this.platform}: Error extracting turns during observation.`,
          err
        );
      }
    });

    this.observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  /**
   * Extract any existing turns already in the DOM and send them to the background.
   */
  protected extractExistingTurns(): void {
    try {
      const turns = this.extractTurns();
      this.lastTurnCount = turns.length;
      for (const turn of turns) {
        chrome.runtime.sendMessage({
          type: "NEW_TURN",
          turn,
          platform: this.platform,
          url: window.location.href,
        });
      }
    } catch (err) {
      console.warn(
        `[dontkillmybrain] ${this.platform}: Error extracting existing turns.`,
        err
      );
    }
  }

  /**
   * Utility: wait for an element matching the selector to appear in the DOM.
   */
  protected waitForElement(
    selector: string,
    timeout = 10000
  ): Promise<Element> {
    return new Promise((resolve, reject) => {
      const el = document.querySelector(selector);
      if (el) return resolve(el);

      const observer = new MutationObserver(() => {
        const el = document.querySelector(selector);
        if (el) {
          observer.disconnect();
          resolve(el);
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });

      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Timeout waiting for ${selector}`));
      }, timeout);
    });
  }

  /**
   * Try multiple selectors in order, returning the first match.
   */
  protected waitForAnyElement(
    selectors: string[],
    timeout = 15000
  ): Promise<Element> {
    return new Promise((resolve, reject) => {
      // Check if any selector already matches
      for (const selector of selectors) {
        try {
          const el = document.querySelector(selector);
          if (el) return resolve(el);
        } catch {
          // Invalid selector, skip
        }
      }

      const observer = new MutationObserver(() => {
        for (const selector of selectors) {
          try {
            const el = document.querySelector(selector);
            if (el) {
              observer.disconnect();
              resolve(el);
              return;
            }
          } catch {
            // Invalid selector, skip
          }
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });

      setTimeout(() => {
        observer.disconnect();
        reject(
          new Error(
            `Timeout waiting for any of: ${selectors.join(", ")}`
          )
        );
      }, timeout);
    });
  }

  /**
   * Safely extract text content from an element.
   */
  protected getTextContent(el: Element): string {
    try {
      return (el.textContent || "").trim();
    } catch {
      return "";
    }
  }

  /**
   * Clean up the observer.
   */
  destroy(): void {
    this.observer?.disconnect();
  }
}
