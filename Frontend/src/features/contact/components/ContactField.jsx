import { cn } from "@/lib/utils";

export default function ContactField({
  autoComplete,
  error,
  icon: Icon,
  id,
  label,
  multiline = false,
  onBlur,
  onChange,
  type = "text",
  value,
}) {
  const controlClass = cn(
    "w-full rounded-xl border bg-background/70 px-11 py-3 text-sm text-foreground placeholder:text-muted-foreground/35",
    "outline-none transition-all focus:border-transparent focus:ring-2",
    error ? "border-destructive/45 focus:ring-destructive/35" : "border-white/10 focus:ring-white/20"
  );

  return (
    <label htmlFor={id} className="block space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label} <span aria-hidden="true">*</span>
      </span>
      <span className="relative block">
        <Icon className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground/45" />
        {multiline ? (
          <textarea
            id={id}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onBlur}
            rows={5}
            maxLength={2000}
            className={cn(controlClass, "min-h-32 resize-y leading-6")}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
          />
        ) : (
          <input
            id={id}
            value={value}
            type={type}
            autoComplete={autoComplete}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onBlur}
            maxLength={type === "tel" ? 80 : 160}
            className={controlClass}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
          />
        )}
      </span>
      {error && (
        <span id={`${id}-error`} className="block text-xs text-destructive">
          {error}
        </span>
      )}
    </label>
  );
}
