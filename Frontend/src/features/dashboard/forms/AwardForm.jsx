import { cn } from "@/lib/utils";
import { FormField } from "@/components/dashboard/FormField";
import DashboardError from "@/features/dashboard/components/DashboardError";
import DashboardFormActions from "@/features/dashboard/components/DashboardFormActions";
import { MEDAL_OPTIONS } from "@/features/dashboard/constants/awards";
import { toggleMedal } from "@/features/dashboard/utils/toggleMedal";

export default function AwardForm({ editing, error, form, onCancel, onSubmit, setForm }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField
        label="Event / Tournament"
        placeholder="e.g. 19th European Wushu Championships"
        value={form.title}
        onChange={(value) => setForm((current) => ({ ...current, title: value }))}
        required
      />
      <FormField
        label="Category"
        placeholder="e.g. 60 kg Light Sanda"
        value={form.category}
        onChange={(value) => setForm((current) => ({ ...current, category: value }))}
        required
      />

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
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    medals: toggleMedal(current.medals, medal),
                  }))
                }
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

      <FormField
        label="Period"
        placeholder="e.g. May 2024  (optional)"
        value={form.period}
        onChange={(value) => setForm((current) => ({ ...current, period: value }))}
      />

      <DashboardError message={error} />
      <DashboardFormActions editing={editing} onCancel={onCancel} />
    </form>
  );
}
