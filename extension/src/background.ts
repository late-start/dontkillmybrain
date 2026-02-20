import {
  Turn,
  SessionData,
  EngagementLevel,
  MessageType,
  AnalysisResult,
} from "./lib/types";
import {
  getSettings,
  saveSettings,
  getSession,
  saveSession,
  clearSession,
  getAnalysisResult,
  saveAnalysisResult,
} from "./lib/storage";
import { analyzeTranscript, saveAnalysis } from "./lib/api";
import { classifyEngagement } from "./heuristic/classifier";

// --- In-memory session tracking ---

const activeSessions = new Map<string, SessionData>();

// Badge colors for engagement levels
const BADGE_COLORS: Record<EngagementLevel, string> = {
  engaged: "#22c55e", // green
  coasting: "#f59e0b", // amber
  passive: "#ef4444", // red
};

const BADGE_TEXT: Record<EngagementLevel, string> = {
  engaged: " ",
  coasting: " ",
  passive: " ",
};

// --- Helper functions ---

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function getOrCreateSession(
  platform: string,
  url: string
): SessionData {
  const existing = activeSessions.get(platform);
  if (existing && existing.url === url) {
    return existing;
  }

  const session: SessionData = {
    id: generateSessionId(),
    platform,
    url,
    turns: [],
    startTime: Date.now(),
    lastActivity: Date.now(),
    engagementLevel: "coasting",
    analyzed: false,
  };

  activeSessions.set(platform, session);
  return session;
}

async function updateBadge(
  engagement: EngagementLevel | null,
  tabId?: number
): Promise<void> {
  try {
    if (!engagement) {
      await chrome.action.setBadgeText({ text: "" });
      return;
    }

    await chrome.action.setBadgeBackgroundColor({
      color: BADGE_COLORS[engagement],
    });
    await chrome.action.setBadgeText({
      text: BADGE_TEXT[engagement],
    });
  } catch (err) {
    console.warn("[dontkillmybrain] Failed to update badge:", err);
  }
}

async function runAnalysisPipeline(
  session: SessionData
): Promise<void> {
  try {
    const settings = await getSettings();

    if (session.turns.length < 2) {
      console.log(
        "[dontkillmybrain] Session too short for analysis, skipping."
      );
      return;
    }

    // Check if we already have an analysis for this session
    const existingAnalysis = await getAnalysisResult(session.id);
    if (existingAnalysis) {
      console.log(
        "[dontkillmybrain] Analysis already exists for this session."
      );
      return;
    }

    console.log(
      `[dontkillmybrain] Running analysis for session ${session.id} (${session.turns.length} turns)`
    );

    // Call the API to analyze the transcript
    const result: AnalysisResult = await analyzeTranscript(
      session.turns,
      session.platform,
      settings.apiKey,
      settings.webAppUrl
    );

    // Cache the result
    await saveAnalysisResult(session.id, result);

    // Mark session as analyzed
    session.analyzed = true;
    await saveSession(session);

    // Update badge to indicate a report is available
    await chrome.action.setBadgeBackgroundColor({ color: "#6366f1" });
    await chrome.action.setBadgeText({ text: "!" });

    // If auto-save is enabled and we have an account token, save to account
    if (settings.autoSave && settings.accountToken) {
      try {
        await saveAnalysis(
          result,
          settings.accountToken,
          settings.webAppUrl
        );
        console.log(
          "[dontkillmybrain] Analysis auto-saved to account."
        );
      } catch (saveErr) {
        console.warn(
          "[dontkillmybrain] Failed to auto-save analysis:",
          saveErr
        );
      }
    }
  } catch (err) {
    console.error("[dontkillmybrain] Analysis pipeline failed:", err);
  }
}

// --- Message listener ---

chrome.runtime.onMessage.addListener(
  (
    message: MessageType,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response?: unknown) => void
  ) => {
    // Handle messages asynchronously
    handleMessage(message, sendResponse);
    // Return true to indicate async response
    return true;
  }
);

