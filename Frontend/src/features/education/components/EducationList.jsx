import EducationCard from "@/features/education/components/EducationCard";
import EducationSkeletonCard from "@/features/education/components/EducationSkeletonCard";
import { EDUCATION_SKELETON_COUNT } from "@/features/education/constants/education";

export default function EducationList({ education, loading }) {
  return (
    <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
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
