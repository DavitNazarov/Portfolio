import { Boxes } from "lucide-react";
import { TECH_GROUPS } from "@/features/home/constants/homeIntro";

export function groupTechnologies(tech) {
  const used = new Set();
  const groups = TECH_GROUPS.map((group) => {
    const items = tech.filter((item) => {
      const normalized = item.toLowerCase();
      return group.match.some((keyword) => normalized.includes(keyword));
    });

    items.forEach((item) => used.add(item));
    return { ...group, items };
  }).filter((group) => group.items.length > 0);

  const uncategorized = tech.filter((item) => !used.has(item));
  if (uncategorized.length > 0) {
    groups.push({
      key: "other",
      title: "Support Tools",
      description: "The extra ingredients that round out delivery and workflow.",
      icon: Boxes,
      tint: "148, 163, 184",
      featured: false,
      items: uncategorized,
    });
  }

  return groups;
}
