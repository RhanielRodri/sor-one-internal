import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
};

const variants = {
  primary:
    "border-[rgba(96,165,250,0.42)] bg-[linear-gradient(135deg,#2563eb,#1d4ed8)] text-[var(--sor-text)] shadow-[0_12px_32px_rgba(37,99,235,0.2)] hover:-translate-y-0.5 hover:border-[rgba(147,197,253,0.58)] hover:bg-[linear-gradient(135deg,#3b82f6,#2563eb)] hover:shadow-[0_16px_38px_rgba(37,99,235,0.28)]",
  secondary:
    "border-[rgba(148,163,184,0.18)] bg-[rgba(13,20,24,0.82)] text-[var(--sor-text-muted)] shadow-sm hover:-translate-y-0.5 hover:border-[rgba(96,165,250,0.3)] hover:bg-[var(--sor-card)] hover:text-[var(--sor-text)]",
  ghost:
    "border-transparent bg-transparent text-[var(--sor-text-muted)] hover:bg-[var(--sor-card)] hover:text-[var(--sor-text)]",
};

export function Button({
  children,
  href,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const styles = `inline-flex min-h-12 items-center justify-center rounded-xl border px-5 py-3 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sor-blue)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
