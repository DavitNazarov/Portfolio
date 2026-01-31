import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { apiPublic } from "@/lib/api";
import { API_ROUTES } from "@/constants/routes";

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
  }),
};

const item = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const getYear = (period) => {
  if (!period) return "";
  const match = String(period).match(/(\d{4})/);
  return match ? match[1] : "";
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiPublic(API_ROUTES.EXPERIENCE.PUBLIC)
      .then((data) => setExperiences(data.experiences || []))
      .catch(() => setExperiences([]))
      .finally(() => setLoading(false));
  }, []);

  const sortedExperiences = useMemo(() => {
    return [...experiences].sort((a, b) => {
      const yearA = parseInt(getYear(a.period), 10) || 0;
      const yearB = parseInt(getYear(b.period), 10) || 0;
      return yearB - yearA;
    });
  }, [experiences]);

  const years = sortedExperiences
    .map((exp) => parseInt(getYear(exp.period), 10))
    .filter(Boolean);
  const startYear = years.length ? Math.min(...years) : "";
  const endYear = years.length ? Math.max(...years) : "";

  if (loading) {
    return (
      <div className="space-y-12 sm:space-y-16">
        <h2 className="text-3xl sm:text-4xl font-light">Work Experience</h2>
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-12 sm:space-y-16"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <motion.h2
          variants={item}
          className="text-3xl sm:text-4xl font-light hover:scale-105 transition-transform duration-300 inline-block"
        >
          Selected Work
        </motion.h2>
        {(startYear || endYear) && (
          <motion.div
            variants={item}
            className="text-sm text-muted-foreground font-mono hover:text-foreground transition-colors duration-300"
          >
            {startYear} — {endYear}
          </motion.div>
        )}
      </div>

      <div className="space-y-8 sm:space-y-12">
        {sortedExperiences.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No experience entries yet.
          </p>
        ) : (
          sortedExperiences.map((exp) => {
            const year = getYear(exp.period);
            const tech = Array.isArray(exp.tech) ? exp.tech : [];
            return (
              <motion.div
                key={exp._id || (exp.company || "") + (exp.role || "")}
                variants={item}
                className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border hover:bg-muted/5 rounded-lg px-4 -mx-4 transition-all duration-500 cursor-pointer"
              >
                <div className="lg:col-span-2">
                  <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground group-hover:scale-110 transition-all duration-500 inline-block">
                    {year}
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium group-hover:translate-x-2 transition-transform duration-300">
                      {exp.role}
                    </h3>
                    <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {exp.company}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-muted-foreground leading-relaxed max-w-lg group-hover:text-foreground/80 transition-colors duration-300">
                      {exp.description}
                    </p>
                  )}
                </div>

                <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end items-start mt-2 lg:mt-0">
                  {tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs text-muted-foreground rounded-md group-hover:text-foreground transition-colors duration-300 whitespace-nowrap"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};

export default Experience;
