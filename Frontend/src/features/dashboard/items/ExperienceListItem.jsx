import { isCurrentPeriod } from "@/lib/utils";
import DashboardListItem from "@/features/dashboard/components/DashboardListItem";

export default function ExperienceListItem({ active, item, onEdit, onRemove }) {
  return (
    <DashboardListItem active={active} onEdit={() => onEdit(item)} onRemove={() => onRemove(item._id)}>
      <span className="font-medium text-foreground">{item.role}</span>
      <span className="text-muted-foreground"> @ </span>
      <span className="text-foreground">{item.company}</span>
      {item.period && (
        <span className="ml-2 text-xs text-muted-foreground font-mono">({item.period})</span>
      )}
      {isCurrentPeriod(item.period) && (
        <span className="ml-2 text-xs text-muted-foreground italic">current</span>
      )}
    </DashboardListItem>
  );
}
