import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import StackCard from "@/features/home/components/StackCard";
import StackStat from "@/features/home/components/StackStat";
import { EASE, FADE_UP } from "@/features/home/constants/motion";

export default function TechStackSection({ techGroups, totalTools, projectCount }) {
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
      <motion.div variants={FADE_UP} className="mb-10 sm:mb-12">
        <div className="flex items-center gap-3 mb-6">
          <motion.span
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="h-px w-10 bg-white/25"
          />
          <span className="text-[10px] font-mono tracking-[0.34em] uppercase text-ink-2">
            Capability Map
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <div>
            <motion.h3
              variants={FADE_UP}
              className="max-w-[22ch] font-extralight tracking-tight leading-[1.05] text-foreground"
              style={{ fontSize: "clamp(1.75rem, 3.6vw, 2.75rem)" }}
            >
              Tools arranged by the work they{" "}
              <span className="font-serif italic font-normal text-white/95 relative">
                unlock
                <motion.span
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-white/60 via-white/30 to-transparent"
                />
              </span>
              .
            </motion.h3>
            <motion.p
              variants={FADE_UP}
              className="mt-5 max-w-lg text-[13.5px] sm:text-sm leading-6 text-ink-1"
            >
              Instead of a flat badge wall, the stack reads like a working system — grouped by the
              surface each tool is responsible for.
            </motion.p>
          </div>

          <motion.div variants={FADE_UP} className="grid grid-cols-3 gap-2 sm:gap-2.5">
            <StackStat value={totalTools} label="Tools" delay={0.4} active={inView} />
            <StackStat value={techGroups.length} label="Lanes" delay={0.5} active={inView} />
            <StackStat value={projectCount} label="Projects" delay={0.6} active={inView} />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
        className="grid gap-3 sm:gap-3.5 sm:grid-cols-2 lg:grid-cols-6"
      >
        {techGroups.map((group, index) => (
          <StackCard
            key={group.key}
            group={group}
            index={index}
            total={techGroups.length}
            totalTools={totalTools}
          />
        ))}
      </motion.div>
    </motion.section>
  );
}
