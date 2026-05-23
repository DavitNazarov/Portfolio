import ExperienceListItem from "@/features/dashboard/items/ExperienceListItem";

export default function ExperienceList({ editingId, items, onEdit, onRemove }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <ExperienceListItem
          key={item._id}
          active={editingId === item._id}
          item={item}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}
