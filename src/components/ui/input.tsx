import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ label, id, required, className = "", ...props }: InputProps) {
  return (
    <label htmlFor={id} className="grid gap-2 text-sm font-medium text-foreground">
      <span>
        {label}
        {required ? <span className="ml-1 text-accent">*</span> : null}
      </span>
      <input
        id={id}
        required={required}
        className={`min-h-11 rounded-lg border border-border bg-white px-3.5 text-base outline-none placeholder:text-slate-400 focus:border-accent focus:ring-3 focus:ring-emerald-900/10 ${className}`}
        {...props}
      />
    </label>
  );
}
