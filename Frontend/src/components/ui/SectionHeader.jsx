import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

/**
 * Unified section header used across Experience / Education / Projects / Contact.
 * Provides: hairline + numbered eyebrow, display title with italic accent word,
 * optional description, and an animated fine rule underneath.
 */
export default function SectionHeader({
  number,
  eyebrow,
  title,
  accent,
  after = ".",
  description,
  tint = "148, 163, 184",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      className="mb-12 sm:mb-14"
    >
      <motion.div
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5, ease } } }}
        className="flex items-center gap-3 mb-5"
      >
        <motion.span
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="h-px w-10"
          style={{ backgroundColor: `rgba(${tint}, 0.55)` }}
        />
        <span
          className="text-[10px] font-mono tracking-[0.34em] uppercase"
          style={{ color: `rgba(${tint}, 0.75)` }}
        >
          {number} · {eyebrow}
        </span>
      </motion.div>

      <motion.h2
        variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } }}
        className="font-extralight tracking-tight leading-[1.05] text-foreground"
        style={{ fontSize: "clamp(2rem, 4.8vw, 3.5rem)" }}
      >
        {title}{" "}
        {accent && (
          <span className="font-serif italic font-normal text-white/95 relative">
            {accent}
            <motion.span
              initial={{ scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, ease, delay: 0.65 }}
              className="absolute -bottom-1 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, rgba(${tint}, 0.85), transparent)` }}
            />
          </span>
        )}
        {after}
      </motion.h2>

      {description && (
        <motion.p
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.2 } } }}
          className="mt-5 max-w-xl text-sm sm:text-[15px] leading-6 text-muted-foreground/65"
        >
          {description}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease, delay: 0.5 }}
        className="h-px bg-border mt-10 sm:mt-12"
      />
    </motion.div>
  );
}
