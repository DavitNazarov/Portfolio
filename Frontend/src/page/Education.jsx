import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { apiPublic } from "@/lib/api";
import { API_ROUTES } from "@/constants/routes";

const getYear = (period) => {
  if (!period) return "";
  const match = String(period).match(/(\d{4})/);
  return match ? match[1] : "";
};

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiPublic(API_ROUTES.EDUCATION.PUBLIC)
      .then((data) => setEducation(data.education || []))
      .catch(() => setEducation([]))
      .finally(() => setLoading(false));
  }, []);

  const sortedEducation = useMemo(() => {
    return [...education].sort((a, b) => {
      const yearA = parseInt(getYear(a.period), 10) || 0;
      const yearB = parseInt(getYear(b.period), 10) || 0;
      return yearB - yearA;
    });
  }, [education]);

  const currentEducation = useMemo(
    () => sortedEducation.find((edu) => edu.present) || null,
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
          <p className="text-muted-foreground text-sm">
            No education entries yet.
          </p>
        ) : (
          sortedEducation.map((edu, index) => {
            const year = getYear(edu.period);
            return (
              <motion.div
                key={edu._id || edu.institution + edu.degree}
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
                      {edu.degree}
                    </h3>
                    <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {edu.institution}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-lg group-hover:text-foreground/80 transition-colors duration-300">
                    {edu.description}
                  </p>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Education;
