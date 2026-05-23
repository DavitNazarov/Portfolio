import { useMemo } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useFetchData } from "@/hooks/useFetchData";
import { API_ROUTES } from "@/constants/routes";
import { sortByYear } from "@/lib/utils";
import ProjectList from "@/features/projects/components/ProjectList";
import { PROJECTS_TINT } from "@/features/projects/constants/projects";

export default function Projects() {
  const { data: projects, loading } = useFetchData(API_ROUTES.PROJECTS.PUBLIC, "projects");
  const sorted = useMemo(() => sortByYear(projects, (p) => p.year), [projects]);

  return (
    <div className="w-full max-w-4xl">
      <SectionHeader
        number="05"
        eyebrow="Projects"
        title="Things I've"
        accent="built"
        after=" and shipped."
        description="A selection of work that went from blank canvas to production — each one a small world with its own constraints and craft."
        tint={PROJECTS_TINT}
      />

      <ProjectList loading={loading} projects={sorted} />
    </div>
  );
}
