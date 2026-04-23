import { useMemo } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, CalendarDays } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useFetchData } from "@/hooks/useFetchData";
import { API_ROUTES } from "@/constants/routes";
import { sortByYear } from "@/lib/utils";

const TINT = "251, 191, 36";

export default function Experience() {
  const { data: experiences, loading } = useFetchData(API_ROUTES.EXPERIENCE.PUBLIC, "experiences");
  const sorted = useMemo(() => sortByYear(experiences), [experiences]);

  return (
    <div className="w-full max-w-4xl">
      <SectionHeader
        number="02"
        eyebrow="Work"
        title="Places I've"
        accent="shipped"
        after=" real products."
        description="A running log of the teams I've built with — the role I played, the surface I owned, and the tools I used to get there."
        tint={TINT}
      />

      <div className="flex flex-col gap-3.5">
        {loading
          ? Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={i} />)
          : sorted.map((exp, i) => (
              <ExperienceCard
                key={exp._id || `${exp.company}-${i}`}
                exp={exp}
                index={i}
                total={sorted.length}
              />
            ))}
      </div>
    </div>
  );
}

function ExperienceCard({ exp, index, total }) {
  const tech = Array.isArray(exp.tech) ? exp.tech : [];
  const isCurrent = Boolean(exp.present);

  return (
    <SpotlightCard tint={TINT} delay={index * 0.08} className="p-5 sm:p-7">
      <div className="flex flex-col gap-5">
        {/* Top row: icon + meta */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3.5">
            <div className="relative shrink-0">
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl blur-xl opacity-50 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `rgba(${TINT}, 0.4)` }}
              />
              <div
                className="relative flex h-11 w-11 items-center justify-center rounded-2xl border"
                style={{
                  borderColor: `rgba(${TINT}, 0.3)`,
                  backgroundColor: `rgba(${TINT}, 0.14)`,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <Briefcase className="h-[18px] w-[18px]" style={{ color: `rgb(${TINT})` }} />
              </div>
            </div>

            <div className="min-w-0 pt-0.5">
              <p
                className="text-[10px] font-mono uppercase tracking-[0.26em] leading-none"
                style={{ color: `rgba(${TINT}, 0.8)` }}
              >
                {String(index + 1).padStart(2, "0")}
                <span className="text-muted-foreground/30"> / {String(total).padStart(2, "0")}</span>
                <span className="text-muted-foreground/35"> · Role</span>
              </p>
              <h3 className="mt-2 text-lg sm:text-xl font-medium text-foreground/95 leading-snug">
                {exp.role}
              </h3>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground/60">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>{exp.company}</span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2">
            <div
              className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-mono whitespace-nowrap"
              style={{
                borderColor: `rgba(${TINT}, 0.2)`,
                backgroundColor: `rgba(${TINT}, 0.08)`,
                color: `rgba(${TINT}, 0.9)`,
              }}
            >
              <CalendarDays className="h-3 w-3" />
              {exp.period}
            </div>
            {isCurrent && (
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 22 }}
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
        </div>

        {/* Description */}
        {exp.description && (
          <p className="text-[13.5px] leading-6 text-muted-foreground/70 max-w-2xl">
            {exp.description}
          </p>
        )}

        {/* Tech chips */}
        {tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tech.map((t, i) => (
              <motion.span
                key={`${t}-${i}`}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.35, delay: 0.2 + i * 0.03 }}
                className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11.5px] text-foreground/82 transition-colors duration-200 cursor-default"
                style={{
                  borderColor: `rgba(${TINT}, 0.18)`,
                  backgroundColor: `rgba(${TINT}, 0.07)`,
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-[1.4rem] border border-white/6 bg-white/[0.02] p-5 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="h-11 w-11 rounded-2xl bg-white/7" />
          <div className="space-y-2 pt-1">
            <div className="h-2.5 w-24 rounded bg-white/5" />
            <div className="h-5 w-48 rounded bg-white/8" />
            <div className="h-3.5 w-28 rounded bg-white/4" />
          </div>
        </div>
        <div className="h-6 w-28 rounded-full bg-white/5" />
      </div>
      <div className="mt-5 space-y-2">
        <div className="h-3.5 w-full rounded bg-white/4" />
        <div className="h-3.5 w-5/6 rounded bg-white/4" />
      </div>
      <div className="mt-5 flex gap-1.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-6 rounded-full bg-white/5" style={{ width: `${56 + i * 14}px` }} />
        ))}
      </div>
    </div>
  );
}
