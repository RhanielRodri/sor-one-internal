import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-[rgba(37,99,235,0.15)] bg-[var(--sor-card)] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.2)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
