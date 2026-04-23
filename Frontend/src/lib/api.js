/**
 * API client for the portfolio backend.
 * On Render, frontend and backend share the same domain — leave VITE_API_URL unset.
 * In local dev, leave unset to use Vite proxy (proxied to localhost:3000).
 */

const TOKEN_KEY = "token";
const ROLE_KEY = "user_role";
const RETRY_DELAY_MS = 2000;

const getBaseUrl = () => (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function decodeJwtPayload(token) {
  if (!token) return null;
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized + "=".repeat((4 - (normalized.length % 4 || 4)) % 4);
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

function normalizeRole(role) {
  if (typeof role !== "string") return null;
  const normalized = role.trim().toLowerCase();
  return normalized === "admin" || normalized === "viewer" ? normalized : null;
}

function buildUrl(path) {
  const base = getBaseUrl();
  return base ? `${base}${path}` : path;
}

function handleUnauthorized() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  window.dispatchEvent(new CustomEvent("auth:unauthorized"));
}

async function request(path, options = {}, useAuth = true, retried = false) {
  const url = buildUrl(path);
  const token = useAuth ? getToken() : null;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 503 && !retried && options.method === "GET") {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      return request(path, options, useAuth, true);
    }
    if (response.status === 401 && useAuth) {
      handleUnauthorized();
    }
    const message = data.message ?? data.detail ?? "Request failed";
    throw new Error(message);
  }

  return data;
}

/** Authenticated API request (includes Bearer token). */
export async function api(path, options = {}) {
  return request(path, options, true);
}

/** Public API request (no auth). Use for portfolio pages. */
export async function apiPublic(path) {
  return request(path, { method: "GET" }, false);
}

export function setToken(token, role) {
  localStorage.setItem(TOKEN_KEY, token);
  const resolvedRole = normalizeRole(role) ?? normalizeRole(decodeJwtPayload(token)?.role);
  if (resolvedRole) {
    localStorage.setItem(ROLE_KEY, resolvedRole);
  } else {
    localStorage.removeItem(ROLE_KEY);
  }
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
}

export function isLoggedIn() {
  return !!getToken();
}

export function getRole() {
  const stored = normalizeRole(localStorage.getItem(ROLE_KEY));
  if (stored) return stored;
  return normalizeRole(decodeJwtPayload(getToken())?.role);
}
