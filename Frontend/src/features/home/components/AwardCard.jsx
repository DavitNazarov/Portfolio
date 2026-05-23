import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Trophy } from "lucide-react";
import { AWARD_CARD_VARIANT } from "@/features/home/constants/motion";
import { AWARD_TINT, MEDAL_META } from "@/features/home/constants/awards";

export default function AwardCard({ award, index }) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.4 });
  const spotlight = useTransform(
    [springX, springY],
    ([x, y]) =>
      `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(${AWARD_TINT}, 0.18) 0%, transparent 50%)`
  );

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width);
    mouseY.set((event.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.article
      variants={AWARD_CARD_VARIANT}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 24 } }}
      className="group relative overflow-hidden rounded-[1.4rem] border backdrop-blur-[2px] p-5 sm:p-6"
      style={{
        borderColor: `rgba(${AWARD_TINT}, 0.18)`,
        background: `linear-gradient(150deg, rgba(${AWARD_TINT}, 0.09) 0%, rgba(255,255,255,0.02) 45%, rgba(0,0,0,0.18) 100%)`,
      }}
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
          background: `linear-gradient(90deg, transparent 0%, rgba(${AWARD_TINT}, 0.5) 50%, transparent 100%)`,
        }}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="relative shrink-0">
            <div
              aria-hidden
              className="absolute inset-0 rounded-2xl blur-xl opacity-55 transition-opacity duration-500 group-hover:opacity-90"
              style={{ background: `rgba(${AWARD_TINT}, 0.35)` }}
            />
            <div
              className="relative flex h-10 w-10 items-center justify-center rounded-2xl border"
              style={{
                borderColor: `rgba(${AWARD_TINT}, 0.28)`,
                backgroundColor: `rgba(${AWARD_TINT}, 0.14)`,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <Trophy className="h-4 w-4" style={{ color: `rgb(${AWARD_TINT})` }} />
            </div>
          </div>
          <span
            className="text-[10px] font-mono uppercase tracking-[0.24em] mt-1"
            style={{ color: `rgba(${AWARD_TINT}, 0.5)` }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h4 className="text-[15px] sm:text-base font-medium text-foreground/95 leading-snug">
          {award.title}
        </h4>

        <p className="mt-1 text-[13px] text-muted-foreground/60 leading-snug">
          {award.category}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {(award.medals ?? []).map((medal) => {
            const meta = MEDAL_META[medal] ?? { tint: "148, 163, 184", label: medal };
            return (
              <span
                key={medal}
                className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11.5px] font-medium"
                style={{
                  borderColor: `rgba(${meta.tint}, 0.35)`,
                  backgroundColor: `rgba(${meta.tint}, 0.12)`,
                  color: `rgb(${meta.tint})`,
                }}
              >
                {meta.label}
              </span>
            );
          })}
        </div>

        {award.period && (
          <p className="mt-auto pt-4 text-[11px] font-mono text-muted-foreground/45 tracking-wide tabular-nums">
            {award.period}
          </p>
        )}
      </div>
    </motion.article>
  );
}
