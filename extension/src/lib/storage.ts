import { ExtensionSettings, SessionData, AnalysisResult } from "./types";

const DEFAULT_SETTINGS: ExtensionSettings = {
  apiKey: null,
  webAppUrl: "http://localhost:3000",
  autoSave: false,
  accountToken: null,
  onboardingComplete: false,
};

/**
 * Get extension settings from chrome.storage.local.
 * Returns default settings merged with any stored values.
 */
export async function getSettings(): Promise<ExtensionSettings> {
  const result = await chrome.storage.local.get("settings");
  if (result.settings) {
    return { ...DEFAULT_SETTINGS, ...result.settings };
  }
  return { ...DEFAULT_SETTINGS };
}

/**
 * Save extension settings. Merges with existing settings.
 */
export async function saveSettings(
  settings: Partial<ExtensionSettings>
): Promise<void> {
  const current = await getSettings();
  const updated = { ...current, ...settings };
  await chrome.storage.local.set({ settings: updated });
}

/**
 * Get the current session data for a platform.
 */
export async function getSession(
  platform: string
): Promise<SessionData | null> {
  const key = `session_${platform}`;
  const result = await chrome.storage.local.get(key);
  return (result[key] as SessionData) || null;
}

/**
 * Save session data for a platform.
 */
export async function saveSession(session: SessionData): Promise<void> {
  const key = `session_${session.platform}`;
  await chrome.storage.local.set({ [key]: session });
}

/**
 * Get a cached analysis result by session ID.
 */
export async function getAnalysisResult(
  sessionId: string
): Promise<AnalysisResult | null> {
  const key = `analysis_${sessionId}`;
  const result = await chrome.storage.local.get(key);
  return (result[key] as AnalysisResult) || null;
}

/**
 * Cache an analysis result by session ID.
 */
export async function saveAnalysisResult(
  sessionId: string,
  analysisResult: AnalysisResult
): Promise<void> {
  const key = `analysis_${sessionId}`;
  await chrome.storage.local.set({ [key]: analysisResult });
}

/**
 * Clear session data for a platform.
 */
export async function clearSession(platform: string): Promise<void> {
  const key = `session_${platform}`;
  await chrome.storage.local.remove(key);
}
