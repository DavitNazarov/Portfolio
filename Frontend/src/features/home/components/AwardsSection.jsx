import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import AwardCard from "@/features/home/components/AwardCard";
import AwardStats from "@/features/home/components/AwardStats";
import { medalStats } from "@/features/home/utils/medalStats";
import { EASE, FADE_UP } from "@/features/home/constants/motion";

export default function AwardsSection({ awards }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });
  const stats = useMemo(() => medalStats(awards), [awards]);

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ show: { transition: { staggerChildren: 0.09 } } }}
      className="relative mt-16 sm:mt-20"
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
            Record
          </span>
        </div>

        <motion.h3
          variants={FADE_UP}
          className="font-extralight tracking-tight leading-[1.05] text-foreground"
          style={{ fontSize: "clamp(1.75rem, 3.6vw, 2.75rem)" }}
        >
          Competition{" "}
          <span className="font-serif italic font-normal text-white/95 relative">
            highlights
            <motion.span
              initial={{ scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
              className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-white/60 via-white/30 to-transparent"
            />
          </span>
          .
        </motion.h3>
      </motion.div>

      <AwardStats stats={stats} active={inView} />

      <motion.div
        variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
        className="grid gap-3 sm:gap-3.5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {awards.map((award, index) => (
          <AwardCard key={award._id ?? index} award={award} index={index} />
        ))}
      </motion.div>
    </motion.section>
  );
}
