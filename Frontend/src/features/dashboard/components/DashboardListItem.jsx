import { cn } from "@/lib/utils";
import DashboardItemActions from "@/features/dashboard/components/DashboardItemActions";

export default function DashboardListItem({ active, children, onEdit, onRemove }) {
  return (
    <li
      className={cn(
        "flex items-center justify-between gap-4 p-4 rounded-xl border bg-card/30 backdrop-blur-sm",
        active ? "border-ring ring-2 ring-ring/30" : "border-border hover:border-muted-foreground/40",
        "transition-all duration-200"
      )}
    >
      <div className="min-w-0 flex-1">{children}</div>
      <DashboardItemActions onEdit={onEdit} onRemove={onRemove} />
    </li>
  );
}
