import { Plus, Pencil, Trash2, Loader2, Trophy } from "lucide-react";
import { API_ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { useDashboardList } from "@/hooks/useDashboardList";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Modal } from "@/components/dashboard/Modal";
import { INPUT_CLASS_SM } from "@/constants/ui";

const MEDAL_OPTIONS = ["Gold", "Silver", "Bronze"];

const EMPTY_AWARD = { title: "", medals: [], category: "", period: "" };

function formFromAward(a) {
  return {
    title: a.title,
    medals: a.medals ?? [],
    category: a.category,
    period: a.period ?? "",
  };
}

function buildPayload(form) {
  return {
    title: form.title.trim(),
    medals: form.medals,
    category: form.category.trim(),
    period: form.period.trim(),
  };
}

function toggleMedal(medals, medal) {
  return medals.includes(medal)
    ? medals.filter((m) => m !== medal)
    : [...medals, medal];
}

export default function DashboardAwards() {
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
    listPath: API_ROUTES.AWARDS.ALL,
    dataKey: "awards",
    emptyForm: EMPTY_AWARD,
    formFromItem: formFromAward,
    buildPayload,
    createPath: API_ROUTES.AWARDS.CREATE,
    updatePath: API_ROUTES.AWARDS.UPDATE,
    deletePath: API_ROUTES.AWARDS.DELETE,
    confirmMessage: "Remove this award?",
  });

  return (
    <DashboardLayout
      title="Awards"
      subtitle="Competition results and achievements"
      icon={Trophy}
      iconColor="bg-yellow-500/20"
      action={
        <button
          onClick={openCreate}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium",
            "hover:opacity-95 active:scale-[0.98] transition-all"
          )}
        >
          <Plus className="w-4 h-4" />
          Add award
        </button>
      }
    >
      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit award" : "New award"}
      >
        <form onSubmit={save} className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Event / Tournament
            </span>
            <input
              className={INPUT_CLASS_SM}
              placeholder="e.g. 19th European Wushu Championships"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Category
            </span>
            <input
              className={INPUT_CLASS_SM}
              placeholder="e.g. 60 kg Light Sanda"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              required
            />
          </label>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Medals
            </span>
            <div className="flex gap-2 mt-1">
              {MEDAL_OPTIONS.map((medal) => {
                const active = form.medals.includes(medal);
                return (
                  <button
                    key={medal}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, medals: toggleMedal(f.medals, medal) }))}
                    className={cn(
                      "px-3 py-1.5 rounded-full border text-xs font-medium transition-all",
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-muted-foreground"
                    )}
                  >
                    {medal}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Period
            </span>
            <input
              className={INPUT_CLASS_SM}
              placeholder="e.g. May 2024  (optional)"
              value={form.period}
              onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))}
            />
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
          <p className="text-sm text-muted-foreground">No awards yet.</p>
          <button onClick={openCreate} className="mt-3 text-sm font-medium text-foreground hover:underline">
            Add your first award
          </button>
        </div>
      ) : (
        <ul className="space-y-2">
          {list.map((a) => (
            <li
              key={a._id}
              className={cn(
                "flex items-center justify-between gap-4 p-4 rounded-xl border bg-card/30",
                editing === a._id
                  ? "border-ring ring-2 ring-ring/20"
                  : "border-border hover:border-muted-foreground/30",
                "transition-all duration-200"
              )}
            >
              <div className="min-w-0 flex-1">
                <span className="font-medium text-foreground">{a.title}</span>
                <span className="text-muted-foreground"> · </span>
                <span className="text-foreground">{a.category}</span>
                {a.medals?.length > 0 && (
                  <span className="ml-2 text-xs text-muted-foreground font-mono">
                    ({a.medals.join(", ")})
                  </span>
                )}
                {a.period && (
                  <span className="ml-2 text-xs text-muted-foreground font-mono">{a.period}</span>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => openEdit(a)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  aria-label="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => remove(a._id)}
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
