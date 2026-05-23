import ProjectCard from "@/features/projects/components/ProjectCard";
import ProjectSkeletonCard from "@/features/projects/components/ProjectSkeletonCard";
import { PROJECT_SKELETON_COUNT } from "@/features/projects/constants/projects";

export default function ProjectList({ loading, projects }) {
  return (
    <div className="flex flex-col gap-3.5">
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
