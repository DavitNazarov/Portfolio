import { useMemo } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Folder, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useFetchData } from "@/hooks/useFetchData";
import { API_ROUTES } from "@/constants/routes";
import { sortByYear } from "@/lib/utils";

const TINT = "56, 189, 248";

export default function Projects() {
  const { data: projects, loading } = useFetchData(API_ROUTES.PROJECTS.PUBLIC, "projects");
  const sorted = useMemo(() => sortByYear(projects, (p) => p.year), [projects]);

  return (
    <div className="w-full max-w-4xl">
      <SectionHeader
        number="04"
        eyebrow="Projects"
        title="Things I've"
        accent="built"
        after=" and shipped."
        description="A selection of work that went from blank canvas to production — each one a small world with its own constraints and craft."
        tint={TINT}
      />

      <div className="flex flex-col gap-3.5">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : sorted.map((project, i) => (
              <ProjectCard
                key={project._id || `${project.name}-${i}`}
                project={project}
                index={i}
                total={sorted.length}
              />
            ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index, total }) {
  const tech = Array.isArray(project.technologies) ? project.technologies : [];
  const live = project.liveLink && project.liveLink !== "#" ? project.liveLink : null;
  const github = project.githubLink && project.githubLink !== "#" ? project.githubLink : null;

  return (
    <SpotlightCard tint={TINT} delay={index * 0.08} className="p-5 sm:p-7">
      <div className="flex flex-col gap-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3.5">
            <div className="relative shrink-0">
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl blur-xl opacity-55 transition-opacity duration-500 group-hover:opacity-100"
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
                <Folder className="h-[18px] w-[18px]" style={{ color: `rgb(${TINT})` }} />
              </div>
            </div>

            <div className="min-w-0 pt-0.5">
              <p
                className="text-[10px] font-mono uppercase tracking-[0.26em] leading-none"
                style={{ color: `rgba(${TINT}, 0.8)` }}
              >
                {String(index + 1).padStart(2, "0")}
                <span className="text-muted-foreground/30"> / {String(total).padStart(2, "0")}</span>
                {project.year && <span className="text-muted-foreground/35"> · {project.year}</span>}
              </p>
              <h3 className="mt-2 text-lg sm:text-xl font-medium text-foreground/95 leading-snug flex items-center gap-2">
                {project.name}
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  style={{ color: `rgba(${TINT}, 0.7)` }}
                />
              </h3>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {github && (
              <motion.a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/4 px-2.5 py-1.5 text-[11px] font-mono text-muted-foreground/65 transition-colors duration-200 hover:text-foreground hover:border-white/20 hover:bg-white/8"
              >
                <Github className="h-3 w-3" />
                GitHub
              </motion.a>
            )}
            {live && (
              <motion.a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-mono text-foreground/85 transition-colors duration-200"
                style={{
                  borderColor: `rgba(${TINT}, 0.35)`,
                  backgroundColor: `rgba(${TINT}, 0.14)`,
                }}
              >
                <ExternalLink className="h-3 w-3" />
                Live
              </motion.a>
            )}
          </div>
        </div>

        {/* Description */}
        {project.description && (
          <p className="text-[13.5px] leading-6 text-muted-foreground/70 max-w-2xl">
            {project.description}
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
                transition={{ duration: 0.35, delay: 0.2 + i * 0.025 }}
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
            <div className="h-2.5 w-28 rounded bg-white/5" />
            <div className="h-5 w-56 rounded bg-white/8" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-7 w-20 rounded-lg bg-white/5" />
          <div className="h-7 w-16 rounded-lg bg-white/5" />
        </div>
      </div>
      <div className="mt-5 space-y-2">
        <div className="h-3.5 w-full rounded bg-white/4" />
        <div className="h-3.5 w-5/6 rounded bg-white/4" />
      </div>
      <div className="mt-5 flex gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-6 rounded-full bg-white/5" style={{ width: `${52 + i * 12}px` }} />
        ))}
      </div>
    </div>
  );
}
