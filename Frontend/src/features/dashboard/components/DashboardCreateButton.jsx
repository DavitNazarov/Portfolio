import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardCreateButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium",
        "hover:opacity-95 active:scale-[0.98] transition-all"
      )}
    >
      <Plus className="w-4 h-4" />
      {children}
    </button>
  );
}
