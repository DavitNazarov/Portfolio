import { useMemo } from "react";
import { usePortfolio } from "@/context/portfolioStore";
import { isCurrentPeriod, sortByLatestPeriod } from "@/lib/utils";
import { groupTechnologies } from "@/features/home/utils/groupTechnologies";

export function useHomeData() {
  const { experiences, education, projects, awards, loading, error } = usePortfolio();

  const sortedWork = useMemo(() => sortByLatestPeriod(experiences), [experiences]);
  const highlightedWork = sortedWork[0];
  const workIsCurrent = Boolean(highlightedWork && isCurrentPeriod(highlightedWork.period));

  const currentEdu = useMemo(() => {
    const sortedEducation = sortByLatestPeriod(education);
    return sortedEducation.find((entry) => isCurrentPeriod(entry.period)) ?? sortedEducation[0];
  }, [education]);
  const eduIsCurrent = Boolean(currentEdu && isCurrentPeriod(currentEdu.period));

  const focusTech = useMemo(() => {
    const technologies = projects.flatMap((project) =>
      Array.isArray(project.technologies) ? project.technologies : []
    );

    return [
      ...new Set(
        technologies
          .map((technology) => (typeof technology === "string" ? technology.trim() : String(technology)))
          .filter(Boolean)
      ),
    ];
  }, [projects]);

  const techGroups = useMemo(() => groupTechnologies(focusTech), [focusTech]);

  return {
    awards,
    currentEdu,
    eduIsCurrent,
    error,
    focusTech,
    highlightedWork,
    loading,
    projectCount: projects.length,
    techGroups,
    workIsCurrent,
  };
}
