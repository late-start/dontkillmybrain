document.addEventListener("DOMContentLoaded", () => {
  const apiKeyInput = document.getElementById(
    "api-key"
  ) as HTMLInputElement;
  const webAppUrlInput = document.getElementById(
    "web-app-url"
  ) as HTMLInputElement;
  const autoSaveCheckbox = document.getElementById(
    "auto-save"
  ) as HTMLInputElement;
  const saveBtn = document.getElementById(
    "save-btn"
  ) as HTMLButtonElement;
  const apiKeyError = document.getElementById(
    "api-key-error"
  ) as HTMLElement;

  // Load existing settings
  loadSettings();

  // Handle save button
  saveBtn.addEventListener("click", () => {
    const apiKey = apiKeyInput.value.trim();
    const webAppUrl = webAppUrlInput.value.trim() || "http://localhost:3000";
    const autoSave = autoSaveCheckbox.checked;

    // Validate API key format if provided
    if (apiKey && !validateApiKey(apiKey)) {
      apiKeyError.textContent =
        'API key should start with "sk-ant-". Please check and try again.';
      apiKeyError.style.display = "block";
      return;
    }

    apiKeyError.style.display = "none";

    // Save settings
    chrome.runtime.sendMessage(
      {
        type: "SAVE_SETTINGS",
        settings: {
          apiKey: apiKey || null,
          webAppUrl,
          autoSave,
          onboardingComplete: true,
        },
      },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error(
            "[dontkillmybrain] Failed to save settings:",
            chrome.runtime.lastError
          );
          return;
        }

        if (response && response.ok) {
          // Close the tab
          window.close();
        }
      }
    );
  });

  // Clear error on input
  apiKeyInput.addEventListener("input", () => {
    apiKeyError.style.display = "none";
  });
});

function validateApiKey(key: string): boolean {
  // Accept keys that start with "sk-ant-" (Anthropic API keys)
  // Also accept empty string (no key)
  if (!key) return true;
  return key.startsWith("sk-ant-");
}

function loadSettings(): void {
  chrome.runtime.sendMessage(
    { type: "GET_SETTINGS" },
    (response) => {
      if (chrome.runtime.lastError || !response) return;

      const apiKeyInput = document.getElementById(
        "api-key"
      ) as HTMLInputElement;
      const webAppUrlInput = document.getElementById(
        "web-app-url"
      ) as HTMLInputElement;
      const autoSaveCheckbox = document.getElementById(
        "auto-save"
      ) as HTMLInputElement;

      if (response.apiKey) {
        apiKeyInput.value = response.apiKey;
      }
      if (response.webAppUrl) {
        webAppUrlInput.value = response.webAppUrl;
      }
      if (response.autoSave) {
        autoSaveCheckbox.checked = response.autoSave;
      }
    }
  );
}
