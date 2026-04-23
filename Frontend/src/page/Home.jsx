import { useMemo, useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, useInView, animate } from "framer-motion";
import {
  BrainCircuit, Boxes, Code2, Database, Server, ArrowUpRight,
  Briefcase, GraduationCap,
} from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { apiPublic } from "@/lib/api";
import { API_ROUTES } from "@/constants/routes";
import { sortByYear } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1];
const NAME = ["Davit", "Nazarov"];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const TECH_GROUPS = [
  {
    key: "frontend",
    title: "Front-end Systems",
    tagline: "Interface · Routing · State",
    description: "Routing, rendering, state, and the tactile polish that makes an interface feel premium.",
    icon: Code2,
    tint: "56, 189, 248",
    featured: true,
    match: ["react", "next", "vite", "tailwind", "framer", "tanstack", "query"],
  },
  {
    key: "backend",
    title: "Back-end & Auth",
    tagline: "APIs · Sessions · Realtime",
    description: "APIs, events, and real-time application flows with secure session design.",
    icon: Server,
    tint: "251, 191, 36",
    match: ["nest", "express", "socket", "jwt", "node"],
  },
  {
    key: "data",
    title: "Data Layer",
    tagline: "Schemas · Modeling · Persistence",
    description: "Schemas, persistence, and the data modeling foundations behind every product.",
    icon: Database,
    tint: "52, 211, 153",
    match: ["postgres", "mongo", "prisma", "sql", "database"],
  },
  {
    key: "immersive",
    title: "Motion & 3D",
    tagline: "Animation · Spatial · Depth",
    description: "Spatial interaction, animation rhythm, and the visual depth that tells a story.",
    icon: Boxes,
    tint: "244, 114, 182",
    match: ["three", "fiber", "gsap"],
  },
  {
    key: "ai",
    title: "AI & Media",
    tagline: "Pipelines · Content · Intelligence",
    description: "Content systems, media pipelines, and AI-assisted features woven into real products.",
    icon: BrainCircuit,
    tint: "167, 139, 250",
    match: ["gemini", "cloudinary", "tmdb", "openai", "ai"],
  },
];

