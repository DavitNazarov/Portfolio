import { motion } from "framer-motion";
import { RotateCcw, Inbox, CloudOff } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

/**
 * The public-site counterpart to the dashboard's empty/error panels.
 *
 * Without this a failed fetch rendered a section heading over blank space, so a
 * visitor saw an empty CV with no indication anything had gone wrong.
 */
export default function SectionState({ variant = "empty", tint = "148, 163, 184", label, message, onRetry }) {
  const isError = variant === "error";
  const Icon = isError ? CloudOff : Inbox;

  return (
    <motion.div
      role={isError ? "alert" : "status"}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex flex-col items-start gap-4 rounded-[1.4rem] border px-5 py-7 sm:flex-row sm:items-center sm:gap-5 sm:px-7"
      style={{
        borderColor: `rgba(${tint}, 0.16)`,
        background: `linear-gradient(150deg, rgba(${tint}, 0.06) 0%, rgba(255,255,255,0.015) 45%, rgba(0,0,0,0.14) 100%)`,
      }}
    >
      <div
        aria-hidden
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border"
        style={{
          borderColor: `rgba(${tint}, 0.26)`,
          backgroundColor: `rgba(${tint}, 0.12)`,
        }}
      >
        <Icon className="h-[18px] w-[18px]" style={{ color: `rgb(${tint})` }} />
      </div>

      <div className="min-w-0 flex-1">
        <p
          className="text-[10px] font-mono uppercase tracking-[0.26em]"
          style={{ color: `rgba(${tint}, 0.85)` }}
        >
          {label}
        </p>
        <p className="mt-2 text-[13.5px] leading-6 text-ink-1">{message}</p>
      </div>

      {isError && onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-mono transition-colors duration-200 hover:bg-white/[0.06]"
          style={{
            borderColor: `rgba(${tint}, 0.32)`,
            color: `rgba(${tint}, 0.95)`,
          }}
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden />
          Try again
        </button>
      )}
    </motion.div>
  );
}
