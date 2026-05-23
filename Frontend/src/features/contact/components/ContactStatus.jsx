import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactStatus({ message, status }) {
  if (!message) return null;

  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-xl border px-3.5 py-3 text-sm",
        status === "success"
          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
          : "border-destructive/25 bg-destructive/10 text-destructive"
      )}
    >
      {status === "success" ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      )}
      <span>{message}</span>
    </div>
  );
}
