import { useMemo } from "react";
import { motion } from "framer-motion";
import { useFetchData } from "@/hooks/useFetchData";
import { API_ROUTES } from "@/constants/routes";
import { extractYear, sortByYear } from "@/lib/utils";
import { ANIMATION } from "@/constants/ui";

const Education = () => {
  const { data: education, loading } = useFetchData(API_ROUTES.EDUCATION.PUBLIC, "education");
  const sortedEducation = useMemo(() => sortByYear(education), [education]);
  const currentEducation = useMemo(
    () => sortedEducation.find((edu) => edu.present) ?? null,
    [sortedEducation]
  );

  if (loading) {
    return (
      <div className="space-y-12 sm:space-y-16">
        <h2 className="text-3xl sm:text-4xl font-light">Education</h2>
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 sm:space-y-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl font-light hover:scale-105 transition-transform duration-300 inline-block">
          Education
        </h2>
        {currentEducation && (
          <div className="text-sm text-muted-foreground font-mono hover:text-foreground transition-colors duration-300">
            Currently at {currentEducation.institution}
          </div>
        )}
      </div>

      <div className="space-y-8 sm:space-y-12">
        {sortedEducation.length === 0 ? (
          <p className="text-muted-foreground text-sm">No education entries yet.</p>
        ) : (
          sortedEducation.map((edu, index) => (
            <EducationCard key={edu._id || `${edu.institution}-${edu.degree}`} education={edu} index={index} />
          ))
        )}
      </div>
    </div>
  );
};

function EducationCard({ education, index }) {
  const year = extractYear(education.period) ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border hover:bg-muted/5 rounded-lg px-4 -mx-4 transition-all duration-500 cursor-pointer"
    >
      <div className="lg:col-span-2">
        <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground group-hover:scale-110 transition-all duration-500 inline-block">
          {year}
        </div>
      </div>

      <div className="lg:col-span-10 space-y-3">
        <div>
          <h3 className="text-lg sm:text-xl font-medium group-hover:translate-x-2 transition-transform duration-300">
            {education.degree}
          </h3>
          <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
            {education.institution}
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed max-w-lg group-hover:text-foreground/80 transition-colors duration-300">
          {education.description}
        </p>
      </div>
    </motion.div>
  );
}

export default Education;
