"use client";

export type CookieConsentState = {
  necessary: true;
  analytics: boolean;
  timestamp: number;
};

const STORAGE_KEY = "tbb-cookie-consent";
export const CONSENT_EVENT = "tbb-cookie-consent-change";

export function getStoredConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CookieConsentState) : null;
  } catch {
    return null;
  }
}

export function storeConsent(analytics: boolean) {
  const state: CookieConsentState = {
    necessary: true,
    analytics,
    timestamp: Date.now(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
  return state;
}
