import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Folder, Github } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { PROJECTS_TINT } from "@/features/projects/constants/projects";
import { personalContribution } from "@/features/projects/utils/personalContribution";

export default function ProjectCard({ project, index, total }) {
  const tech = Array.isArray(project.technologies) ? project.technologies : [];
  const live = project.liveLink && project.liveLink !== "#" ? project.liveLink : null;
  const github = project.githubLink && project.githubLink !== "#" ? project.githubLink : null;

  return (
    <SpotlightCard tint={PROJECTS_TINT} delay={index * 0.08} className="p-5 sm:p-7">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3.5">
            <div className="relative shrink-0">
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl blur-xl opacity-55 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `rgba(${PROJECTS_TINT}, 0.4)` }}
              />
              <div
                className="relative flex h-11 w-11 items-center justify-center rounded-2xl border"
                style={{
                  borderColor: `rgba(${PROJECTS_TINT}, 0.3)`,
                  backgroundColor: `rgba(${PROJECTS_TINT}, 0.14)`,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <Folder className="h-[18px] w-[18px]" style={{ color: `rgb(${PROJECTS_TINT})` }} />
              </div>
            </div>

            <div className="min-w-0 pt-0.5">
              <p
                className="text-[10px] font-mono uppercase tracking-[0.26em] leading-none"
                style={{ color: `rgba(${PROJECTS_TINT}, 0.8)` }}
              >
                {String(index + 1).padStart(2, "0")}
                <span className="text-muted-foreground/30"> / {String(total).padStart(2, "0")}</span>
                {project.year && <span className="text-muted-foreground/35"> · {project.year}</span>}
              </p>
              <h3 className="mt-2 text-lg sm:text-xl font-medium text-foreground/95 leading-snug flex items-center gap-2">
                {project.name}
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  style={{ color: `rgba(${PROJECTS_TINT}, 0.7)` }}
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
                  borderColor: `rgba(${PROJECTS_TINT}, 0.35)`,
                  backgroundColor: `rgba(${PROJECTS_TINT}, 0.14)`,
                }}
              >
                <ExternalLink className="h-3 w-3" />
                Live
              </motion.a>
            )}
          </div>
        </div>

        {project.description && (
          <p className="text-[13.5px] leading-6 text-muted-foreground/70 max-w-2xl">
            {project.description}
          </p>
        )}

        <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-3">
          <p
            className="text-[10px] font-mono uppercase tracking-[0.22em]"
            style={{ color: `rgba(${PROJECTS_TINT}, 0.75)` }}
          >
            My part
          </p>
          <p className="mt-1.5 text-[13px] leading-6 text-muted-foreground/68">
            {personalContribution(project)}
          </p>
        </div>

        {tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tech.map((item, techIndex) => (
              <motion.span
                key={`${item}-${techIndex}`}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.35, delay: 0.2 + techIndex * 0.025 }}
                className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11.5px] text-foreground/82 transition-colors duration-200 cursor-default"
                style={{
                  borderColor: `rgba(${PROJECTS_TINT}, 0.18)`,
                  backgroundColor: `rgba(${PROJECTS_TINT}, 0.07)`,
                }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}
