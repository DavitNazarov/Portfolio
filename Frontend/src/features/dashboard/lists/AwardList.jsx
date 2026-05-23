import AwardListItem from "@/features/dashboard/items/AwardListItem";

export default function AwardList({ editingId, items, onEdit, onRemove }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <AwardListItem
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
