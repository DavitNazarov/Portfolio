import { useMemo } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useFetchData } from "@/hooks/useFetchData";
import { API_ROUTES } from "@/constants/routes";
import { sortByLatestPeriod } from "@/lib/utils";
import ExperienceList from "@/features/experience/components/ExperienceList";
import { EXPERIENCE_TINT } from "@/features/experience/constants/experience";

export default function Experience() {
  const { data: experiences, loading } = useFetchData(API_ROUTES.EXPERIENCE.PUBLIC, "experiences");
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

      <ExperienceList experiences={sorted} loading={loading} />
    </div>
  );
}
