import type { SelectHTMLAttributes } from "react";
import type { SelectOption } from "@/lib/types";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: SelectOption[];
  placeholder?: string;
};

export function Select({
  label,
  options,
  id,
  required,
  placeholder = "Selecione uma opção",
  className = "",
  ...props
}: SelectProps) {
  return (
    <label htmlFor={id} className="grid gap-2 text-sm font-medium text-foreground">
      <span>
        {label}
        {required ? <span className="ml-1 text-accent">*</span> : null}
      </span>
      <select
        id={id}
        required={required}
        defaultValue=""
        className={`min-h-12 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[var(--sor-bg-soft)] px-4 text-base text-[var(--sor-text)] outline-none hover:border-[rgba(148,163,184,0.26)] focus:border-[rgba(14,165,164,0.45)] focus:ring-4 focus:ring-[rgba(14,165,164,0.08)] ${className}`}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
