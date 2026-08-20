import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, label[for]';

/** True only for devices that actually have a hovering pointer. */
function usePrecisePointer() {
  const [precise, setPrecise] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const update = () => setPrecise(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return precise;
}

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [pointer, setPointer] = useState(false);
  const precise = usePrecisePointer();
  const reduceMotion = useReducedMotion();
  const enabled = precise && !reduceMotion;

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const dotX = useSpring(mx, { stiffness: 700, damping: 40 });
  const dotY = useSpring(my, { stiffness: 700, damping: 40 });
  const ringX = useSpring(mx, { stiffness: 160, damping: 22 });
  const ringY = useSpring(my, { stiffness: 160, damping: 22 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      // Set unconditionally and let React bail out on an unchanged value —
      // reading `visible` here would put it in the dep list and tear down and
      // re-add all four listeners every time the cursor enters or leaves.
      setVisible(true);
    };
    // `closest` on a selector list beats getComputedStyle here: the old version
    // forced a style recalculation for every element the pointer crossed.
    const onOver = (e) => {
      const target = e.target;
      setPointer(target instanceof Element && Boolean(target.closest(INTERACTIVE)));
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
  }, [mx, my, enabled]);

  // Without a precise pointer — or with reduced motion — the native cursor is
  // restored by CSS and there is nothing to draw.
  if (!enabled) return null;

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