export default function Home() {
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
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
        setExperiences([]); setEducation([]); setProjects([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const currentWork = useMemo(() => sortByYear(experiences)[0], [experiences]);
  const currentEdu = useMemo(() => {
    const s = sortByYear(education);
    return s.find((e) => e.present) ?? s[0];
  }, [education]);
  const focusTech = useMemo(() => {
    const all = projects.flatMap((p) => Array.isArray(p.technologies) ? p.technologies : []);
    return [...new Set(all.map((t) => (typeof t === "string" ? t.trim() : String(t))).filter(Boolean))];
  }, [projects]);
  const techGroups = useMemo(() => groupTechnologies(focusTech), [focusTech]);

  // Letter delays: "Davit" starts at 0, "Nazarov" starts after Davit finishes
  const letterDelay = (wordIdx, charIdx) => wordIdx * 0.38 + charIdx * 0.052;

  return (
    <div className="w-full">

      {/* ─────────── HERO: full-screen centered ─────────── */}
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">

        {/* Ambient radial glow behind name */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 45%, oklch(0.3 0 0 / 0.35) 0%, transparent 70%)",
          }}
        />

        {/* ── Name ── */}
        <div className="text-center mb-10 relative z-10">
          {NAME.map((word, wi) => {
            const isItalic = wi === 1; // "Nazarov" — signature italic
            return (
              <div key={word} className="overflow-hidden" style={{ lineHeight: 0.92 }}>
                {word.split("").map((char, ci) => (
                  <motion.span
                    key={`${wi}-${ci}`}
                    className={`inline-block font-serif font-normal tracking-[-0.01em] text-foreground ${
                      isItalic ? "italic" : ""
                    }`}
                    style={{ fontSize: "clamp(4.5rem, 15vw, 11rem)" }}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      delay: letterDelay(wi, ci),
                      duration: 0.95,
                      ease,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            );
          })}
        </div>

        {/* ── Thin centre line that draws after name ── */}
        <motion.div
          className="w-12 h-px bg-white/20 mb-6 relative z-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.1, duration: 0.7, ease }}
        />

        {/* ── Status ── */}
        <motion.div
          className="relative z-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.6, ease }}
        >
          {loading ? (
            <div className="h-4 w-52 bg-white/8 rounded-full animate-pulse" />
          ) : currentWork ? (
            <>
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                <span className="relative flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-foreground/80 font-light tracking-wide">{currentWork.role}</span>
            </>
          ) : null}
        </motion.div>

        {/* ── Scroll cue ── */}
        <motion.div
          className="absolute bottom-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 1 }}
        >
          <motion.div
            className="w-px h-10 bg-white/14 rounded-full"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ originY: "top" }}
          />
          <span className="text-[9px] font-mono tracking-[0.28em] uppercase text-white/18">scroll</span>
        </motion.div>
      </div>

      {/* ─────────── INFO: below the fold ─────────── */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 pb-28 sm:pb-36">

        {/* Eyebrow intro */}
        <motion.div
          className="mb-8 sm:mb-10 flex items-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <motion.span
            className="h-px bg-white/18"
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          />
          <span className="text-[10px] font-mono tracking-[0.34em] uppercase text-muted-foreground/55">
            At a glance
          </span>
        </motion.div>

        {/* Info cards */}
        <motion.div
          className="grid sm:grid-cols-2 gap-3 sm:gap-3.5 mb-16 sm:mb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          <HeroInfoCard
            eyebrow="Currently"
            tint="251, 191, 36"
            icon={Briefcase}
            loading={loading}
            title={currentWork?.role}
            subtitle={currentWork?.company}
            period={currentWork?.period}
            isLive={Boolean(currentWork?.present)}
            jumpTo="experience"
            emptyLabel="Between engagements"
          />

          <HeroInfoCard
            eyebrow="Education"
            tint="52, 211, 153"
            icon={GraduationCap}
            loading={loading}
            title={currentEdu?.degree}
            subtitle={currentEdu?.institution}
            period={currentEdu?.period}
            isLive={Boolean(currentEdu?.present)}
            jumpTo="education"
            emptyLabel="Self-directed study"
          />
        </motion.div>

        {/* Tech stack */}
        {loading ? (
          <TechStackSkeleton />
        ) : focusTech.length === 0 ? (
          <div className="rounded-[1.75rem] border border-white/8 bg-white/[0.03] px-6 py-7">
            <p className="text-[10px] font-mono tracking-[0.28em] uppercase text-muted-foreground/35 mb-3">
              Tech stack
            </p>
            <p className="text-sm text-muted-foreground/65 max-w-md">
              The stack panel is waiting for project technologies to arrive from the backend.
            </p>
          </div>
        ) : (
          <TechStackSection
            techGroups={techGroups}
            totalTools={focusTech.length}
            projectCount={projects.length}
          />
        )}
      </div>
    </div>
  );
}

/* ─────────────────── Tech Stack Section ─────────────────── */

function TechStackSection({ techGroups, totalTools, projectCount }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      className="relative"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="mb-10 sm:mb-12">
        <div className="flex items-center gap-3 mb-6">
          <motion.span
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="h-px w-10 bg-white/25"
          />
          <span className="text-[10px] font-mono tracking-[0.34em] uppercase text-muted-foreground/55">
            Capability Map
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <div>
            <motion.h3
              variants={fadeUp}
              className="max-w-[22ch] font-extralight tracking-tight leading-[1.05] text-foreground"
              style={{ fontSize: "clamp(1.75rem, 3.6vw, 2.75rem)" }}
            >
              Tools arranged by the work they{" "}
              <span className="font-serif italic font-normal text-white/95 relative">
                unlock
                <motion.span
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.9, ease, delay: 0.7 }}
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-white/60 via-white/30 to-transparent"
                />
              </span>
              .
            </motion.h3>
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-lg text-[13.5px] sm:text-sm leading-6 text-muted-foreground/65"
            >
              Instead of a flat badge wall, the stack reads like a working system — grouped by the
              surface each tool is responsible for.
            </motion.p>
          </div>

          <motion.div variants={fadeUp} className="grid grid-cols-3 gap-2 sm:gap-2.5">
            <StackStat value={totalTools} label="Tools" delay={0.4} active={inView} />
            <StackStat value={techGroups.length} label="Lanes" delay={0.5} active={inView} />
            <StackStat value={projectCount} label="Projects" delay={0.6} active={inView} />
          </motion.div>
        </div>
      </motion.div>

      {/* Cards — bento grid */}
      <motion.div
        variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
        className="grid gap-3 sm:gap-3.5 sm:grid-cols-2 lg:grid-cols-6"
      >
        {techGroups.map((group, i) => (
          <StackCard
            key={group.key}
            group={group}
            index={i}
            total={techGroups.length}
            totalTools={totalTools}
          />
        ))}
      </motion.div>
    </motion.section>
  );
}

