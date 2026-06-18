import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
};

const variants = {
  primary: "bg-accent text-white hover:bg-accent-hover border-accent",
  secondary:
    "bg-white text-foreground hover:bg-slate-50 border-border shadow-sm",
  ghost: "bg-transparent text-foreground hover:bg-slate-100 border-transparent",
};

export function Button({
  children,
  href,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const styles = `inline-flex min-h-11 items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`;

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
