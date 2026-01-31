import React from "react";
import { motion } from "framer-motion";

const education = [
  {
    degree: "IT Bachelor",
    institution: "University of SEU",
    period: "2025 — Present",
    description: "Currently pursuing an IT bachelor's degree, focusing on software development and computer science fundamentals.",
  },
];

const Education = () => {
  return (
    <div className="space-y-12 sm:space-y-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl font-light hover:scale-105 transition-transform duration-300 inline-block">
          Education
        </h2>
        <div className="text-sm text-muted-foreground font-mono hover:text-foreground transition-colors duration-300">
          2025 — Present
        </div>
      </div>

      <div className="space-y-8 sm:space-y-12">
        {education.map((edu, index) => {
          const year = 2025;
          return (
            <motion.div
              key={edu.institution}
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
        })}
      </div>
    </div>
  );
};

export default Education;
