import { Plus, Pencil, Trash2, Loader2, FolderKanban } from "lucide-react";
import { api } from "@/lib/api";
import { API_ROUTES, ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { parseCommaList } from "@/lib/utils";
import { useDashboardList } from "@/hooks/useDashboardList";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Modal } from "@/components/dashboard/Modal";
import { FormField } from "@/components/dashboard/FormField";

const EMPTY_PROJECT = {
  name: "",
  description: "",
  year: "",
  githubLink: "",
  liveLink: "",
  technologies: "",
};

function formFromProject(p) {
  return {
    name: p.name,
    description: p.description,
    year: p.year,
    githubLink: p.githubLink,
    liveLink: p.liveLink,
    technologies: Array.isArray(p.technologies) ? p.technologies.join(", ") : p.technologies || "",
  };
}

function buildPayload(form) {
  return {
    ...form,
    year: Number(form.year),
    technologies: parseCommaList(form.technologies),
  };
}

export default function DashboardProjects() {
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
    listPath: API_ROUTES.PROJECTS.ALL,
    dataKey: "projects",
    emptyForm: EMPTY_PROJECT,
    formFromItem: formFromProject,
    buildPayload,
    createPath: API_ROUTES.PROJECTS.CREATE,
    updatePath: API_ROUTES.PROJECTS.UPDATE,
    deletePath: API_ROUTES.PROJECTS.DELETE,
    confirmMessage: "Delete this project?",
  });

  return (
    <DashboardLayout
      title="Projects"
      subtitle="Manage portfolio projects"
      icon={FolderKanban}
      iconColor="bg-chart-1/20"
      action={
        <button
          onClick={openCreate}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium",
            "hover:opacity-95 active:scale-[0.98] transition-all"
          )}
        >
          <Plus className="w-4 h-4" />
          New project
        </button>
      }
    >
      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit project" : "New project"}
      >
        <form onSubmit={save} className="space-y-4">
          <FormField
            label="Name"
            placeholder="Project name"
            value={form.name}
            onChange={(v) => setForm((f) => ({ ...f, name: v }))}
            required
          />
          <FormField
            label="Description"
            placeholder="Short description"
            value={form.description}
            onChange={(v) => setForm((f) => ({ ...f, description: v }))}
            rows={3}
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Year"
              type="number"
              placeholder="2024"
              value={form.year}
              onChange={(v) => setForm((f) => ({ ...f, year: v }))}
              required
            />
            <FormField
              label="Technologies"
              placeholder="React, Node, MongoDB"
              value={form.technologies}
              onChange={(v) => setForm((f) => ({ ...f, technologies: v }))}
              wrapperClassName="sm:col-span-2 sm:col-start-1"
            />
          </div>
          <FormField
            label="GitHub link"
            placeholder="https://github.com/..."
            value={form.githubLink}
            onChange={(v) => setForm((f) => ({ ...f, githubLink: v }))}
            required
          />
          <FormField
            label="Live link"
            placeholder="https://..."
            value={form.liveLink}
            onChange={(v) => setForm((f) => ({ ...f, liveLink: v }))}
            required
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
          {list.map((p) => (
            <li
              key={p._id}
              className={cn(
                "flex items-center justify-between gap-4 p-4 rounded-xl border bg-card/30 backdrop-blur-sm",
                editing === p._id ? "border-ring ring-2 ring-ring/30" : "border-border hover:border-muted-foreground/40",
                "transition-all duration-200"
              )}
            >
              <div className="min-w-0 flex-1">
                <span className="font-medium text-foreground">{p.name}</span>
                {p.year && (
                  <span className="ml-2 text-xs text-muted-foreground font-mono">({p.year})</span>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openEdit(p)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  aria-label="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => remove(p._id)}
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
