"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Soluções", href: "/#solucoes" },
  { label: "Implantações", href: "/#implantacoes" },
  { label: "Como funciona", href: "/#metodologia" },
  { label: "Sobre", href: "/#sobre" },
];

const ctaStyle = {
  background: "var(--champagne)",
  color: "#060709",
  fontFamily: "var(--font-manrope), sans-serif",
  fontWeight: 700,
} as const;

export function PublicNav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <>
      <nav
        aria-label="Navegação principal"
        className="col-start-2 hidden items-center justify-center gap-6 md:flex lg:gap-8"
      >
        {NAV_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="relative py-2 text-sm font-medium text-[var(--text-muted-2)] transition-colors hover:text-[var(--text)]"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="col-start-3 flex items-center justify-self-end" ref={menuRef}>
        <Link
          href="/diagnostico"
          style={ctaStyle}
          className="hidden items-center rounded-xl px-4 py-2.5 text-sm transition hover:opacity-90 md:inline-flex"
        >
          Solicitar diagnóstico
        </Link>

        <div className="relative md:hidden">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((current) => !current)}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-xl border border-white/10 bg-white/[0.025] text-[var(--text)]"
          >
            <span className="grid gap-1.5">
              <span
                className={`h-px w-5 bg-current transition ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
              />
              <span className={`h-px w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
              <span
                className={`h-px w-5 bg-current transition ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
          <nav
            id="mobile-nav"
            aria-label="Navegação mobile"
            hidden={!open}
            className="absolute right-0 top-14 z-50 grid min-w-60 gap-1 rounded-2xl border border-[var(--border-soft)] bg-[rgba(6,7,9,0.97)] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          >
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--text-muted-2)] hover:bg-[rgba(201,168,106,0.05)] hover:text-[var(--sor-champagne)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/diagnostico"
              style={ctaStyle}
              onClick={() => setOpen(false)}
              className="mt-1 rounded-xl px-4 py-3 text-center text-sm"
            >
              Solicitar diagnóstico
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
