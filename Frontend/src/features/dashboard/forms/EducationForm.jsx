import { FormField } from "@/components/dashboard/FormField";
import DashboardError from "@/features/dashboard/components/DashboardError";
import DashboardFormActions from "@/features/dashboard/components/DashboardFormActions";

export default function EducationForm({ editing, error, form, onCancel, onSubmit, setForm }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField
        label="Degree"
        placeholder="e.g. B.Sc. Computer Science"
        value={form.degree}
        onChange={(value) => setForm((current) => ({ ...current, degree: value }))}
        required
      />
      <FormField
        label="Institution"
        placeholder="University or school"
        value={form.institution}
        onChange={(value) => setForm((current) => ({ ...current, institution: value }))}
        required
      />
      <FormField
        label="Period"
        placeholder="2020 — 2024 or 2023 — Present"
        value={form.period}
        onChange={(value) => setForm((current) => ({ ...current, period: value }))}
        required
      />
      <p className="-mt-2 text-xs text-muted-foreground/60">
        Add “Present” to mark this as current.
      </p>
      <FormField
        label="Description"
        placeholder="Brief description"
        value={form.description}
        onChange={(value) => setForm((current) => ({ ...current, description: value }))}
        rows={2}
        required
      />
      <DashboardError message={error} />
      <DashboardFormActions editing={editing} onCancel={onCancel} />
    </form>
  );
}
