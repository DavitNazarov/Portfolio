export const AWARD_TINT = "245, 197, 66";

/**
 * Medal styling. `podium` marks the three that count toward the medal tally —
 * everything else (seminars, certificates, appreciation letters) is a real
 * record but is summarised separately so it can't inflate the podium numbers.
 */
export const MEDAL_META = {
  Gold: { tint: "245, 197, 66", label: "Gold", podium: true },
  Silver: { tint: "186, 197, 212", label: "Silver", podium: true },
  Bronze: { tint: "214, 140, 68", label: "Bronze", podium: true },
  Recognition: { tint: "167, 139, 250", label: "Recognition" },
  Certificate: { tint: "125, 211, 252", label: "Certificate" },
  Participation: { tint: "148, 163, 184", label: "Participation" },
};

export const PODIUM_ORDER = ["Gold", "Silver", "Bronze"];

export const DEFAULT_MEDAL_META = { tint: "148, 163, 184", podium: false };

export function medalMeta(medal) {
  return MEDAL_META[medal] ?? { ...DEFAULT_MEDAL_META, label: medal };
}
