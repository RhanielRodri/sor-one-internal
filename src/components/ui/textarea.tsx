import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export function Textarea({
  label,
  id,
  required,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <label htmlFor={id} className="grid gap-2 text-sm font-medium text-foreground">
      <span>
        {label}
        {required ? <span className="ml-1 text-accent">*</span> : null}
      </span>
      <textarea
        id={id}
        required={required}
        className={`min-h-36 resize-y rounded-xl border border-[rgba(148,163,184,0.16)] bg-[var(--sor-bg-soft)] px-4 py-3.5 text-base text-[var(--sor-text)] outline-none placeholder:text-[var(--sor-text-soft)] hover:border-[rgba(148,163,184,0.26)] focus:border-[rgba(14,165,164,0.45)] focus:ring-4 focus:ring-[rgba(14,165,164,0.08)] ${className}`}
        {...props}
      />
    </label>
  );
}
