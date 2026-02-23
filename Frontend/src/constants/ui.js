/** Shared animation variants for Framer Motion */
export const ANIMATION = {
  spring: { type: "spring", stiffness: 120, damping: 24 },
  staggerFast: { staggerChildren: 0.06, delayChildren: 0.1 },
  staggerSlow: { staggerChildren: 0.1, delayChildren: 0.2 },
  itemUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring", stiffness: 120, damping: 24 },
  },
  listContainer: {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  },
  listItem: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
};

/** Shared input styles for forms */
export const INPUT_CLASS =
  "w-full px-4 py-2.5 rounded-xl border border-border bg-background/80 placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow";

export const INPUT_CLASS_SM =
  "w-full px-4 py-2.5 rounded-lg border border-border bg-background/80 placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-transparent transition-all text-sm";
