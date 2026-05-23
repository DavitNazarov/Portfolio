import DashboardListItem from "@/features/dashboard/components/DashboardListItem";

export default function AwardListItem({ active, item, onEdit, onRemove }) {
  return (
    <DashboardListItem active={active} onEdit={() => onEdit(item)} onRemove={() => onRemove(item._id)}>
      <span className="font-medium text-foreground">{item.title}</span>
      <span className="text-muted-foreground"> · </span>
      <span className="text-foreground">{item.category}</span>
      {item.medals?.length > 0 && (
        <span className="ml-2 text-xs text-muted-foreground font-mono">
          ({item.medals.join(", ")})
        </span>
      )}
      {item.period && (
        <span className="ml-2 text-xs text-muted-foreground font-mono">{item.period}</span>
      )}
    </DashboardListItem>
  );
}
