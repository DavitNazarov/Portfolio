import React from "react";
import { motion } from "framer-motion";
import { experiences } from "@/constants/ExperienceData";

const Experience = () => {
  // Sort experiences by date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const getYear = (period) => {
      const match = period.match(/(\d{4})/);
      return match ? parseInt(match[1]) : 0;
    };
    return getYear(b.period) - getYear(a.period);
  });

  const getYear = (period) => {
    const match = period.match(/(\d{4})/);
    return match ? match[1] : '';
  };

  // Calculate date range
  const years = sortedExperiences.map(exp => {
    const match = exp.period.match(/(\d{4})/);
    return match ? parseInt(match[1]) : 0;
  });
  const startYear = Math.min(...years.filter(y => y > 0));
  const endYear = 2025;

  return (
    <div className="space-y-12 sm:space-y-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl font-light hover:scale-105 transition-transform duration-300 inline-block">
          Selected Work
        </h2>
        <div className="text-sm text-muted-foreground font-mono hover:text-foreground transition-colors duration-300">
          {startYear} — {endYear}
        </div>
      </div>

      <div className="space-y-8 sm:space-y-12">
        {sortedExperiences.map((exp, index) => {
          const year = getYear(exp.period);
          
          return (
            <motion.div
              key={exp.company}
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

              <div className="lg:col-span-6 space-y-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-medium group-hover:translate-x-2 transition-transform duration-300">
                    {exp.role}
                  </h3>
                  <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {exp.company}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg group-hover:text-foreground/80 transition-colors duration-300">
                  {exp.description}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end items-start mt-2 lg:mt-0">
                {exp.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs text-muted-foreground rounded-md group-hover:text-foreground transition-colors duration-300 whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;
