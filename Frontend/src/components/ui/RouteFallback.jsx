/**
 * Shown while a lazily-loaded route chunk arrives. Deliberately quiet — a
 * spinner that flashes for 80ms reads as jank, so this is just a held surface.
 */
export default function RouteFallback() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-screen items-center justify-center bg-background"
    >
      <div className="flex items-center gap-3">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/40" />
        <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-ink-2">
          Loading
        </span>
      </div>
    </div>
  );
}
