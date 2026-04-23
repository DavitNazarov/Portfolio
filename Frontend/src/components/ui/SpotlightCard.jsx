import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

/**
 * Premium card wrapper with:
 *   • cursor-tracked radial spotlight (tinted to the card's accent)
 *   • colored top-edge hairline
 *   • tint-tinted gradient background
 *   • scroll-triggered entrance + subtle hover lift
 *
 * Pass `tint` as an "R, G, B" string (e.g. "56, 189, 248").
 */
export default function SpotlightCard({
  tint = "148, 163, 184",
  delay = 0,
  className = "",
  hover = true,
  as = "div",
  children,
  ...props
}) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.4 });
  const spotlight = useTransform(
    [sx, sy],
    ([x, y]) =>
      `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(${tint}, 0.2) 0%, transparent 48%)`
  );

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y: 28, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease, delay }}
      whileHover={hover ? { y: -3, transition: { type: "spring", stiffness: 300, damping: 24 } } : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative overflow-hidden rounded-[1.4rem] border backdrop-blur-[2px] ${className}`}
      style={{
        borderColor: `rgba(${tint}, 0.15)`,
        background: `linear-gradient(150deg, rgba(${tint}, 0.07) 0%, rgba(255,255,255,0.02) 45%, rgba(0,0,0,0.16) 100%)`,
      }}
      {...props}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(${tint}, 0.55) 50%, transparent 100%)`,
        }}
      />
      <div className="relative">{children}</div>
    </MotionTag>
  );
}
