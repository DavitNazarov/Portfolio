import { Pencil, Trash2 } from "lucide-react";

export default function DashboardItemActions({ onEdit, onRemove }) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <button
        onClick={onEdit}
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        aria-label="Edit"
      >
        <Pencil className="w-4 h-4" />
      </button>
      <button
        onClick={onRemove}
        className="rounded-lg p-2 text-destructive-foreground transition-colors hover:bg-destructive/20"
        aria-label="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