/* ─────────────────── Animated Counter Stat ─────────────────── */

function StackStat({ value, label, delay = 0, active }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    const controls = animate(0, value, {
      duration: 1.1,
      delay,
      ease,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [active, value, delay]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] px-3 py-3.5 backdrop-blur-sm"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 -right-8 h-20 w-20 rounded-full opacity-40 blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)" }}
      />
      <p className="relative text-lg sm:text-xl font-light tracking-tight text-foreground tabular-nums">
        {display}
      </p>
      <p className="relative mt-1 text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground/45">
        {label}
      </p>
    </div>
  );
}

/* ─────────────────── Stack Card with mouse spotlight ─────────────────── */

const cardVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease } },
};

function StackCard({ group, index, total, totalTools }) {
  const Icon = group.icon;
  const ref = useRef(null);
  const [chipsReady, setChipsReady] = useState(false);

  // Mouse-tracked spotlight
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.4 });
  const spotlight = useTransform(
    [sx, sy],
    ([x, y]) =>
      `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(${group.tint}, 0.22) 0%, transparent 45%)`
  );

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  // Grid span: featured spans everything, others split responsive space
  const layoutClass = group.featured
    ? "sm:col-span-2 lg:col-span-6"
    : total === 5 // 1 featured + 4: 2x2 below at col-span-3
    ? "lg:col-span-3"
    : total === 6 // 1 featured + 5: tricky, use col-span-3 for a cleaner fallback
    ? "lg:col-span-3"
    : "lg:col-span-3";

  const toolShare = totalTools > 0 ? Math.min(1, group.items.length / totalTools) : 0;

  return (
    <motion.article
      ref={ref}
      variants={cardVariant}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      onViewportEnter={() => setTimeout(() => setChipsReady(true), 120 + index * 70)}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 24 } }}
      className={`group relative overflow-hidden rounded-[1.4rem] border backdrop-blur-[2px] p-5 sm:p-6 ${layoutClass}`}
      style={{
        borderColor: `rgba(${group.tint}, ${group.featured ? "0.2" : "0.14"})`,
        background: group.featured
          ? `linear-gradient(135deg, rgba(${group.tint}, 0.14) 0%, rgba(255,255,255,0.025) 40%, rgba(0,0,0,0.22) 100%)`
          : `linear-gradient(150deg, rgba(${group.tint}, 0.09) 0%, rgba(255,255,255,0.02) 45%, rgba(0,0,0,0.18) 100%)`,
      }}
    >
      {/* Mouse-tracked spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      {/* Top-edge hairline accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(${group.tint}, 0.5) 50%, transparent 100%)`,
        }}
      />

      <div className="relative flex h-full flex-col">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3.5">
            {/* Icon with aura */}
            <div className="relative shrink-0">
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl blur-xl opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `rgba(${group.tint}, 0.35)` }}
              />
              <div
                className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border"
                style={{
                  borderColor: `rgba(${group.tint}, 0.28)`,
                  backgroundColor: `rgba(${group.tint}, 0.14)`,
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08)`,
                }}
              >
                <Icon
                  className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                  style={{ color: `rgb(${group.tint})` }}
                />
              </div>
            </div>

            <div className="min-w-0">
              <p
                className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.24em] leading-none"
                style={{ color: `rgba(${group.tint}, 0.75)` }}
              >
                {String(index + 1).padStart(2, "0")} · Lane
              </p>
              <h4 className="mt-1.5 text-[15px] sm:text-base font-medium text-foreground/95 leading-tight">
                {group.title}
              </h4>
              <p className="mt-1 text-[11px] font-mono tracking-[0.06em] text-muted-foreground/45">
                {group.tagline}
              </p>
            </div>
          </div>

          {/* Count + arrow indicator */}
          <div className="flex shrink-0 items-center gap-1.5">
            <span
              className="text-[10px] font-mono uppercase tracking-[0.18em] whitespace-nowrap"
              style={{ color: `rgba(${group.tint}, 0.85)` }}
            >
              {group.items.length}
              <span className="text-muted-foreground/35">/{totalTools}</span>
            </span>
            <ArrowUpRight
              className="h-3.5 w-3.5 text-muted-foreground/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              style={{ color: `rgba(${group.tint}, 0.55)` }}
            />
          </div>
        </div>

        {/* Description */}
        <p
          className={`mt-4 text-[13px] sm:text-[13.5px] leading-6 text-muted-foreground/72 ${
            group.featured ? "max-w-lg" : ""
          }`}
        >
          {group.description}
        </p>

        {/* Progress bar — share of total */}
        <div className="mt-4 mb-1 flex items-center gap-2.5">
          <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ backgroundColor: `rgba(${group.tint}, 0.7)` }}
              initial={{ width: 0 }}
              animate={chipsReady ? { width: `${toolShare * 100}%` } : { width: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.05 }}
            />
          </div>
          <span className="text-[9.5px] font-mono tracking-[0.12em] text-muted-foreground/35 tabular-nums">
            {Math.round(toolShare * 100)}%
          </span>
        </div>

        {/* Chips */}
        <ul
          className={`mt-4 flex flex-wrap gap-1.5 list-none p-0 m-0 ${
            group.featured ? "" : ""
          }`}
        >
          {group.items.map((name, i) => (
            <motion.li
              key={name}
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={chipsReady ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 22,
                delay: i * 0.04,
              }}
            >
              <motion.span
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11.5px] sm:text-[12.5px] text-foreground/88 font-normal select-none transition-colors duration-200 cursor-default"
                style={{
                  borderColor: `rgba(${group.tint}, ${group.featured && i < 3 ? "0.32" : "0.18"})`,
                  backgroundColor: `rgba(${group.tint}, ${group.featured && i < 3 ? "0.14" : "0.07"})`,
                }}
              >
                {name}
              </motion.span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

/* ─────────────────── Hero Info Card ─────────────────── */

function HeroInfoCard({
  eyebrow,
  tint,
  icon: Icon,
  loading,
  title,
  subtitle,
  period,
  isLive,
  jumpTo,
  emptyLabel,
}) {
  const handleJump = () => {
    if (!jumpTo) return;
    document.getElementById(jumpTo)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const hasData = !loading && Boolean(title);

  return (
    <SpotlightCard
      tint={tint}
      className="p-5 sm:p-6 cursor-pointer"
      onClick={handleJump}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleJump();
        }
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div
              aria-hidden
              className="absolute inset-0 rounded-xl blur-lg opacity-55 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `rgba(${tint}, 0.42)` }}
            />
            <div
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border"
              style={{
                borderColor: `rgba(${tint}, 0.3)`,
                backgroundColor: `rgba(${tint}, 0.13)`,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <Icon className="h-4 w-4" style={{ color: `rgb(${tint})` }} />
            </div>
          </div>

          <p
            className="text-[10px] font-mono uppercase tracking-[0.32em]"
            style={{ color: `rgba(${tint}, 0.82)` }}
          >
            {eyebrow}
          </p>
        </div>

        {isLive && !loading && (
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 22 }}
            className="flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400/90"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Live
          </motion.div>
        )}
      </div>

      {/* Body */}
      {loading ? (
        <div className="space-y-2 animate-pulse">
          <div className="h-5 w-4/5 bg-white/8 rounded" />
          <div className="h-4 w-3/5 bg-white/5 rounded" />
          <div className="h-3 w-1/3 bg-white/4 rounded mt-5" />
        </div>
      ) : hasData ? (
        <>
          <h3 className="text-[15px] sm:text-base font-medium text-foreground/95 leading-snug">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground/65 leading-snug">{subtitle}</p>

          {/* Footer: period + view cue */}
          <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
            <p className="text-[11px] font-mono text-muted-foreground/50 tabular-nums tracking-wide">
              {period}
            </p>
            <div
              className="flex items-center gap-1 text-[9.5px] font-mono uppercase tracking-[0.24em] transition-all duration-300 group-hover:translate-x-0.5"
              style={{ color: `rgba(${tint}, 0.75)` }}
            >
              View
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground/50 font-serif italic">{emptyLabel}</p>
      )}
    </SpotlightCard>
  );
}

function TechStackSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-10 sm:mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-10 bg-white/12" />
          <div className="h-3 w-28 rounded-full bg-white/6" />
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <div className="space-y-4">
            <div className="h-8 w-64 rounded-xl bg-white/8" />
            <div className="space-y-2">
              <div className="h-4 w-full max-w-md rounded bg-white/5" />
              <div className="h-4 w-5/6 max-w-sm rounded bg-white/5" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-white/6 bg-white/[0.02] px-3 py-3.5">
                <div className="h-5 w-8 rounded bg-white/8" />
                <div className="mt-2 h-3 w-12 rounded bg-white/5" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-3.5 sm:grid-cols-2 lg:grid-cols-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`rounded-[1.4rem] border border-white/6 bg-white/[0.02] p-5 sm:p-6 ${
              i === 0 ? "sm:col-span-2 lg:col-span-6" : "lg:col-span-3"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="h-11 w-11 rounded-2xl bg-white/7" />
                <div className="space-y-2">
                  <div className="h-2.5 w-20 rounded bg-white/5" />
                  <div className="h-4 w-36 rounded bg-white/8" />
                  <div className="h-2.5 w-28 rounded bg-white/4" />
                </div>
              </div>
              <div className="h-3 w-12 rounded bg-white/6" />
            </div>
            <div className="mt-4 h-3 w-full max-w-sm rounded bg-white/5" />
            <div className="mt-4 h-[2px] w-full rounded-full bg-white/6" />
            <div className="mt-4 flex flex-wrap gap-1.5">
              {Array.from({ length: i === 0 ? 7 : 4 }).map((__, chipIndex) => (
                <div
                  key={chipIndex}
                  className="h-7 rounded-full bg-white/6"
                  style={{ width: `${64 + chipIndex * 10}px` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function groupTechnologies(tech) {
  const used = new Set();
  const groups = TECH_GROUPS.map((group) => {
    const items = tech.filter((item) => {
      const normalized = item.toLowerCase();
      return group.match.some((keyword) => normalized.includes(keyword));
    });

    items.forEach((item) => used.add(item));
    return { ...group, items };
  }).filter((group) => group.items.length > 0);

  const uncategorized = tech.filter((item) => !used.has(item));
  if (uncategorized.length > 0) {
    groups.push({
      key: "other",
      title: "Support Tools",
      description: "The extra ingredients that round out delivery and workflow.",
      icon: Boxes,
      tint: "148, 163, 184",
      featured: false,
      items: uncategorized,
    });
  }

  return groups;
}
