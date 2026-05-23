export default function EducationSkeletonCard() {
  return (
    <div className="animate-pulse rounded-[1.4rem] border border-white/6 bg-white/[0.02] p-5 sm:p-6 space-y-4">
      <div className="flex justify-between">
        <div className="h-10 w-10 rounded-2xl bg-white/7" />
        <div className="h-5 w-16 rounded-full bg-white/4" />
      </div>
      <div className="h-2.5 w-24 rounded bg-white/5" />
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-white/8" />
        <div className="h-4 w-3/4 rounded bg-white/8" />
        <div className="h-3 w-2/3 rounded bg-white/4" />
      </div>
      <div className="h-3.5 w-28 rounded bg-white/4" />
    </div>
  );
}