async function handleMessage(
  message: MessageType,
  sendResponse: (response?: unknown) => void
): Promise<void> {
  try {
    switch (message.type) {
      case "NEW_TURN": {
        const session = getOrCreateSession(
          message.platform,
          message.url
        );

        // Avoid duplicate turns (content scripts may re-send existing turns)
        const isDuplicate = session.turns.some(
          (t) =>
            t.index === message.turn.index &&
            t.role === message.turn.role &&
            t.content === message.turn.content
        );

        if (!isDuplicate) {
          session.turns.push({
            ...message.turn,
            index: session.turns.length,
            timestamp: Date.now(),
          });
          session.lastActivity = Date.now();

          // Update engagement level using heuristic classifier
          session.engagementLevel = classifyEngagement(session.turns);

          // Persist session
          await saveSession(session);

          // Update the badge
          await updateBadge(session.engagementLevel);
        }

        sendResponse({ ok: true });
        break;
      }

      case "SESSION_END": {
        const session = activeSessions.get(message.platform);
        if (session) {
          // Run analysis pipeline in the background
          runAnalysisPipeline(session);
          activeSessions.delete(message.platform);
        }
        sendResponse({ ok: true });
        break;
      }

      case "GET_SESSION": {
        const session = activeSessions.get(message.platform);
        if (session) {
          sendResponse(session);
        } else {
          // Try to load from storage
          const stored = await getSession(message.platform);
          sendResponse(stored);
        }
        break;
      }

      case "GET_ENGAGEMENT": {
        // Return the engagement level of the most recently active session
        let latestSession: SessionData | null = null;
        let latestTime = 0;

        for (const session of activeSessions.values()) {
          if (session.lastActivity > latestTime) {
            latestTime = session.lastActivity;
            latestSession = session;
          }
        }

        if (latestSession) {
          sendResponse({
            engagementLevel: latestSession.engagementLevel,
            platform: latestSession.platform,
            turnCount: latestSession.turns.length,
            sessionId: latestSession.id,
            analyzed: latestSession.analyzed,
          });
        } else {
          sendResponse({ engagementLevel: null });
        }
        break;
      }

      case "ANALYZE_SESSION": {
        // Find the session and run analysis
        let targetSession: SessionData | null = null;

        for (const session of activeSessions.values()) {
          if (session.id === message.sessionId) {
            targetSession = session;
            break;
          }
        }

        if (!targetSession) {
          // Try to load from storage by checking all platforms
          for (const platform of [
            "claude",
            "chatgpt",
            "gemini",
            "grok",
            "perplexity",
          ]) {
            const stored = await getSession(platform);
            if (stored && stored.id === message.sessionId) {
              targetSession = stored;
              break;
            }
          }
        }

        if (targetSession) {
          await runAnalysisPipeline(targetSession);

          const result = await getAnalysisResult(message.sessionId);
          sendResponse({ ok: true, result });
        } else {
          sendResponse({ ok: false, error: "Session not found" });
        }
        break;
      }

      case "GET_SETTINGS": {
        const settings = await getSettings();
        sendResponse(settings);
        break;
      }

      case "SAVE_SETTINGS": {
        await saveSettings(message.settings);
        sendResponse({ ok: true });
        break;
      }

      default: {
        console.warn(
          "[dontkillmybrain] Unknown message type:",
          message
        );
        sendResponse({ error: "Unknown message type" });
      }
    }
  } catch (err) {
    console.error("[dontkillmybrain] Error handling message:", err);
    sendResponse({
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}

// --- Tab change detection for session end ---

// Known AI platform hostnames
const AI_PLATFORMS = new Set([
  "claude.ai",
  "chatgpt.com",
  "gemini.google.com",
  "grok.x.ai",
  "www.perplexity.ai",
]);

function getPlatformFromHostname(hostname: string): string | null {
  if (hostname === "claude.ai") return "claude";
  if (hostname === "chatgpt.com") return "chatgpt";
  if (hostname === "gemini.google.com") return "gemini";
  if (hostname === "grok.x.ai") return "grok";
  if (hostname === "www.perplexity.ai") return "perplexity";
  return null;
}

// Track which tabs are on AI platforms
const tabPlatforms = new Map<number, string>();

chrome.tabs.onUpdated.addListener(
  (
    tabId: number,
    changeInfo: { status?: string; url?: string },
    tab: chrome.tabs.Tab
  ) => {
    if (changeInfo.status !== "complete" || !tab.url) return;

    try {
      const url = new URL(tab.url);
      const platform = getPlatformFromHostname(url.hostname);
      const previousPlatform = tabPlatforms.get(tabId);

      if (platform) {
        tabPlatforms.set(tabId, platform);
      } else {
        tabPlatforms.delete(tabId);
      }

      // If the tab was on an AI platform and navigated away, end the session
      if (previousPlatform && previousPlatform !== platform) {
        const session = activeSessions.get(previousPlatform);
        if (session) {
          console.log(
            `[dontkillmybrain] User navigated away from ${previousPlatform}, ending session.`
          );
          runAnalysisPipeline(session);
          activeSessions.delete(previousPlatform);
          updateBadge(null);
        }
      }
    } catch {
      // Invalid URL, ignore
    }
  }
);

chrome.tabs.onRemoved.addListener((tabId: number) => {
  const platform = tabPlatforms.get(tabId);
  if (platform) {
    tabPlatforms.delete(tabId);
    const session = activeSessions.get(platform);
    if (session) {
      console.log(
        `[dontkillmybrain] Tab closed for ${platform}, ending session.`
      );
      runAnalysisPipeline(session);
      activeSessions.delete(platform);
      updateBadge(null);
    }
  }
});

// When the active tab changes, update the badge to reflect the current tab's session
chrome.tabs.onActivated.addListener(
  async (activeInfo: { tabId: number; windowId: number }) => {
    try {
      const tab = await chrome.tabs.get(activeInfo.tabId);
      if (!tab.url) {
        await updateBadge(null);
        return;
      }

      const url = new URL(tab.url);
      const platform = getPlatformFromHostname(url.hostname);

      if (platform) {
        const session = activeSessions.get(platform);
        if (session) {
          await updateBadge(session.engagementLevel);
          return;
        }
      }

      await updateBadge(null);
    } catch {
      // Tab may not exist, ignore
    }
  }
);

// --- Install handler ---

chrome.runtime.onInstalled.addListener(
  (details: chrome.runtime.InstalledDetails) => {
    if (details.reason === "install") {
      // Open onboarding page on first install
      chrome.tabs.create({
        url: chrome.runtime.getURL("onboarding/onboarding.html"),
      });
    }
  }
);

console.log("[dontkillmybrain] Background service worker started.");
