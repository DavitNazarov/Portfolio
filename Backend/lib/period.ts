export function periodIsCurrent(period: unknown) {
  return /\b(present|current|now|ongoing)\b/i.test(String(period ?? ""));
}

export function latestPeriodYear(period: unknown) {
  const matches = String(period ?? "").match(/\d{4}/g);
  if (!matches?.length) return 0;
  return Number(matches[matches.length - 1]) || 0;
}

export function sortByPeriodStatus<T extends { period?: unknown }>(items: T[]) {
  return [...items].sort((a, b) => {
    const aCurrent = periodIsCurrent(a.period);
    const bCurrent = periodIsCurrent(b.period);
    if (aCurrent !== bCurrent) return aCurrent ? -1 : 1;
    return latestPeriodYear(b.period) - latestPeriodYear(a.period);
  });
}
