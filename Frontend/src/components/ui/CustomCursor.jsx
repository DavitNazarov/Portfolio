import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [pointer, setPointer] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const dotX = useSpring(mx, { stiffness: 700, damping: 40 });
  const dotY = useSpring(my, { stiffness: 700, damping: 40 });
  const ringX = useSpring(mx, { stiffness: 160, damping: 22 });
  const ringY = useSpring(my, { stiffness: 160, damping: 22 });

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onOver = (e) => {
      const tag = e.target?.tagName?.toLowerCase();
      const cur = window.getComputedStyle(e.target).cursor;
      setPointer(cur === "pointer" || tag === "a" || tag === "button");
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [mx, my, visible]);

  return (
    <>
      {/* Dot */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-foreground"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
        }}
        animate={{ opacity: visible ? 0.85 : 0, scale: pointer ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      {/* Ring */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-foreground/50"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          width: pointer ? 40 : 28,
          height: pointer ? 40 : 28,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
