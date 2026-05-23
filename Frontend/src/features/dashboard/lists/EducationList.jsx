import EducationListItem from "@/features/dashboard/items/EducationListItem";

export default function EducationList({ editingId, items, onEdit, onRemove }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <EducationListItem
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
