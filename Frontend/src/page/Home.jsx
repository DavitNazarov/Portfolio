import { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiPublic } from "@/lib/api";
import { API_ROUTES } from "@/constants/routes";
import { sortByYear } from "@/lib/utils";
import { ANIMATION } from "@/constants/ui";

const Home = () => {
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [expRes, eduRes, projRes] = await Promise.all([
          apiPublic(API_ROUTES.EXPERIENCE.PUBLIC),
          apiPublic(API_ROUTES.EDUCATION.PUBLIC),
          apiPublic(API_ROUTES.PROJECTS.PUBLIC),
        ]);
        setExperiences(expRes.experiences ?? []);
        setEducation(eduRes.education ?? []);
        setProjects(projRes.projects ?? []);
      } catch {
        setExperiences([]);
        setEducation([]);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const sortedExperiences = useMemo(() => sortByYear(experiences), [experiences]);
  const currentWork = useMemo(() => sortedExperiences[0], [sortedExperiences]);

  const sortedEducation = useMemo(() => sortByYear(education), [education]);
  const currentEdu = useMemo(
    () => sortedEducation.find((e) => e.present) ?? sortedEducation[0],
    [sortedEducation]
  );

  const focusTech = useMemo(() => {
    const all = projects.flatMap((p) => (Array.isArray(p.technologies) ? p.technologies : []));
    const trimmed = all.map((t) => (typeof t === "string" ? t.trim() : String(t))).filter(Boolean);
    return [...new Set(trimmed)];
  }, [projects]);

  return (
    <motion.div
      className="w-full max-w-4xl"
      initial="initial"
      animate="animate"
      variants={{ initial: {}, animate: { transition: ANIMATION.staggerSlow } }}
    >
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
        <motion.div
          className="lg:col-span-7 space-y-10 lg:space-y-12"
          variants={{ initial: {}, animate: { transition: ANIMATION.staggerFast } }}
        >
          <motion.p
            variants={ANIMATION.itemUp}
            className="text-xs font-mono text-muted-foreground tracking-[0.2em] uppercase"
          >
            Portfolio
          </motion.p>
          <motion.h1
            variants={ANIMATION.itemUp}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-foreground leading-[1.05]"
          >
            Davit Nazarov
          </motion.h1>
          {currentWork ? (
            <motion.p
              variants={ANIMATION.itemUp}
              className="text-lg sm:text-xl text-muted-foreground font-light flex flex-wrap items-baseline gap-x-2 gap-y-1"
            >
              <span>{currentWork.role}</span>
              <span className="text-foreground/50 font-normal" aria-hidden>
                ·
              </span>
              <span className="text-foreground/90">{currentWork.company}</span>
            </motion.p>
          ) : (
            loading && (
              <motion.div
                variants={ANIMATION.itemUp}
                className="h-6 w-56 rounded bg-muted/40 animate-pulse"
              />
            )
          )}
        </motion.div>

        <motion.div variants={ANIMATION.itemUp} className="w-12 h-px bg-border" aria-hidden />

        <motion.div
          className="lg:col-span-5 flex flex-col gap-8 lg:gap-10 lg:pt-1"
          variants={{ initial: {}, animate: { transition: ANIMATION.staggerFast } }}
        >
          <InfoSection title="Currently" loading={loading}>
            {currentWork ? (
              <div className="space-y-0.5">
                <p className="text-foreground font-medium tracking-tight">{currentWork.role}</p>
                <p className="text-muted-foreground text-sm">{currentWork.company}</p>
                <p className="text-muted-foreground/80 text-xs font-mono mt-1">{currentWork.period}</p>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">—</p>
            )}
          </InfoSection>

          <InfoSection title="Education" loading={loading}>
            {currentEdu ? (
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
          </InfoSection>

          <InfoSection title="Focus" loading={loading}>
            {focusTech.length > 0 ? (
              <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                {focusTech.map((name) => (
                  <li key={name}>
                    <span className="inline-block px-3 py-1.5 text-xs rounded-full border border-border bg-muted/30 text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 hover:bg-muted/50 transition-colors duration-200 cursor-default">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">—</p>
            )}
          </InfoSection>
        </motion.div>
      </div>
    </motion.div>
  );
};

function InfoSection({ title, loading, children }) {
  const sectionClass =
    "space-y-2 pl-0 lg:pl-5 border-l-0 lg:border-l border-border lg:border-muted-foreground/30";

  return (
    <motion.section variants={ANIMATION.itemUp} className={sectionClass}>
      <h2 className="text-[11px] font-mono text-muted-foreground tracking-[0.18em] uppercase">
        {title}
      </h2>
      {loading ? (
        <div className="space-y-2">
          <div className="h-5 w-28 rounded bg-muted/40 animate-pulse" />
          <div className="h-4 w-20 rounded bg-muted/30 animate-pulse" />
        </div>
      ) : (
        children
      )}
    </motion.section>
  );
}

export default Home;
