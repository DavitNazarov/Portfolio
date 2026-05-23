export default function TechStackSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-10 sm:mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-10 bg-white/12" />
          <div className="h-3 w-28 rounded-full bg-white/6" />
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <div className="space-y-4">
            <div className="h-8 w-64 rounded-xl bg-white/8" />
            <div className="space-y-2">
              <div className="h-4 w-full max-w-md rounded bg-white/5" />
              <div className="h-4 w-5/6 max-w-sm rounded bg-white/5" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-2xl border border-white/6 bg-white/[0.02] px-3 py-3.5">
                <div className="h-5 w-8 rounded bg-white/8" />
                <div className="mt-2 h-3 w-12 rounded bg-white/5" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-3.5 sm:grid-cols-2 lg:grid-cols-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`rounded-[1.4rem] border border-white/6 bg-white/[0.02] p-5 sm:p-6 ${
              index === 0 ? "sm:col-span-2 lg:col-span-6" : "lg:col-span-3"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="h-11 w-11 rounded-2xl bg-white/7" />
                <div className="space-y-2">
                  <div className="h-2.5 w-20 rounded bg-white/5" />
                  <div className="h-4 w-36 rounded bg-white/8" />
                  <div className="h-2.5 w-28 rounded bg-white/4" />
                </div>
              </div>
              <div className="h-3 w-12 rounded bg-white/6" />
            </div>
            <div className="mt-4 h-3 w-full max-w-sm rounded bg-white/5" />
            <div className="mt-4 h-[2px] w-full rounded-full bg-white/6" />
            <div className="mt-4 flex flex-wrap gap-1.5">
              {Array.from({ length: index === 0 ? 7 : 4 }).map((__, chipIndex) => (
                <div
                  key={chipIndex}
                  className="h-7 rounded-full bg-white/6"
                  style={{ width: `${64 + chipIndex * 10}px` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
