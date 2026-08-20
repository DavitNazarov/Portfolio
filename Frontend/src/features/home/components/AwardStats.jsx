import { motion } from "framer-motion";
import { Medal } from "lucide-react";
import { AWARD_TINT } from "@/features/home/constants/awards";
import { EASE, FADE_UP } from "@/features/home/constants/motion";

function Tile({ entry, share, index, active }) {
  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-2xl border px-3.5 py-3.5 sm:px-4"
      style={{
        borderColor: `rgba(${entry.tint}, 0.22)`,
        background: `linear-gradient(155deg, rgba(${entry.tint}, 0.1) 0%, rgba(255,255,255,0.02) 55%, rgba(0,0,0,0.18) 100%)`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(${entry.tint}, 0.6), transparent)`,
        }}
      />

      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{
            backgroundColor: `rgb(${entry.tint})`,
            boxShadow: `0 0 10px rgba(${entry.tint}, 0.55)`,
          }}
        />
        <span
          className="text-[10px] font-mono uppercase tracking-[0.2em]"
          style={{ color: `rgba(${entry.tint}, 0.95)` }}
        >
          {entry.label}
        </span>
      </div>

      <motion.p
        className="mt-2.5 text-3xl font-light leading-none tracking-tight text-foreground tabular-nums sm:text-[2.15rem]"
        initial={{ opacity: 0, y: 8 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE, delay: 0.1 + index * 0.08 }}
      >
        {entry.count}
      </motion.p>

      <div className="mt-3 h-[2px] overflow-hidden rounded-full bg-white/[0.07]">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: `rgba(${entry.tint}, 0.85)` }}
          initial={{ width: 0 }}
          animate={active ? { width: `${share}%` } : { width: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.25 + index * 0.08 }}
        />
      </div>
    </div>
  );
}

function Summary({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-2">
      <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-2">{label}</span>
      <span className="text-sm font-light text-foreground tabular-nums">{value}</span>
    </div>
  );
}

export default function AwardStats({ stats, active }) {
  const { podium, others, podiumTotal, otherTotal, entries, firstYear, lastYear } = stats;

  if (entries === 0) return null;

  const peak = Math.max(...podium.map((entry) => entry.count), 1);
  const span =
    firstYear && lastYear
      ? firstYear === lastYear
        ? `${firstYear}`
        : `${firstYear}–${lastYear}`
      : "—";

  return (
    <motion.div variants={FADE_UP} className="mb-8 sm:mb-10">
      <div className="mb-4 flex items-center gap-2.5">
        <Medal className="h-3.5 w-3.5" style={{ color: `rgba(${AWARD_TINT}, 0.9)` }} aria-hidden />
        <h4 className="text-[10px] font-mono uppercase tracking-[0.28em] text-ink-2">Medal table</h4>
        <span className="h-px flex-1 bg-white/[0.08]" aria-hidden />
      </div>

      <div className="grid gap-3 sm:gap-3.5 lg:grid-cols-[1.5fr_1fr]">
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {podium.map((entry, index) => (
            <Tile
              key={entry.medal}
              entry={entry}
              index={index}
              active={active}
              share={(entry.count / peak) * 100}
            />
          ))}
        </div>

        <div className="rounded-2xl border border-white/[0.09] bg-white/[0.025] px-4 py-2.5 backdrop-blur-sm">
          <Summary label="Podiums" value={podiumTotal} />
          <div className="h-px bg-white/[0.06]" aria-hidden />
          <Summary label="Total records" value={entries} />
          <div className="h-px bg-white/[0.06]" aria-hidden />
          <Summary label="Seasons" value={span} />
        </div>
      </div>

      {others.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-3">
            Also {otherTotal}
          </span>
          {others.map((entry) => (
            <span
              key={entry.medal}
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-mono"
              style={{
                borderColor: `rgba(${entry.tint}, 0.3)`,
                backgroundColor: `rgba(${entry.tint}, 0.1)`,
                color: `rgba(${entry.tint}, 0.95)`,
              }}
            >
              <span className="tabular-nums">{entry.count}</span>
              {entry.label}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
