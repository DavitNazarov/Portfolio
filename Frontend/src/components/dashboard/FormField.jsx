import { INPUT_CLASS } from "@/constants/ui";
import { cn } from "@/lib/utils";

/**
 * Labeled form field. onChange receives the new value (not the event).
 */
export function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  rows,
  className,
  wrapperClassName,
  ...props
}) {
  const InputComponent = rows ? "textarea" : "input";
  return (
    <label className={cn("block space-y-1.5", wrapperClassName)}>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <InputComponent
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={cn(INPUT_CLASS, rows && "min-h-[80px] resize-y", className)}
        {...(rows && { rows })}
        {...props}
      />
    </label>
  );
}
