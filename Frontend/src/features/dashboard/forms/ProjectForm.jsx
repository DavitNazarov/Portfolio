import { FormField } from "@/components/dashboard/FormField";
import DashboardError from "@/features/dashboard/components/DashboardError";
import DashboardFormActions from "@/features/dashboard/components/DashboardFormActions";

export default function ProjectForm({ editing, error, form, onCancel, onSubmit, setForm }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField
        label="Name"
        placeholder="Project name"
        value={form.name}
        onChange={(value) => setForm((current) => ({ ...current, name: value }))}
        required
      />
      <FormField
        label="Description"
        placeholder="Short description"
        value={form.description}
        onChange={(value) => setForm((current) => ({ ...current, description: value }))}
        rows={3}
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Year"
          type="number"
          placeholder="2024"
          value={form.year}
          onChange={(value) => setForm((current) => ({ ...current, year: value }))}
          required
        />
        <FormField
          label="Technologies"
          placeholder="React, Node, MongoDB"
          value={form.technologies}
          onChange={(value) => setForm((current) => ({ ...current, technologies: value }))}
          wrapperClassName="sm:col-span-2 sm:col-start-1"
        />
      </div>
      <FormField
        label="GitHub link"
        placeholder="https://github.com/..."
        value={form.githubLink}
        onChange={(value) => setForm((current) => ({ ...current, githubLink: value }))}
        required
      />
      <FormField
        label="Live link"
        placeholder="https://..."
        value={form.liveLink}
        onChange={(value) => setForm((current) => ({ ...current, liveLink: value }))}
        required
      />
      <DashboardError message={error} />
      <DashboardFormActions editing={editing} onCancel={onCancel} />
    </form>
  );
}
