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
        className={`min-h-11 rounded-lg border border-border bg-white px-3.5 text-base outline-none focus:border-accent focus:ring-3 focus:ring-emerald-900/10 ${className}`}
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
