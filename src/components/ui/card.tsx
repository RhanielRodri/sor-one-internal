import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
