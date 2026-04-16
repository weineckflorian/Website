export type CookieConsentLevel = "none" | "essential" | "all";

const V1_KEY = "fw_cookie_consent_v1";
const V2_KEY = "fw_cookie_consent_v2";

export function readCookieConsent(): CookieConsentLevel {
  if (typeof window === "undefined") return "none";

  const v2 = window.localStorage.getItem(V2_KEY);
  if (v2 === "essential" || v2 === "all") return v2;

  const v1 = window.localStorage.getItem(V1_KEY);
  if (v1 === "accepted") return "all";
  if (v1 === "declined") return "essential";

  return "none";
}

export function writeCookieConsent(level: Exclude<CookieConsentLevel, "none">) {
  window.localStorage.setItem(V2_KEY, level);
  window.localStorage.removeItem(V1_KEY);
  window.dispatchEvent(new Event("fw-cookie-consent-changed"));
}

export function mapsEmbedAllowed(): boolean {
  return readCookieConsent() === "all";
}
