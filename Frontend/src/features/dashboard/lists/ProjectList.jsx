import ProjectListItem from "@/features/dashboard/items/ProjectListItem";

export default function ProjectList({ editingId, items, onEdit, onRemove }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <ProjectListItem
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
