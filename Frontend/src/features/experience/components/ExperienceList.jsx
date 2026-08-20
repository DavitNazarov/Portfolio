import ExperienceCard from "@/features/experience/components/ExperienceCard";
import ExperienceSkeletonCard from "@/features/experience/components/ExperienceSkeletonCard";
import SectionState from "@/components/ui/SectionState";
import { EXPERIENCE_SKELETON_COUNT, EXPERIENCE_TINT } from "@/features/experience/constants/experience";

export default function ExperienceList({ experiences, loading, error, onRetry }) {
  if (!loading && error) {
    return (
      <SectionState
        variant="error"
        tint={EXPERIENCE_TINT}
        label="Couldn't load work history"
        message="The roles are stored server-side and the request didn't come back. Everything else on this page still works."
        onRetry={onRetry}
      />
    );
  }

  if (!loading && experiences.length === 0) {
    return (
      <SectionState
        tint={EXPERIENCE_TINT}
        label="No roles listed yet"
        message="Work history is being updated. The rest of the site is unaffected."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3.5" aria-busy={loading}>
      {loading
        ? Array.from({ length: EXPERIENCE_SKELETON_COUNT }).map((_, index) => (
            <ExperienceSkeletonCard key={index} />
          ))
        : experiences.map((experience, index) => (
            <ExperienceCard
              key={experience._id || `${experience.company}-${index}`}
              exp={experience}
              index={index}
              total={experiences.length}
            />
          ))}
    </div>
  );
}
