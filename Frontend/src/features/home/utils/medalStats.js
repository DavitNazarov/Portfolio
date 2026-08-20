import { extractLatestYear } from "@/lib/utils";
import { medalMeta, PODIUM_ORDER } from "@/features/home/constants/awards";

/**
 * Tallies medals across every award entry.
 *
 * Returns podium counts in Gold/Silver/Bronze order (always all three, so the
 * table keeps its shape when a tier is empty), the non-podium honours grouped
 * separately, and the span of years the record covers.
 */
export function medalStats(awards = []) {
  const counts = new Map();

  for (const award of awards) {
    const medals = Array.isArray(award?.medals) ? award.medals : [];
    for (const medal of medals) {
      if (typeof medal !== "string" || !medal.trim()) continue;
      const key = medal.trim();
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }

  const podium = PODIUM_ORDER.map((medal) => ({
    medal,
    count: counts.get(medal) ?? 0,
    ...medalMeta(medal),
  }));

  const others = [...counts.entries()]
    .filter(([medal]) => !PODIUM_ORDER.includes(medal))
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([medal, count]) => ({ medal, count, ...medalMeta(medal) }));

  const podiumTotal = podium.reduce((sum, entry) => sum + entry.count, 0);
  const otherTotal = others.reduce((sum, entry) => sum + entry.count, 0);

  const years = awards
    .map((award) => extractLatestYear(award?.period))
    .filter((year) => Number.isFinite(year));

  return {
    podium,
    others,
    podiumTotal,
    otherTotal,
    entries: awards.length,
    firstYear: years.length ? Math.min(...years) : null,
    lastYear: years.length ? Math.max(...years) : null,
  };
}
