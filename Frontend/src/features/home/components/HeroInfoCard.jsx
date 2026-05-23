import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function HeroInfoCard({
  eyebrow,
  tint,
  icon: Icon,
  loading,
  title,
  subtitle,
  period,
  isLive,
  jumpTo,
  emptyLabel,
}) {
  const handleJump = () => {
    if (!jumpTo) return;
    document.getElementById(jumpTo)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const hasData = !loading && Boolean(title);

  return (
    <SpotlightCard
      tint={tint}
      className="p-5 sm:p-6 cursor-pointer"
      onClick={handleJump}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleJump();
        }
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div
              aria-hidden
              className="absolute inset-0 rounded-xl blur-lg opacity-55 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `rgba(${tint}, 0.42)` }}
            />
            <div
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border"
              style={{
                borderColor: `rgba(${tint}, 0.3)`,
                backgroundColor: `rgba(${tint}, 0.13)`,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <Icon className="h-4 w-4" style={{ color: `rgb(${tint})` }} />
            </div>
          </div>

          <p
            className="text-[10px] font-mono uppercase tracking-[0.32em]"
            style={{ color: `rgba(${tint}, 0.82)` }}
          >
            {eyebrow}
          </p>
        </div>

        {isLive && !loading && (
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 22 }}
            className="flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400/90"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Live
          </motion.div>
        )}
      </div>

      {loading ? (
        <div className="space-y-2 animate-pulse">
          <div className="h-5 w-4/5 bg-white/8 rounded" />
          <div className="h-4 w-3/5 bg-white/5 rounded" />
          <div className="h-3 w-1/3 bg-white/4 rounded mt-5" />
        </div>
      ) : hasData ? (
        <>
          <h3 className="text-[15px] sm:text-base font-medium text-foreground/95 leading-snug">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground/65 leading-snug">{subtitle}</p>

          <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
            <p className="text-[11px] font-mono text-muted-foreground/50 tabular-nums tracking-wide">
              {period}
            </p>
            <div
              className="flex items-center gap-1 text-[9.5px] font-mono uppercase tracking-[0.24em] transition-all duration-300 group-hover:translate-x-0.5"
              style={{ color: `rgba(${tint}, 0.75)` }}
            >
              View
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground/50 font-serif italic">{emptyLabel}</p>
      )}
    </SpotlightCard>
  );
}
