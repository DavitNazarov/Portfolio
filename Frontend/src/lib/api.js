const BASE = import.meta.env.VITE_API_URL || "";

function getToken() {
  return localStorage.getItem("token");
}

async function fetchApi(path, options = {}, useAuth = true, retried = false) {
  const token = useAuth ? getToken() : null;
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    // Retry once on 503 (DB not ready, e.g. after cold start)
    if (res.status === 503 && !retried && options.method === "GET") {
      await new Promise((r) => setTimeout(r, 2000));
      return fetchApi(path, options, useAuth, true);
    }
    if (res.status === 401 && useAuth) {
      localStorage.removeItem("token");
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }
    const msg = data.message || data.detail || "Request failed";
    throw new Error(msg);
  }
  return data;
}

export async function api(path, options = {}) {
  return fetchApi(path, options, true);
}

/** Public fetch (no auth) for portfolio pages */
export async function apiPublic(path) {
  return fetchApi(path, { method: "GET" }, false);
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function clearToken() {
  localStorage.removeItem("token");
}

export function isLoggedIn() {
  return !!getToken();
}
