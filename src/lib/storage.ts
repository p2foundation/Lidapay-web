const KEY_ACCESS = "lidapay_access_token";
const KEY_REFRESH = "lidapay_refresh_token";
const KEY_USER = "lidapay_user";
const KEY_LOGIN_TIME = "lidapay_login_time";

export type StoredUser = {
  id: string;
  username?: string | null;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  role?: string | null;
};

export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(KEY_ACCESS);
}

export function setAccessToken(token: string) {
  localStorage.setItem(KEY_ACCESS, token);
}

export function getRefreshToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(KEY_REFRESH);
}

export function setRefreshToken(token: string) {
  localStorage.setItem(KEY_REFRESH, token);
}

export function getStoredUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY_USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}

export function setStoredUser(user: StoredUser) {
  localStorage.setItem(KEY_USER, JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem(KEY_ACCESS);
  localStorage.removeItem(KEY_REFRESH);
  localStorage.removeItem(KEY_USER);
  localStorage.removeItem(KEY_LOGIN_TIME);
}

export function setLoginTime() {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_LOGIN_TIME, Date.now().toString());
}

export function getLoginTime(): number | null {
  if (typeof window === "undefined") return null;
  const time = localStorage.getItem(KEY_LOGIN_TIME);
  return time ? parseInt(time, 10) : null;
}

export function isRecentLogin(maxAgeMs: number = 10000): boolean {
  const loginTime = getLoginTime();
  if (!loginTime) return false;
  return (Date.now() - loginTime) < maxAgeMs;
}

// Language preferences
const KEY_LANGUAGE = "lidapay_language";

export type Language = "en" | "fr" | "es" | "pt" | "ar" | "sw";

export function getLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const lang = localStorage.getItem(KEY_LANGUAGE) || "en";
  return (lang === "en" || lang === "fr" || lang === "es" || lang === "pt" || lang === "ar" || lang === "sw") ? lang : "en";
}

export function setLanguage(language: Language) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_LANGUAGE, language);
}

// Currency preferences
const KEY_CURRENCY = "lidapay_currency";

export function getCurrency(): string {
  if (typeof window === "undefined") return "GHS";
  return localStorage.getItem(KEY_CURRENCY) || "GHS";
}

export function setCurrency(currency: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_CURRENCY, currency);
}


