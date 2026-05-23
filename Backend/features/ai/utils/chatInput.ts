import type { ChatHistoryItem } from "../types/chat.js";

const MAX_MESSAGE_LENGTH = 800;
const MAX_HISTORY_ITEMS = 8;

export function clipMessage(value: unknown, max = MAX_MESSAGE_LENGTH) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}

export function normalizeHistory(value: unknown): ChatHistoryItem[] {
  if (!Array.isArray(value)) return [];

  return value
    .slice(-MAX_HISTORY_ITEMS)
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const role = (item as { role?: unknown }).role;
      const content = clipMessage((item as { content?: unknown }).content);
      if ((role !== "user" && role !== "assistant") || !content) return null;

      return { role, content };
    })
    .filter((item): item is ChatHistoryItem => Boolean(item));
}
