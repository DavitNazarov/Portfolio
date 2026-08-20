import ProjectCard from "@/features/projects/components/ProjectCard";
import ProjectSkeletonCard from "@/features/projects/components/ProjectSkeletonCard";
import SectionState from "@/components/ui/SectionState";
import { PROJECT_SKELETON_COUNT, PROJECTS_TINT } from "@/features/projects/constants/projects";

export default function ProjectList({ loading, projects, error, onRetry }) {
  if (!loading && error) {
    return (
      <SectionState
        variant="error"
        tint={PROJECTS_TINT}
        label="Couldn't load projects"
        message="The projects are stored server-side and the request didn't come back. Everything else on this page still works."
        onRetry={onRetry}
      />
    );
  }

  if (!loading && projects.length === 0) {
    return (
      <SectionState
        tint={PROJECTS_TINT}
        label="No projects listed yet"
        message="Project records are being updated. The rest of the site is unaffected."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3.5" aria-busy={loading}>
      {loading
        ? Array.from({ length: PROJECT_SKELETON_COUNT }).map((_, index) => (
            <ProjectSkeletonCard key={index} />
          ))
        : projects.map((project, index) => (
            <ProjectCard
              key={project._id || `${project.name}-${index}`}
              project={project}
              index={index}
              total={projects.length}
            />
          ))}
    </div>
  );
}
