import { Turn, AnalysisResult } from "./types";

const DEFAULT_WEB_APP_URL = "http://localhost:3000";

/**
 * Send a transcript to the web app for analysis.
 * Calls POST /api/analyze with the conversation turns and platform info.
 */
export async function analyzeTranscript(
  turns: Turn[],
  platform: string,
  apiKey?: string | null,
  webAppUrl?: string
): Promise<AnalysisResult> {
  const baseUrl = webAppUrl || DEFAULT_WEB_APP_URL;
  const url = `${baseUrl}/api/analyze`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers["X-API-Key"] = apiKey;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      turns,
      platform,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(
      `Analysis API error (${response.status}): ${errorText}`
    );
  }

  const result: AnalysisResult = await response.json();
  return result;
}

/**
 * Save an analysis result to the user's account on the web app.
 * Calls POST /api/analyses with the analysis data and account token.
 */
export async function saveAnalysis(
  result: AnalysisResult,
  accountToken: string,
  webAppUrl?: string
): Promise<void> {
  const baseUrl = webAppUrl || DEFAULT_WEB_APP_URL;
  const url = `${baseUrl}/api/analyses`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accountToken}`,
    },
    body: JSON.stringify(result),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(
      `Save analysis API error (${response.status}): ${errorText}`
    );
  }
}
