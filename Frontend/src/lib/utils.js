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

/** Returns true when a period string marks an item as active, e.g. "2025 — Present". */
export function isCurrentPeriod(period) {
  return /\b(present|current|now|ongoing)\b/i.test(String(period || ""));
}

/** Extract the latest 4-digit year from a period string. Useful for ended roles. */
export function extractLatestYear(period) {
  const matches = String(period || "").match(/\d{4}/g);
  if (!matches?.length) return null;
  return parseInt(matches[matches.length - 1], 10);
}

/** Sort array by year (descending). Uses extractYear for period strings or direct year for numbers. */
export function sortByYear(items, getYear = (item) => extractYear(item?.period) ?? item?.year ?? 0) {
  return [...items].sort((a, b) => (getYear(b) ?? 0) - (getYear(a) ?? 0));
}

/** Sort by active periods first, then by latest visible year descending. */
export function sortByLatestPeriod(items) {
  return [...items].sort((a, b) => {
    const aCurrent = isCurrentPeriod(a?.period);
    const bCurrent = isCurrentPeriod(b?.period);
    if (aCurrent !== bCurrent) return aCurrent ? -1 : 1;
    const aYear = extractLatestYear(a?.period) ?? a?.year ?? 0;
    const bYear = extractLatestYear(b?.period) ?? b?.year ?? 0;
    return bYear - aYear;
  });
}

/** Parse comma-separated string into trimmed array of non-empty strings. */
export function parseCommaList(str) {
  return (str || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
