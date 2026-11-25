import { readCookie, AUTH_COOKIE_CHANGE_EVENT } from "./cookie";
import { safeAuthDestination } from "./authRedirect";

import { SESSION_AUTH_COOKIE, GOOGLE_AUTH_CONTEXT_KEY } from "./authConstants";
export { SESSION_AUTH_COOKIE, GOOGLE_AUTH_CONTEXT_KEY } from "./authConstants";
const GOOGLE_AUTH_MAX_AGE = 30 * 60 * 1000;
export type BrowserAuthMode = "bearer" | "session" | "google" | "";

export const parseGoogleAuthContext = (raw: string | null, now = Date.now()): { destination: string; startedAt: number } | null => {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw);
    if (typeof value.startedAt !== "number" || !Number.isFinite(value.startedAt) || value.startedAt > now || now - value.startedAt > GOOGLE_AUTH_MAX_AGE) return null;
    return { destination: safeAuthDestination(value.destination), startedAt: value.startedAt };
  } catch { return null; }
};
export const readGoogleAuthContext = () => {
  if (typeof window === "undefined") return null;
  try { return parseGoogleAuthContext(window.sessionStorage.getItem(GOOGLE_AUTH_CONTEXT_KEY)); } catch { return null; }
};
export const clearGoogleAuthContext = () => {
  if (typeof window === "undefined") return;
  try { window.sessionStorage.removeItem(GOOGLE_AUTH_CONTEXT_KEY); } catch { /* Storage may be unavailable. */ }
  window.dispatchEvent(new Event(AUTH_COOKIE_CHANGE_EVENT));
};
export const getBrowserAuthMode = (): BrowserAuthMode => {
  if (typeof window === "undefined") return "";
  if (readGoogleAuthContext()) return "google";
  if (readCookie(SESSION_AUTH_COOKIE) === "session") return "session";
  return readCookie("emilistToken") ? "bearer" : "";
};
export const usesCookieSession = (mode: BrowserAuthMode) => mode === "google" || mode === "session";
