import React, { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiPublic } from "@/lib/api";
import { API_ROUTES } from "@/constants/routes";

const getYear = (period) => {
  if (!period) return 0;
  const m = String(period).match(/(\d{4})/);
  return m ? parseInt(m[1], 10) : 0;
};

const Home = () => {
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiPublic(API_ROUTES.EXPERIENCE.PUBLIC).then((d) => d.experiences || []),
      apiPublic(API_ROUTES.EDUCATION.PUBLIC).then((d) => d.education || []),
      apiPublic(API_ROUTES.PROJECTS.PUBLIC).then((d) => d.projects || []),
    ])
      .then(([exp, edu, proj]) => {
        setExperiences(exp);
        setEducation(edu);
        setProjects(proj);
      })
      .catch(() => {
        setExperiences([]);
        setEducation([]);
        setProjects([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const sortedExperiences = useMemo(
    () =>
      [...experiences].sort(
        (a, b) => getYear(b.period) - getYear(a.period)
      ),
    [experiences]
  );

  const currentWork = useMemo(
    () => sortedExperiences[0],
    [sortedExperiences]
  );

  const sortedEducation = useMemo(
    () =>
      [...education].sort(
        (a, b) => getYear(b.period) - getYear(a.period)
      ),
    [education]
  );

  const currentEdu = useMemo(
    () =>
      sortedEducation.find((e) => e.present) || sortedEducation[0],
    [sortedEducation]
  );

  const focusTech = useMemo(() => {
    const all = (projects || []).flatMap((p) =>
      Array.isArray(p.technologies) ? p.technologies : []
    );
    const trimmed = all.map((t) => (typeof t === "string" ? t.trim() : String(t))).filter(Boolean);
    return [...new Set(trimmed)];
  }, [projects]);

  const isLoading = loading;
  const hasWork = !!currentWork;
  const hasEdu = !!currentEdu;
  const hasFocus = focusTech.length > 0;

  const sectionMotion = (delay = 0) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay },
  });

  return (
    <div className="w-full max-w-4xl">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Name + intro */}
        <motion.div
          className="lg:col-span-7 space-y-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
              Portfolio
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-foreground">
              Davit Nazarov
            </h1>
            {hasWork && (
              <p className="text-lg sm:text-xl text-muted-foreground font-light">
                {currentWork.role}
                <span className="text-foreground/70"> at {currentWork.company}</span>
              </p>
            )}
          </div>

          {isLoading && !hasWork && (
            <div className="h-4 w-48 rounded bg-muted/50 animate-pulse" />
          )}
        </motion.div>

        {/* Right: Currently, Education, Focus */}
        <div className="lg:col-span-5 flex flex-col gap-10 lg:gap-12 lg:pt-2">
          {/* Currently */}
          <motion.section className="space-y-3" {...sectionMotion(0.1)}>
            <h2 className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
              Currently
            </h2>
            {isLoading ? (
              <div className="space-y-2">
                <div className="h-5 w-32 rounded bg-muted/50 animate-pulse" />
                <div className="h-4 w-24 rounded bg-muted/40 animate-pulse" />
              </div>
            ) : hasWork ? (
              <div className="space-y-1">
                <p className="text-foreground font-medium">{currentWork.role}</p>
                <p className="text-muted-foreground text-sm">{currentWork.company}</p>
                <p className="text-muted-foreground/80 text-xs font-mono">{currentWork.period}</p>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">—</p>
            )}
          </motion.section>

          {/* Education */}
          <motion.section className="space-y-3" {...sectionMotion(0.2)}>
            <h2 className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
              Education
            </h2>
            {isLoading ? (
              <div className="space-y-2">
                <div className="h-5 w-36 rounded bg-muted/50 animate-pulse" />
                <div className="h-4 w-28 rounded bg-muted/40 animate-pulse" />
              </div>
            ) : hasEdu ? (
              <div className="space-y-1">
                <p className="text-foreground font-medium">{currentEdu.degree}</p>
                <p className="text-muted-foreground text-sm">{currentEdu.institution}</p>
                <p className="text-muted-foreground/80 text-xs font-mono">
                  {currentEdu.period}
                  {currentEdu.present && (
                    <span className="ml-1.5 text-muted-foreground/60">· current</span>
                  )}
                </p>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">—</p>
            )}
          </motion.section>

          {/* Focus (from experience tech) */}
          <motion.section className="space-y-3" {...sectionMotion(0.3)}>
            <h2 className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
              Focus
            </h2>
            {isLoading ? (
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-7 w-16 rounded-full bg-muted/50 animate-pulse" />
                ))}
              </div>
            ) : hasFocus ? (
              <div className="flex flex-wrap gap-2">
                {focusTech.map((name) => (
                  <span
                    key={name}
                    className="px-3 py-1 text-xs rounded-full border border-border bg-background/50 text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 transition-colors"
                  >
                    {name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">—</p>
            )}
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Home;
