import { FormField } from "@/components/dashboard/FormField";
import DashboardError from "@/features/dashboard/components/DashboardError";
import DashboardFormActions from "@/features/dashboard/components/DashboardFormActions";

export default function ExperienceForm({ editing, error, form, onCancel, onSubmit, setForm }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Role"
          placeholder="Senior Developer"
          value={form.role}
          onChange={(value) => setForm((current) => ({ ...current, role: value }))}
          required
        />
        <FormField
          label="Company"
          placeholder="Company name"
          value={form.company}
          onChange={(value) => setForm((current) => ({ ...current, company: value }))}
          required
        />
      </div>
      <FormField
        label="Period"
        placeholder="Jan 2025 – Mar 2026 or Jan 2026 – Present"
        value={form.period}
        onChange={(value) => setForm((current) => ({ ...current, period: value }))}
        required
      />
      <p className="-mt-2 text-xs text-ink-1">
        Add “Present” to mark this as the current role.
      </p>
      <FormField
        label="Description"
        placeholder="What you did there"
        value={form.description}
        onChange={(value) => setForm((current) => ({ ...current, description: value }))}
        rows={3}
        required
      />
      <FormField
        label="Tech stack"
        placeholder="React, TypeScript, Node"
        value={form.tech}
        onChange={(value) => setForm((current) => ({ ...current, tech: value }))}
      />
      <DashboardError message={error} />
      <DashboardFormActions editing={editing} onCancel={onCancel} />
    </form>
  );
}
