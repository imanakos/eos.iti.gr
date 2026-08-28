export type AnalyticsChoice = "accepted" | "declined";

export const ANALYTICS_STORAGE_KEY = "eos-analytics-consent-v1";
export const PRIVACY_SETTINGS_EVENT = "eos:open-privacy-settings";
export const ANALYTICS_CHOICE_EVENT = "eos:analytics-choice-change";

const CHOICE_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;

interface StoredAnalyticsChoice {
  choice: AnalyticsChoice;
  updatedAt: string;
}

function isAnalyticsChoice(value: unknown): value is AnalyticsChoice {
  return value === "accepted" || value === "declined";
}

export function readAnalyticsChoice(): AnalyticsChoice | null {
  if (typeof window === "undefined") return null;

  try {
    const rawValue = window.localStorage.getItem(ANALYTICS_STORAGE_KEY);
    if (!rawValue) return null;

    const stored = JSON.parse(rawValue) as Partial<StoredAnalyticsChoice>;
    const updatedAt = stored.updatedAt ? Date.parse(stored.updatedAt) : Number.NaN;

    if (
      !isAnalyticsChoice(stored.choice) ||
      !Number.isFinite(updatedAt) ||
      Date.now() - updatedAt > CHOICE_MAX_AGE_MS
    ) {
      window.localStorage.removeItem(ANALYTICS_STORAGE_KEY);
      return null;
    }

    return stored.choice;
  } catch {
    return null;
  }
}

export function storeAnalyticsChoice(choice: AnalyticsChoice) {
  if (typeof window === "undefined") return;

  const stored: StoredAnalyticsChoice = {
    choice,
    updatedAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // The in-memory choice still applies when browser storage is unavailable.
  }

  window.dispatchEvent(new CustomEvent(ANALYTICS_CHOICE_EVENT, { detail: choice }));
}

export function clearAnalyticsChoice() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(ANALYTICS_STORAGE_KEY);
  } catch {
    // The settings panel can still be reopened when browser storage is unavailable.
  }

  window.dispatchEvent(new CustomEvent(ANALYTICS_CHOICE_EVENT, { detail: null }));
}

export function openPrivacySettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(PRIVACY_SETTINGS_EVENT));
}
