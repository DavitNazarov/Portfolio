import EducationCard from "@/features/education/components/EducationCard";
import EducationSkeletonCard from "@/features/education/components/EducationSkeletonCard";
import SectionState from "@/components/ui/SectionState";
import { EDUCATION_SKELETON_COUNT, EDUCATION_TINT } from "@/features/education/constants/education";

export default function EducationList({ education, loading, error, onRetry }) {
  if (!loading && error) {
    return (
      <SectionState
        variant="error"
        tint={EDUCATION_TINT}
        label="Couldn't load education"
        message="The records are stored server-side and the request didn't come back. Everything else on this page still works."
        onRetry={onRetry}
      />
    );
  }

  if (!loading && education.length === 0) {
    return (
      <SectionState
        tint={EDUCATION_TINT}
        label="No study listed yet"
        message="Education records are being updated. The rest of the site is unaffected."
      />
    );
  }

  return (
    <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3" aria-busy={loading}>
      {loading
        ? Array.from({ length: EDUCATION_SKELETON_COUNT }).map((_, index) => (
            <EducationSkeletonCard key={index} />
          ))
        : education.map((entry, index) => (
            <EducationCard
              key={entry._id || `${entry.institution}-${index}`}
              edu={entry}
              index={index}
            />
          ))}
    </div>
  );
}
