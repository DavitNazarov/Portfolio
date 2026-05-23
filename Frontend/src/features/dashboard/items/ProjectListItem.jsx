import DashboardListItem from "@/features/dashboard/components/DashboardListItem";

export default function ProjectListItem({ active, item, onEdit, onRemove }) {
  return (
    <DashboardListItem active={active} onEdit={() => onEdit(item)} onRemove={() => onRemove(item._id)}>
      <span className="font-medium text-foreground">{item.name}</span>
      {item.year && (
        <span className="ml-2 text-xs text-muted-foreground font-mono">({item.year})</span>
      )}
    </DashboardListItem>
  );
}
