import type { ReactNode } from "react";

export function BrowserFrame({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--card-deep)] shadow-[0_36px_90px_rgba(0,0,0,0.5),0_1px_0_rgba(201,168,106,0.1)_inset]">
      <div className="flex items-center gap-3 border-b border-[var(--border-soft)] bg-[rgba(6,7,9,0.6)] px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#2a3140]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#2a3140]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#2a3140]" />
        </span>
        <span className="truncate rounded-md bg-[rgba(255,255,255,0.03)] px-3 py-1 text-[11px] text-[var(--text-soft-2)]">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}
