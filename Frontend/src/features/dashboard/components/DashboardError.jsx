export default function DashboardError({ message }) {
  if (!message) return null;

  return (
    <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3">
      <p className="text-sm text-destructive-foreground">{message}</p>
    </div>
  );
}
