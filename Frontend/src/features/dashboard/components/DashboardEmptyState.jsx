export default function DashboardEmptyState({ actionLabel, message, onAction }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/20 py-12 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
      <button onClick={onAction} className="mt-3 text-sm font-medium text-foreground hover:underline">
        {actionLabel}
      </button>
    </div>
  );
}
