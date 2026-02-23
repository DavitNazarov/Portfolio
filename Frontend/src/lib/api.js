/**
 * API client for the portfolio backend.
 * Set VITE_API_URL in Vercel to your Railway public URL (e.g. https://xxx.up.railway.app).
 * In local dev, leave unset to use Vite proxy.
 */

const TOKEN_KEY = "token";
const RETRY_DELAY_MS = 2000;

const getBaseUrl = () => (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function buildUrl(path) {
  const base = getBaseUrl();
  return base ? `${base}${path}` : path;
}

function handleUnauthorized() {
  localStorage.removeItem(TOKEN_KEY);
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

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isLoggedIn() {
  return !!getToken();
}
