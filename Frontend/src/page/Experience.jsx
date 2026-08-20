import { useMemo } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { usePortfolio } from "@/context/portfolioStore";
import { sortByLatestPeriod } from "@/lib/utils";
import ExperienceList from "@/features/experience/components/ExperienceList";
import { EXPERIENCE_TINT } from "@/features/experience/constants/experience";

export default function Experience() {
  const { experiences, loading, error, refetch } = usePortfolio();
  const sorted = useMemo(() => sortByLatestPeriod(experiences), [experiences]);

  return (
    <div className="w-full max-w-4xl">
      <SectionHeader
        number="02"
        eyebrow="Work"
        title="Places I've"
        accent="shipped"
        after=" real products."
        description="A running log of the teams I've built with — the role I played, the surface I owned, and the tools I used to get there."
        tint={EXPERIENCE_TINT}
      />

      <ExperienceList experiences={sorted} loading={loading} error={error} onRetry={refetch} />
    </div>
  );
}
