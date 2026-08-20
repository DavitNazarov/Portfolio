import { AnimatePresence, motion } from "framer-motion";
import { SECTIONS } from "@/layout/constants/sections";
import { scrollToSection } from "@/layout/utils/scrollToSection";

/**
 * Compact section rail for viewports below `lg`, where the left-hand dot rail is
 * hidden. Offset from the right edge so it never sits under the chat launcher.
 */
export default function SectionNavMobile({ active }) {
  return (
    <nav
      aria-label="Section navigation"
      className="fixed bottom-5 left-4 right-24 z-40 lg:hidden"
    >
      <div className="flex items-center gap-0.5 overflow-x-auto rounded-full border border-white/10 bg-background/80 px-1.5 py-1.5 backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SECTIONS.map(({ id, label, number }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              aria-label={`Go to ${label}`}
              aria-current={isActive ? "true" : undefined}
              className="relative flex min-h-9 min-w-9 shrink-0 items-center justify-center gap-1.5 rounded-full px-3 py-1.5"
            >
              {isActive && (
                <motion.span
                  aria-hidden
                  layoutId="mobile-nav-pill"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className={`relative text-[10px] font-mono tabular-nums transition-colors duration-200 ${
                  isActive ? "text-foreground" : "text-ink-2"
                }`}
              >
                {number}
              </span>
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.span
                    key="label"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative overflow-hidden whitespace-nowrap text-[10px] font-mono uppercase tracking-[0.18em] text-foreground"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
