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
  placeholder,
  type = "text",
  value,
}) {
  const controlClass = cn(
    "w-full rounded-xl border bg-background/70 py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-ink-3",
    "outline-none transition-all focus:border-transparent focus:ring-2",
    error ? "border-destructive/45 focus:ring-destructive/35" : "border-white/10 focus:ring-white/20"
  );

  return (
    <label htmlFor={id} className="block space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label} <span aria-hidden="true">*</span>
        <span className="sr-only">(required)</span>
      </span>
      <span className="relative block">
        <Icon className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-ink-2" />
        {multiline ? (
          <textarea
            id={id}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onBlur}
            rows={5}
            required
            aria-required="true"
            placeholder={placeholder}
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
            required
            aria-required="true"
            placeholder={placeholder}
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
        <span id={`${id}-error`} role="alert" className="block text-xs text-destructive-foreground">
          {error}
        </span>
      )}
    </label>
  );
}
