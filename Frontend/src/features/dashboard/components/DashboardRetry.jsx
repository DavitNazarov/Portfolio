/**
 * Shown when the list could not be loaded. Deliberately distinct from the
 * empty state — rendering "nothing here yet" after a failed fetch invites
 * re-creating records that already exist.
 */
export default function DashboardRetry({ onRetry }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/20 py-12 text-center">
      <p className="text-sm text-muted-foreground">
        Could not load this list. Nothing has been changed.
      </p>
      <button
        onClick={onRetry}
        className="mt-3 text-sm font-medium text-foreground hover:underline"
      >
        Try again
      </button>
    </div>
  );
}
