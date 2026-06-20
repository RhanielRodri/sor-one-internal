import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[rgba(214,181,109,0.06)] px-3 py-1.5 text-xs font-bold text-[var(--sor-champagne-light)] ring-1 ring-[var(--sor-border-champagne)]">
      {children}
    </span>
  );
}
