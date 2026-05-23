import { useEffect, useMemo, useState } from "react";
import { API_ROUTES } from "@/constants/routes";
import { apiPublic } from "@/lib/api";
import { isCurrentPeriod, sortByLatestPeriod } from "@/lib/utils";
import { groupTechnologies } from "@/features/home/utils/groupTechnologies";

export function useHomeData() {
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadHomeData() {
      try {
        const [expRes, eduRes, projRes, awardsRes] = await Promise.all([
          apiPublic(API_ROUTES.EXPERIENCE.PUBLIC),
          apiPublic(API_ROUTES.EDUCATION.PUBLIC),
          apiPublic(API_ROUTES.PROJECTS.PUBLIC),
          apiPublic(API_ROUTES.AWARDS.PUBLIC),
        ]);

        if (cancelled) return;
        setExperiences(expRes.experiences ?? []);
        setEducation(eduRes.education ?? []);
        setProjects(projRes.projects ?? []);
        setAwards(awardsRes.awards ?? []);
      } catch {
        if (cancelled) return;
        setExperiences([]);
        setEducation([]);
        setProjects([]);
        setAwards([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadHomeData();
    return () => {
      cancelled = true;
    };
  }, []);

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
    focusTech,
    highlightedWork,
    loading,
    projectCount: projects.length,
    techGroups,
    workIsCurrent,
  };
}
