import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { API_ROUTES, ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { ArrowLeft, Plus, Pencil, Trash2, Loader2, FolderKanban, X } from "lucide-react";

const emptyProject = {
  name: "",
  description: "",
  year: "",
  githubLink: "",
  liveLink: "",
  technologies: "",
};

const inputClass =
  "w-full px-4 py-2.5 rounded-xl border border-border bg-background/80 placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow";

export default function DashboardProjects() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const [modalOpen, setModalOpen] = useState(false);

  async function load() {
    try {
      const data = await api(API_ROUTES.PROJECTS.ALL);
      setList(data.projects || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyProject);
    setModalOpen(true);
  }

  function openEdit(p) {
    setEditing(p._id);
    setForm({
      name: p.name,
      description: p.description,
      year: p.year,
      githubLink: p.githubLink,
      liveLink: p.liveLink,
      technologies: Array.isArray(p.technologies) ? p.technologies.join(", ") : p.technologies || "",
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setForm(emptyProject);
    setEditing(null);
  }

  async function save(e) {
    e.preventDefault();
    setError("");
    const payload = {
      ...form,
      year: Number(form.year),
      technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (editing) {
        await api(API_ROUTES.PROJECTS.UPDATE(editing), { method: "PATCH", body: payload });
      } else {
        await api(API_ROUTES.PROJECTS.CREATE, { method: "POST", body: payload });
      }
      closeModal();
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    if (!confirm("Delete this project?")) return;
    setError("");
    try {
      await api(API_ROUTES.PROJECTS.DELETE(id), { method: "DELETE" });
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-gradient-to-b from-muted/30 to-transparent">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <Link
            to={ROUTES.DASHBOARD}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-chart-1/20 text-foreground">
                <FolderKanban className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight">Projects</h1>
                <p className="text-sm text-muted-foreground">Manage portfolio projects</p>
              </div>
            </div>
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
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {modalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <div
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">{editing ? "Edit project" : "New project"}</h2>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={save} className="space-y-4">
                <label className="block space-y-1.5">
                  <span className="text-sm font-medium text-muted-foreground">Name</span>
                  <input
                    className={inputClass}
                    placeholder="Project name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                  />
                </label>
                <label className="block space-y-1.5">
                  <span className="text-sm font-medium text-muted-foreground">Description</span>
                  <textarea
                    className={inputClass + " min-h-[80px] resize-y"}
                    placeholder="Short description"
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    rows={3}
                    required
                  />
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium text-muted-foreground">Year</span>
                    <input
                      className={inputClass}
                      type="number"
                      placeholder="2024"
                      value={form.year}
                      onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                      required
                    />
                  </label>
                  <label className="block space-y-1.5 sm:col-span-2 sm:col-start-1">
                    <span className="text-sm font-medium text-muted-foreground">Technologies</span>
                    <input
                      className={inputClass}
                      placeholder="React, Node, MongoDB"
                      value={form.technologies}
                      onChange={(e) => setForm((f) => ({ ...f, technologies: e.target.value }))}
                    />
                  </label>
                </div>
                <label className="block space-y-1.5">
                  <span className="text-sm font-medium text-muted-foreground">GitHub link</span>
                  <input
                    className={inputClass}
                    placeholder="https://github.com/..."
                    value={form.githubLink}
                    onChange={(e) => setForm((f) => ({ ...f, githubLink: e.target.value }))}
                    required
                  />
                </label>
                <label className="block space-y-1.5">
                  <span className="text-sm font-medium text-muted-foreground">Live link</span>
                  <input
                    className={inputClass}
                    placeholder="https://..."
                    value={form.liveLink}
                    onChange={(e) => setForm((f) => ({ ...f, liveLink: e.target.value }))}
                    required
                  />
                </label>
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
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
            </div>
          </div>
        )}

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
      </div>
    </div>
  );
}
