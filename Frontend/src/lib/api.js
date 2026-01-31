const BASE = import.meta.env.VITE_API_URL || "";

function getToken() {
  return localStorage.getItem("token");
}

async function fetchApi(path, options = {}, useAuth = true) {
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
    const msg = data.detail || data.message || "Request failed";
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
