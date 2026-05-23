import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SECTIONS } from "@/layout/constants/sections";

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function SectionNav({ active }) {
  const [navHovered, setNavHovered] = useState(false);

  return (
    <nav
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-5"
      onMouseEnter={() => setNavHovered(true)}
      onMouseLeave={() => setNavHovered(false)}
      aria-label="Section navigation"
    >
      <motion.div
        aria-hidden
        className="absolute left-[3px] top-1 bottom-1 w-px bg-foreground/15"
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      />

      {SECTIONS.map(({ id, label, number }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            aria-label={`Go to ${label}`}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex items-center gap-3 py-0.5"
          >
            <motion.span
              aria-hidden
              className="relative block rounded-full"
              animate={{
                width: isActive ? 7 : 5,
                height: isActive ? 7 : 5,
                backgroundColor: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.3)",
              }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            >
              {isActive && (
                <motion.span
                  aria-hidden
                  layoutId="nav-active-glow"
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: "0 0 14px 2px rgba(255,255,255,0.35)" }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                />
              )}
            </motion.span>

            <div className="flex items-center gap-2 whitespace-nowrap">
              <motion.span
                className="text-[9px] font-mono tracking-[0.2em] tabular-nums"
                animate={{
                  opacity: isActive ? 0.9 : navHovered ? 0.55 : 0.3,
                  color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)",
                }}
                transition={{ duration: 0.2 }}
              >
                {number}
              </motion.span>

              <AnimatePresence>
                {(navHovered || isActive) && (
                  <motion.span
                    key="label"
                    initial={{ opacity: 0, x: -6, width: 0 }}
                    animate={{
                      opacity: isActive ? 0.95 : 0.55,
                      x: 0,
                      width: "auto",
                    }}
                    exit={{ opacity: 0, x: -6, width: 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[10px] font-mono tracking-[0.24em] uppercase text-foreground overflow-hidden"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </button>
        );
      })}
    </nav>
  );
}
