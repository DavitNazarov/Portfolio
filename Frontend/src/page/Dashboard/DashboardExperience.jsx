import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { API_ROUTES, ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { ArrowLeft, Plus, Pencil, Trash2, Loader2, Briefcase, X } from "lucide-react";

const emptyExp = { role: "", company: "", period: "", description: "", tech: "" };

const inputClass =
  "w-full px-4 py-2.5 rounded-xl border border-border bg-background/80 placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow";

export default function DashboardExperience() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyExp);
  const [modalOpen, setModalOpen] = useState(false);

  async function load() {
    try {
      const data = await api(API_ROUTES.EXPERIENCE.ALL);
      setList(data.experiences || []);
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
    setForm(emptyExp);
    setModalOpen(true);
  }

  function openEdit(e) {
    setEditing(e._id);
    setForm({
      role: e.role,
      company: e.company,
      period: e.period,
      description: e.description,
      tech: Array.isArray(e.tech) ? e.tech.join(", ") : e.tech || "",
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setForm(emptyExp);
    setEditing(null);
  }

  async function save(ev) {
    ev.preventDefault();
    setError("");
    const payload = {
      ...form,
      tech: form.tech.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (editing) {
        await api(API_ROUTES.EXPERIENCE.UPDATE(editing), { method: "PATCH", body: payload });
      } else {
        await api(API_ROUTES.EXPERIENCE.CREATE, { method: "POST", body: payload });
      }
      closeModal();
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    if (!confirm("Delete this experience?")) return;
    setError("");
    try {
      await api(API_ROUTES.EXPERIENCE.DELETE(id), { method: "DELETE" });
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
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-chart-3/20 text-foreground">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight">Experience</h1>
                <p className="text-sm text-muted-foreground">Manage work history</p>
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
              New experience
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
                <h2 className="text-lg font-medium">{editing ? "Edit experience" : "New experience"}</h2>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={save} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium text-muted-foreground">Role</span>
                    <input
                      className={inputClass}
                      placeholder="Senior Developer"
                      value={form.role}
                      onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                      required
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium text-muted-foreground">Company</span>
                    <input
                      className={inputClass}
                      placeholder="Company name"
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                      required
                    />
                  </label>
                </div>
                <label className="block space-y-1.5">
                  <span className="text-sm font-medium text-muted-foreground">Period</span>
                  <input
                    className={inputClass}
                    placeholder="2020 – 2023"
                    value={form.period}
                    onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))}
                    required
                  />
                </label>
                <label className="block space-y-1.5">
                  <span className="text-sm font-medium text-muted-foreground">Description</span>
                  <textarea
                    className={inputClass + " min-h-[80px] resize-y"}
                    placeholder="What you did there"
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    rows={3}
                    required
                  />
                </label>
                <label className="block space-y-1.5">
                  <span className="text-sm font-medium text-muted-foreground">Tech stack</span>
                  <input
                    className={inputClass}
                    placeholder="React, TypeScript, Node"
                    value={form.tech}
                    onChange={(e) => setForm((f) => ({ ...f, tech: e.target.value }))}
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
      </div>
    </div>
  );
}
