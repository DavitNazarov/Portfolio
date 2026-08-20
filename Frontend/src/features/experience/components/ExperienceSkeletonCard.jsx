import { EXPERIENCE_TINT } from "@/features/experience/constants/experience";

export default function ExperienceSkeletonCard() {
  return (
    <div
      aria-hidden
      className="animate-pulse rounded-[1.4rem] border bg-white/[0.02] p-5 sm:p-7"
      style={{ borderColor: `rgba(${EXPERIENCE_TINT}, 0.12)` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="h-11 w-11 rounded-2xl bg-white/7" />
          <div className="space-y-2 pt-1">
            <div className="h-2.5 w-24 rounded bg-white/5" />
            <div className="h-5 w-48 rounded bg-white/8" />
            <div className="h-3.5 w-28 rounded bg-white/4" />
          </div>
        </div>
        <div className="h-6 w-28 rounded-full bg-white/5" />
      </div>
      <div className="mt-5 space-y-2">
        <div className="h-3.5 w-full rounded bg-white/4" />
        <div className="h-3.5 w-5/6 rounded bg-white/4" />
      </div>
      <div className="mt-5 flex gap-1.5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-6 rounded-full bg-white/5" style={{ width: `${56 + index * 14}px` }} />
        ))}
      </div>
    </div>
  );
}
