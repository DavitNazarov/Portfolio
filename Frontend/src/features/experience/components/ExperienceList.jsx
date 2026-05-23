import ExperienceCard from "@/features/experience/components/ExperienceCard";
import ExperienceSkeletonCard from "@/features/experience/components/ExperienceSkeletonCard";
import { EXPERIENCE_SKELETON_COUNT } from "@/features/experience/constants/experience";

export default function ExperienceList({ experiences, loading }) {
  return (
    <div className="flex flex-col gap-3.5">
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
