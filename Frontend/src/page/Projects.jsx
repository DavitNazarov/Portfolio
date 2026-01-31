import React, { useEffect, useState } from "react";
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

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiPublic(API_ROUTES.PROJECTS.PUBLIC)
      .then((data) => setProjects(data.projects || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const years = projects.map((p) => p.year).filter(Boolean);
  const startYear = years.length ? Math.min(...years) : "";
  const endYear = years.length ? Math.max(...years) : "";
  const hasYearRange = startYear || endYear;

  if (loading) {
    return (
      <div className="space-y-12 sm:space-y-16">
        <h2 className="text-3xl sm:text-4xl font-light"> Projects </h2>
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
          Projects
        </motion.h2>
        {hasYearRange && (
          <motion.div
            variants={item}
            className="text-sm text-muted-foreground font-mono hover:text-foreground transition-colors duration-300"
          >
            {startYear} — {endYear}
          </motion.div>
        )}
      </div>

      <div className="space-y-8 sm:space-y-12">
        {projects.length === 0 ? (
          <p className="text-muted-foreground text-sm">No projects yet.</p>
        ) : (
          projects.map((project) => {
            const year = project.year;
            const github = project.githubLink || project.github;
            const live = project.liveLink || project.live;
            const tech = Array.isArray(project.technologies) ? project.technologies : [];
            return (
              <motion.div
                key={
                  project._id || project.name || project.githubLink || "project"
                }
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
                      {project.name}
                    </h3>
                  </div>
                  {project.description && (
                    <p className="text-muted-foreground leading-relaxed max-w-lg group-hover:text-foreground/80 transition-colors duration-300">
                      {project.description}
                    </p>
                  )}
                </div>

                <div className="lg:col-span-4 flex flex-col gap-2 lg:items-end items-start mt-2 lg:mt-0">
                  {tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-end">
                      {tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs text-muted-foreground rounded-md group-hover:text-foreground transition-colors duration-300 whitespace-nowrap"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {github && (
                      <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 text-xs text-muted-foreground rounded-md hover:text-foreground transition-colors duration-300 whitespace-nowrap"
                      >
                        GitHub
                      </a>
                    )}
                    {live && (
                      <a
                        href={live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 text-xs text-muted-foreground rounded-md hover:text-foreground transition-colors duration-300 whitespace-nowrap"
                      >
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};

export default Projects;
