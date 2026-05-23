import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CARD_VARIANT } from "@/features/home/constants/motion";

export default function StackCard({ group, index, total, totalTools }) {
  const Icon = group.icon;
  const [chipsReady, setChipsReady] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.4 });
  const spotlight = useTransform(
    [springX, springY],
    ([x, y]) =>
      `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(${group.tint}, 0.22) 0%, transparent 45%)`
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

  const layoutClass = group.featured
    ? "sm:col-span-2 lg:col-span-6"
    : total === 5
    ? "lg:col-span-3"
    : total === 6
    ? "lg:col-span-3"
    : "lg:col-span-3";

  const toolShare = totalTools > 0 ? Math.min(1, group.items.length / totalTools) : 0;

  return (
    <motion.article
      variants={CARD_VARIANT}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      onViewportEnter={() => setTimeout(() => setChipsReady(true), 120 + index * 70)}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 24 } }}
      className={`group relative overflow-hidden rounded-[1.4rem] border backdrop-blur-[2px] p-5 sm:p-6 ${layoutClass}`}
      style={{
        borderColor: `rgba(${group.tint}, ${group.featured ? "0.2" : "0.14"})`,
        background: group.featured
          ? `linear-gradient(135deg, rgba(${group.tint}, 0.14) 0%, rgba(255,255,255,0.025) 40%, rgba(0,0,0,0.22) 100%)`
          : `linear-gradient(150deg, rgba(${group.tint}, 0.09) 0%, rgba(255,255,255,0.02) 45%, rgba(0,0,0,0.18) 100%)`,
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
          background: `linear-gradient(90deg, transparent 0%, rgba(${group.tint}, 0.5) 50%, transparent 100%)`,
        }}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3.5">
            <div className="relative shrink-0">
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl blur-xl opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `rgba(${group.tint}, 0.35)` }}
              />
              <div
                className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border"
                style={{
                  borderColor: `rgba(${group.tint}, 0.28)`,
                  backgroundColor: `rgba(${group.tint}, 0.14)`,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <Icon
                  className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                  style={{ color: `rgb(${group.tint})` }}
                />
              </div>
            </div>

            <div className="min-w-0">
              <p
                className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.24em] leading-none"
                style={{ color: `rgba(${group.tint}, 0.75)` }}
              >
                {String(index + 1).padStart(2, "0")} · Lane
              </p>
              <h4 className="mt-1.5 text-[15px] sm:text-base font-medium text-foreground/95 leading-tight">
                {group.title}
              </h4>
              <p className="mt-1 text-[11px] font-mono tracking-[0.06em] text-muted-foreground/45">
                {group.tagline}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <span
              className="text-[10px] font-mono uppercase tracking-[0.18em] whitespace-nowrap"
              style={{ color: `rgba(${group.tint}, 0.85)` }}
            >
              {group.items.length}
              <span className="text-muted-foreground/35">/{totalTools}</span>
            </span>
            <ArrowUpRight
              className="h-3.5 w-3.5 text-muted-foreground/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              style={{ color: `rgba(${group.tint}, 0.55)` }}
            />
          </div>
        </div>

        <p
          className={`mt-4 text-[13px] sm:text-[13.5px] leading-6 text-muted-foreground/72 ${
            group.featured ? "max-w-lg" : ""
          }`}
        >
          {group.description}
        </p>

        <div className="mt-4 mb-1 flex items-center gap-2.5">
          <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ backgroundColor: `rgba(${group.tint}, 0.7)` }}
              initial={{ width: 0 }}
              animate={chipsReady ? { width: `${toolShare * 100}%` } : { width: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            />
          </div>
          <span className="text-[9.5px] font-mono tracking-[0.12em] text-muted-foreground/35 tabular-nums">
            {Math.round(toolShare * 100)}%
          </span>
        </div>

        <ul className="mt-4 flex flex-wrap gap-1.5 list-none p-0 m-0">
          {group.items.map((name, itemIndex) => (
            <motion.li
              key={name}
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={chipsReady ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 22,
                delay: itemIndex * 0.04,
              }}
            >
              <motion.span
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11.5px] sm:text-[12.5px] text-foreground/88 font-normal select-none transition-colors duration-200 cursor-default"
                style={{
                  borderColor: `rgba(${group.tint}, ${
                    group.featured && itemIndex < 3 ? "0.32" : "0.18"
                  })`,
                  backgroundColor: `rgba(${group.tint}, ${
                    group.featured && itemIndex < 3 ? "0.14" : "0.07"
                  })`,
                }}
              >
                {name}
              </motion.span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
