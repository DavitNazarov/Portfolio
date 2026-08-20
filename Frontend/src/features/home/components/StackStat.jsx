import { useEffect, useState } from "react";
import { animate } from "framer-motion";
import { EASE } from "@/features/home/constants/motion";

export default function StackStat({ value, label, delay = 0, active }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;

    const controls = animate(0, value, {
      duration: 1.1,
      delay,
      ease: EASE,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [active, value, delay]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] px-3 py-3.5 backdrop-blur-sm">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 -right-8 h-20 w-20 rounded-full opacity-40 blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)" }}
      />
      <p className="relative text-lg sm:text-xl font-light tracking-tight text-foreground tabular-nums">
        {display}
      </p>
      <p className="relative mt-1 text-[10px] font-mono uppercase tracking-[0.22em] text-ink-2">
        {label}
      </p>
    </div>
  );
}
