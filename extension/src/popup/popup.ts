interface EngagementResponse {
  engagementLevel: "engaged" | "coasting" | "passive" | null;
  platform?: string;
  turnCount?: number;
  sessionId?: string;
  analyzed?: boolean;
}

interface AnalysisResponse {
  ok: boolean;
  result?: {
    sessionTitle: string;
    narrative: string;
    nudge: string;
    humanTurnCount: number;
  };
  error?: string;
}

const ENGAGEMENT_LABELS: Record<string, string> = {
  engaged: "You're thinking critically",
  coasting: "You're coasting a bit",
  passive: "AI is doing the thinking",
};

const PLATFORM_LABELS: Record<string, string> = {
  claude: "Claude",
  chatgpt: "ChatGPT",
  gemini: "Gemini",
  grok: "Grok",
  perplexity: "Perplexity",
};

document.addEventListener("DOMContentLoaded", async () => {
  const statusEl = document.getElementById("status")!;
  const reportEl = document.getElementById("report")!;
  const fullReportLink = document.getElementById(
    "full-report"
  ) as HTMLAnchorElement;
  const dashboardLink = document.getElementById(
    "dashboard"
  ) as HTMLAnchorElement;

  // Get settings for the dashboard URL
  let webAppUrl = "http://localhost:3000";
  try {
    const settings = await sendMessage({ type: "GET_SETTINGS" });
    if (settings && settings.webAppUrl) {
      webAppUrl = settings.webAppUrl;
    }
  } catch {
    // Use default
  }

  dashboardLink.href = webAppUrl;

  // Get current engagement status
  try {
    const engagement: EngagementResponse = await sendMessage({
      type: "GET_ENGAGEMENT",
    });

    if (engagement.engagementLevel) {
      const level = engagement.engagementLevel;
      const platformLabel =
        PLATFORM_LABELS[engagement.platform || ""] ||
        engagement.platform ||
        "AI chat";
      const label =
        ENGAGEMENT_LABELS[level] || "Monitoring your conversation";

      statusEl.innerHTML = `
        <div class="status-row">
          <div class="status-indicator ${level}"></div>
          <div class="status-label">
            <strong>${level}</strong> &mdash; ${label}
          </div>
        </div>
        <div class="status-meta">
          ${platformLabel} &middot; ${engagement.turnCount || 0} turns
        </div>
      `;

      // If analyzed, try to show the report
      if (engagement.analyzed && engagement.sessionId) {
        await showReport(
          engagement.sessionId,
          reportEl,
          fullReportLink,
          webAppUrl
        );
      }
    } else {
      statusEl.innerHTML = `
        <div class="status-empty">
          Visit an AI chat to get started.
        </div>
      `;
    }
  } catch (err) {
    console.warn("[dontkillmybrain] Failed to get engagement:", err);
    statusEl.innerHTML = `
      <div class="status-empty">
        Unable to connect to the extension.
      </div>
    `;
  }
});

async function showReport(
  sessionId: string,
  reportEl: HTMLElement,
  fullReportLink: HTMLAnchorElement,
  webAppUrl: string
): Promise<void> {
  try {
    const response: AnalysisResponse = await sendMessage({
      type: "ANALYZE_SESSION",
      sessionId,
    });

    if (response.ok && response.result) {
      const { sessionTitle, narrative, nudge } = response.result;

      // Show first paragraph of narrative (up to first period after 80 chars)
      const shortNarrative = truncateNarrative(narrative, 200);

      reportEl.innerHTML = `
        <div class="report-card">
          <div class="report-title">${escapeHtml(sessionTitle)}</div>
          <div class="report-narrative">${escapeHtml(shortNarrative)}</div>
          ${nudge ? `<div class="report-nudge">${escapeHtml(nudge)}</div>` : ""}
        </div>
      `;

      // Show the full report link
      fullReportLink.href = `${webAppUrl}/report/${sessionId}`;
      fullReportLink.style.display = "inline-block";
    }
  } catch {
    // No report available, that's fine
  }
}

function truncateNarrative(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;

  // Try to cut at a sentence boundary
  const truncated = text.substring(0, maxLen);
  const lastPeriod = truncated.lastIndexOf(".");
  if (lastPeriod > maxLen * 0.5) {
    return truncated.substring(0, lastPeriod + 1);
  }

  return truncated + "...";
}

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function sendMessage(message: Record<string, unknown>): Promise<any> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve(response);
      }
    });
  });
}
