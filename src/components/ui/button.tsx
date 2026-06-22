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
    "border-[rgba(201,168,106,0.5)] bg-[linear-gradient(135deg,#C9A86A,#B8943A)] text-[#0A0E12] font-bold shadow-[0_10px_28px_rgba(201,168,106,0.18)] hover:-translate-y-0.5 hover:border-[rgba(212,184,122,0.7)] hover:bg-[linear-gradient(135deg,#D4B87A,#C9A86A)] hover:shadow-[0_14px_34px_rgba(201,168,106,0.26)]",
  secondary:
    "border-[rgba(201,168,106,0.22)] bg-[rgba(10,14,18,0.82)] text-[var(--sor-text-muted)] shadow-sm hover:-translate-y-0.5 hover:border-[rgba(201,168,106,0.42)] hover:bg-[var(--sor-card)] hover:text-[var(--sor-champagne)]",
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
  const styles = `inline-flex min-h-12 items-center justify-center rounded-xl border px-5 py-3 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sor-champagne)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`;

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
