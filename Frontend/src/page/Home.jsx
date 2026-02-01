import React, { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiPublic } from "@/lib/api";
import { API_ROUTES } from "@/constants/routes";

const getYear = (period) => {
  if (!period) return 0;
  const m = String(period).match(/(\d{4})/);
  return m ? parseInt(m[1], 10) : 0;
};

const spring = { type: "spring", stiffness: 120, damping: 24 };
const staggerFast = { staggerChildren: 0.06, delayChildren: 0.1 };
const staggerSlow = { staggerChildren: 0.1, delayChildren: 0.2 };

const itemUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: spring,
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

  const hasWork = !!currentWork;
  const hasEdu = !!currentEdu;
  const hasFocus = focusTech.length > 0;

  const containerVariants = {
    initial: {},
    animate: { transition: staggerSlow },
  };

  const leftVariants = {
    initial: {},
    animate: { transition: staggerFast },
  };

  const rightVariants = {
    initial: {},
    animate: { transition: staggerFast },
  };

  return (
    <motion.div
      className="w-full max-w-4xl"
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left: Identity & role — primary focus (F-pattern) */}
        <motion.div
          className="lg:col-span-7 space-y-10 lg:space-y-12"
          variants={leftVariants}
        >
            <motion.p
              variants={itemUp}
              className="text-xs font-mono text-muted-foreground tracking-[0.2em] uppercase"
            >
              Portfolio
            </motion.p>
            <motion.h1
              variants={itemUp}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-foreground leading-[1.05]"
            >
              Davit Nazarov
            </motion.h1>
            {hasWork ? (
              <motion.p
                variants={itemUp}
                className="text-lg sm:text-xl text-muted-foreground font-light flex flex-wrap items-baseline gap-x-2 gap-y-1"
              >
                <span>{currentWork.role}</span>
                <span className="text-foreground/50 font-normal" aria-hidden>·</span>
                <span className="text-foreground/90">{currentWork.company}</span>
              </motion.p>
            ) : (
              loading && (
                <motion.div
                  variants={itemUp}
                  className="h-6 w-56 rounded bg-muted/40 animate-pulse"
                />
              )
            )}
          </motion.div>

          {/* Subtle visual anchor — builds trust through structure */}
          <motion.div
            variants={itemUp}
            className="w-12 h-px bg-border"
            aria-hidden
          />

        {/* Right: Credentials — supporting proof (grouped, scannable) */}
        <motion.div
          className="lg:col-span-5 flex flex-col gap-8 lg:gap-10 lg:pt-1"
          variants={rightVariants}
        >
          {/* Currently */}
          <motion.section
            variants={itemUp}
            className="space-y-2 pl-0 lg:pl-5 border-l-0 lg:border-l border-border lg:border-muted-foreground/30"
          >
            <h2 className="text-[11px] font-mono text-muted-foreground tracking-[0.18em] uppercase">
              Currently
            </h2>
            {loading ? (
              <div className="space-y-2">
                <div className="h-5 w-28 rounded bg-muted/40 animate-pulse" />
                <div className="h-4 w-20 rounded bg-muted/30 animate-pulse" />
              </div>
            ) : hasWork ? (
              <div className="space-y-0.5">
                <p className="text-foreground font-medium tracking-tight">{currentWork.role}</p>
                <p className="text-muted-foreground text-sm">{currentWork.company}</p>
                <p className="text-muted-foreground/80 text-xs font-mono mt-1">{currentWork.period}</p>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">—</p>
            )}
          </motion.section>

          {/* Education */}
          <motion.section
            variants={itemUp}
            className="space-y-2 pl-0 lg:pl-5 border-l-0 lg:border-l border-border lg:border-muted-foreground/30"
          >
            <h2 className="text-[11px] font-mono text-muted-foreground tracking-[0.18em] uppercase">
              Education
            </h2>
            {loading ? (
              <div className="space-y-2">
                <div className="h-5 w-32 rounded bg-muted/40 animate-pulse" />
                <div className="h-4 w-24 rounded bg-muted/30 animate-pulse" />
              </div>
            ) : hasEdu ? (
              <div className="space-y-0.5">
                <p className="text-foreground font-medium tracking-tight">{currentEdu.degree}</p>
                <p className="text-muted-foreground text-sm">{currentEdu.institution}</p>
                <p className="text-muted-foreground/80 text-xs font-mono mt-1">
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

          {/* Focus — skills as social proof */}
          <motion.section
            variants={itemUp}
            className="space-y-3 pl-0 lg:pl-5 border-l-0 lg:border-l border-border lg:border-muted-foreground/30"
          >
            <h2 className="text-[11px] font-mono text-muted-foreground tracking-[0.18em] uppercase">
              Focus
            </h2>
            {loading ? (
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-8 w-14 rounded-full bg-muted/40 animate-pulse" />
                ))}
              </div>
            ) : hasFocus ? (
              <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                {focusTech.map((name) => (
                  <li key={name}>
                    <span
                      className="inline-block px-3 py-1.5 text-xs rounded-full border border-border bg-muted/30 text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 hover:bg-muted/50 transition-colors duration-200 cursor-default"
                    >
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">—</p>
            )}
          </motion.section>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
