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
        className={`min-h-32 resize-y rounded-lg border border-border bg-white px-3.5 py-3 text-base outline-none placeholder:text-slate-400 focus:border-accent focus:ring-3 focus:ring-emerald-900/10 ${className}`}
        {...props}
      />
    </label>
  );
}
