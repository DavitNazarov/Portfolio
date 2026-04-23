import { useMemo } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, CalendarDays } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useFetchData } from "@/hooks/useFetchData";
import { API_ROUTES } from "@/constants/routes";
import { sortByYear } from "@/lib/utils";

const TINT = "52, 211, 153";

export default function Education() {
  const { data: education, loading } = useFetchData(API_ROUTES.EDUCATION.PUBLIC, "education");
  const sorted = useMemo(() => sortByYear(education), [education]);

  return (
    <div className="w-full max-w-4xl">
      <SectionHeader
        number="03"
        eyebrow="Study"
        title="Foundations that"
        accent="sharpened"
        after=" the craft."
        description="Academic and self-directed study — the ground that every product decision quietly sits on."
        tint={TINT}
      />

      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : sorted.map((edu, i) => (
              <EducationCard
                key={edu._id || `${edu.institution}-${i}`}
                edu={edu}
                index={i}
              />
            ))}
      </div>
    </div>
  );
}

function EducationCard({ edu, index }) {
  return (
    <SpotlightCard tint={TINT} delay={index * 0.07} className="p-5 sm:p-6 flex flex-col h-full">
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="relative shrink-0">
            <div
              aria-hidden
              className="absolute inset-0 rounded-2xl blur-xl opacity-55 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `rgba(${TINT}, 0.4)` }}
            />
            <div
              className="relative flex h-10 w-10 items-center justify-center rounded-2xl border"
              style={{
                borderColor: `rgba(${TINT}, 0.28)`,
                backgroundColor: `rgba(${TINT}, 0.13)`,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <GraduationCap className="h-4 w-4" style={{ color: `rgb(${TINT})` }} />
            </div>
          </div>

          {edu.present && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 22 }}
              className="flex items-center gap-1.5 rounded-full border border-emerald-500/22 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400/85"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Current
            </motion.div>
          )}
        </div>

        <p
          className="text-[10px] font-mono uppercase tracking-[0.26em] leading-none"
          style={{ color: `rgba(${TINT}, 0.8)` }}
        >
          {String(index + 1).padStart(2, "0")} · Program
        </p>

        <div className="flex-1">
          <h3 className="text-[15px] sm:text-base font-medium text-foreground/95 leading-snug mb-2">
            {edu.degree}
          </h3>
          <div className="flex items-start gap-1.5 text-[13px] text-muted-foreground/60 leading-snug">
            <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <span>{edu.institution}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 pt-2 border-t border-white/[0.06]">
          <CalendarDays className="h-3 w-3 text-muted-foreground/45" />
          <span className="text-[11px] font-mono text-muted-foreground/55">{edu.period}</span>
        </div>
      </div>
    </SpotlightCard>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-[1.4rem] border border-white/6 bg-white/[0.02] p-5 sm:p-6 space-y-4">
      <div className="flex justify-between">
        <div className="h-10 w-10 rounded-2xl bg-white/7" />
        <div className="h-5 w-16 rounded-full bg-white/4" />
      </div>
      <div className="h-2.5 w-24 rounded bg-white/5" />
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-white/8" />
        <div className="h-4 w-3/4 rounded bg-white/8" />
        <div className="h-3 w-2/3 rounded bg-white/4" />
      </div>
      <div className="h-3.5 w-28 rounded bg-white/4" />
    </div>
  );
}
