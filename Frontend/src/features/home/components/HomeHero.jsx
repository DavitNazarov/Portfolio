import { motion } from "framer-motion";
import { HERO_NAME } from "@/features/home/constants/homeIntro";
import { EASE } from "@/features/home/constants/motion";

export default function HomeHero({ highlightedWork, loading, workIsCurrent }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 45%, oklch(0.3 0 0 / 0.35) 0%, transparent 70%)",
        }}
      />

      <div className="text-center mb-10 relative z-10">
        {HERO_NAME.map((word, wordIndex) => {
          const isItalic = wordIndex === 1;
          return (
            <div key={word} className="overflow-hidden" style={{ lineHeight: 0.92 }}>
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={`${wordIndex}-${charIndex}`}
                  className={`inline-block font-serif font-normal tracking-[-0.01em] text-foreground${
                    isItalic ? " italic" : ""
                  }`}
                  style={{ fontSize: "clamp(4.5rem, 15vw, 11rem)" }}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    delay: wordIndex * 0.38 + charIndex * 0.052,
                    duration: 0.95,
                    ease: EASE,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          );
        })}
      </div>

      <motion.div
        className="w-12 h-px bg-white/20 mb-6 relative z-10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.1, duration: 0.7, ease: EASE }}
      />

      <motion.div
        className="relative z-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.25, duration: 0.6, ease: EASE }}
      >
        {loading ? (
          <div className="h-4 w-52 bg-white/8 rounded-full animate-pulse" />
        ) : highlightedWork ? (
          <>
            {workIsCurrent ? (
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                <span className="relative flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
            ) : (
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/25" />
            )}
            <span className="text-ink-2 font-mono text-[10px] uppercase tracking-[0.22em]">
              {workIsCurrent ? "Current" : "Last role"}
            </span>
            <span className="text-foreground/80 font-light tracking-wide">{highlightedWork.role}</span>
          </>
        ) : null}
      </motion.div>

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
        <span className="text-[9px] font-mono tracking-[0.28em] uppercase text-ink-3">scroll</span>
      </motion.div>
    </div>
  );
}
