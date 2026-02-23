import { Plus, Pencil, Trash2, Loader2, GraduationCap } from "lucide-react";
import { API_ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { useDashboardList } from "@/hooks/useDashboardList";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Modal } from "@/components/dashboard/Modal";
import { INPUT_CLASS_SM } from "@/constants/ui";

const EMPTY_EDU = { degree: "", institution: "", period: "", description: "", present: false };

function formFromEducation(e) {
  return {
    degree: e.degree,
    institution: e.institution,
    period: e.period,
    description: e.description,
    present: !!e.present,
  };
}

function buildPayload(form) {
  return {
    degree: form.degree.trim(),
    institution: form.institution.trim(),
    period: form.period.trim(),
    description: form.description.trim(),
    present: !!form.present,
  };
}

export default function DashboardEducation() {
  const {
    list,
    loading,
    error,
    editing,
    form,
    setForm,
    modalOpen,
    openCreate,
    openEdit,
    closeModal,
    save,
    remove,
  } = useDashboardList({
    listPath: API_ROUTES.EDUCATION.PUBLIC,
    dataKey: "education",
    publicList: true,
    emptyForm: EMPTY_EDU,
    formFromItem: formFromEducation,
    buildPayload,
    createPath: API_ROUTES.EDUCATION.CREATE,
    updatePath: API_ROUTES.EDUCATION.UPDATE,
    deletePath: API_ROUTES.EDUCATION.DELETE,
    confirmMessage: "Remove this education entry?",
  });

  return (
    <DashboardLayout
      title="Education"
      subtitle="Degrees and institutions"
      icon={GraduationCap}
      iconColor="bg-chart-5/20"
      action={
        <button
          onClick={openCreate}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium",
            "hover:opacity-95 active:scale-[0.98] transition-all"
          )}
        >
          <Plus className="w-4 h-4" />
          Add entry
        </button>
      }
    >
      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit education" : "New education"}
      >
        <form onSubmit={save} className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Degree</span>
            <input
              className={INPUT_CLASS_SM}
              placeholder="e.g. B.Sc. Computer Science"
              value={form.degree}
              onChange={(e) => setForm((f) => ({ ...f, degree: e.target.value }))}
              required
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Institution</span>
            <input
              className={INPUT_CLASS_SM}
              placeholder="University or school"
              value={form.institution}
              onChange={(e) => setForm((f) => ({ ...f, institution: e.target.value }))}
              required
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Period</span>
            <input
              className={INPUT_CLASS_SM}
              placeholder="2020 — 2024 or 2023 — Present"
              value={form.period}
              onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))}
              required
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</span>
            <textarea
              className={INPUT_CLASS_SM + " min-h-[72px] resize-y"}
              placeholder="Brief description"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={2}
              required
            />
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.present}
              onChange={(e) => setForm((f) => ({ ...f, present: e.target.checked }))}
              className="w-4 h-4 rounded border-border text-foreground focus:ring-ring"
            />
            <span className="text-sm text-muted-foreground">Currently studying here</span>
          </label>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-95 transition-opacity"
            >
              {editing ? "Save" : "Add"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {error && !modalOpen && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : list.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-muted/20 py-12 text-center">
          <p className="text-sm text-muted-foreground">No education entries yet.</p>
          <button onClick={openCreate} className="mt-3 text-sm font-medium text-foreground hover:underline">
            Add your first entry
          </button>
        </div>
      ) : (
        <ul className="space-y-2">
          {list.map((e) => (
            <li
              key={e._id}
              className={cn(
                "flex items-center justify-between gap-4 p-4 rounded-xl border bg-card/30",
                editing === e._id ? "border-ring ring-2 ring-ring/20" : "border-border hover:border-muted-foreground/30",
                "transition-all duration-200"
              )}
            >
              <div className="min-w-0 flex-1">
                <span className="font-medium text-foreground">{e.degree}</span>
                <span className="text-muted-foreground"> · </span>
                <span className="text-foreground">{e.institution}</span>
                {e.period && (
                  <span className="ml-2 text-xs text-muted-foreground font-mono">({e.period})</span>
                )}
                {e.present && (
                  <span className="ml-2 text-xs text-muted-foreground italic">current</span>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => openEdit(e)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  aria-label="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => remove(e._id)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  aria-label="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </DashboardLayout>
  );
}
