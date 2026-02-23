import { Plus, Pencil, Trash2, Loader2, Briefcase } from "lucide-react";
import { API_ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { parseCommaList } from "@/lib/utils";
import { useDashboardList } from "@/hooks/useDashboardList";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Modal } from "@/components/dashboard/Modal";
import { FormField } from "@/components/dashboard/FormField";

const EMPTY_EXP = { role: "", company: "", period: "", description: "", tech: "" };

function formFromExperience(e) {
  return {
    role: e.role,
    company: e.company,
    period: e.period,
    description: e.description,
    tech: Array.isArray(e.tech) ? e.tech.join(", ") : e.tech || "",
  };
}

function buildPayload(form) {
  return { ...form, tech: parseCommaList(form.tech) };
}

export default function DashboardExperience() {
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
    listPath: API_ROUTES.EXPERIENCE.ALL,
    dataKey: "experiences",
    emptyForm: EMPTY_EXP,
    formFromItem: formFromExperience,
    buildPayload,
    createPath: API_ROUTES.EXPERIENCE.CREATE,
    updatePath: API_ROUTES.EXPERIENCE.UPDATE,
    deletePath: API_ROUTES.EXPERIENCE.DELETE,
    confirmMessage: "Delete this experience?",
  });

  return (
    <DashboardLayout
      title="Experience"
      subtitle="Manage work history"
      icon={Briefcase}
      iconColor="bg-chart-3/20"
      action={
        <button
          onClick={openCreate}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium",
            "hover:opacity-95 active:scale-[0.98] transition-all"
          )}
        >
          <Plus className="w-4 h-4" />
          New experience
        </button>
      }
    >
      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit experience" : "New experience"}
      >
        <form onSubmit={save} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Role"
              placeholder="Senior Developer"
              value={form.role}
              onChange={(v) => setForm((f) => ({ ...f, role: v }))}
              required
            />
            <FormField
              label="Company"
              placeholder="Company name"
              value={form.company}
              onChange={(v) => setForm((f) => ({ ...f, company: v }))}
              required
            />
          </div>
          <FormField
            label="Period"
            placeholder="2020 – 2023"
            value={form.period}
            onChange={(v) => setForm((f) => ({ ...f, period: v }))}
            required
          />
          <FormField
            label="Description"
            placeholder="What you did there"
            value={form.description}
            onChange={(v) => setForm((f) => ({ ...f, description: v }))}
            rows={3}
            required
          />
          <FormField
            label="Tech stack"
            placeholder="React, TypeScript, Node"
            value={form.tech}
            onChange={(v) => setForm((f) => ({ ...f, tech: v }))}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-95 transition-opacity"
            >
              {editing ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="px-5 py-2.5 rounded-xl border border-border text-sm hover:bg-muted/50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {error && !modalOpen && (
        <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <ul className="space-y-3">
          {list.map((e) => (
            <li
              key={e._id}
              className={cn(
                "flex items-center justify-between gap-4 p-4 rounded-xl border bg-card/30 backdrop-blur-sm",
                editing === e._id ? "border-ring ring-2 ring-ring/30" : "border-border hover:border-muted-foreground/40",
                "transition-all duration-200"
              )}
            >
              <div className="min-w-0 flex-1">
                <span className="font-medium text-foreground">{e.role}</span>
                <span className="text-muted-foreground"> @ </span>
                <span className="text-foreground">{e.company}</span>
                {e.period && (
                  <span className="ml-2 text-xs text-muted-foreground font-mono">({e.period})</span>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openEdit(e)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  aria-label="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => remove(e._id)}
                  className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
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
