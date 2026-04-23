/**
 * Client-side notification pings.
 *
 * Fires a single visit email per browser session and a single chat-open email
 * per browser session. Chat questions can optionally trigger a follow-up
 * notification for each new user message (debounced on the backend).
 *
 * These pings are fire-and-forget — failures never surface to the UI.
 */

const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
const VISIT_FLAG = "portfolio:notify:visit";
const CHAT_FLAG = "portfolio:notify:chat";

function buildUrl(path) {
  return API_BASE ? `${API_BASE}${path}` : path;
}

async function post(path, body) {
  try {
    await fetch(buildUrl(path), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body ?? {}),
      keepalive: true,
    });
  } catch {
    /* silent — notifications must never break the UX */
  }
}

function visitorMeta(extra = {}) {
  if (typeof window === "undefined") return extra;
  return {
    path: window.location?.pathname + window.location?.search,
    referrer: document.referrer || undefined,
    locale: navigator.language || undefined,
    ...extra,
  };
}

/** Fire-and-forget "someone opened the site" ping. Guards against duplicates per session. */
export function trackVisit() {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(VISIT_FLAG)) return;
    sessionStorage.setItem(VISIT_FLAG, "1");
  } catch {
    /* private mode — still fine to send once */
  }
  post("/api/notify/visit", visitorMeta());
}

/**
 * Fire-and-forget "someone started chatting" ping.
 * Sends once per session on open, then optionally once more with the first message.
 */
export function trackChatOpen() {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(CHAT_FLAG)) return;
    sessionStorage.setItem(CHAT_FLAG, "1");
  } catch {
    /* ignore */
  }
  post("/api/notify/chat", visitorMeta());
}

/**
 * Send a chat question notification (one per actual user message).
 * Backend rate-limits per IP to prevent spam.
 */
export function trackChatMessage(message) {
  if (typeof window === "undefined" || !message) return;
  post("/api/notify/chat", visitorMeta({ message }));
}
