import { useMemo } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useFetchData } from "@/hooks/useFetchData";
import { API_ROUTES } from "@/constants/routes";
import { sortByLatestPeriod } from "@/lib/utils";
import EducationList from "@/features/education/components/EducationList";
import { EDUCATION_TINT } from "@/features/education/constants/education";

export default function Education() {
  const { data: education, loading } = useFetchData(API_ROUTES.EDUCATION.PUBLIC, "education");
  const sorted = useMemo(() => sortByLatestPeriod(education), [education]);

  return (
    <div className="w-full max-w-4xl">
      <SectionHeader
        number="03"
        eyebrow="Study"
        title="Foundations that"
        accent="sharpened"
        after=" the craft."
        description="Academic and self-directed study — the ground that every product decision quietly sits on."
        tint={EDUCATION_TINT}
      />

      <EducationList education={sorted} loading={loading} />
    </div>
  );
}
