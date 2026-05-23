export default function DashboardFormActions({ cancelLabel = "Cancel", editing, onCancel }) {
  return (
    <div className="flex gap-3 pt-2">
      <button
        type="submit"
        className="px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-95 transition-opacity"
      >
        {editing ? "Update" : "Create"}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="px-5 py-2.5 rounded-xl border border-border text-sm hover:bg-muted/50 transition-colors"
      >
        {cancelLabel}
      </button>
    </div>
  );
}
