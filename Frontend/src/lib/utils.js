import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Extract 4-digit year from period string (e.g. "2020 — 2024" → 2020). Returns null if none. */
export function extractYear(period) {
  const match = String(period || "").match(/(\d{4})/);
  return match ? parseInt(match[1], 10) : null;
}

/** Sort array by year (descending). Uses extractYear for period strings or direct year for numbers. */
export function sortByYear(items, getYear = (item) => extractYear(item?.period) ?? item?.year ?? 0) {
  return [...items].sort((a, b) => (getYear(b) ?? 0) - (getYear(a) ?? 0));
}

/** Parse comma-separated string into trimmed array of non-empty strings. */
export function parseCommaList(str) {
  return (str || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
