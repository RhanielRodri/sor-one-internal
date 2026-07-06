"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Problemas", href: "/#problemas" },
  { label: "Soluções", href: "/#solucoes" },
  { label: "Processo", href: "/#processo" },
  { label: "Projetos", href: "/projetos" },
];

const ctaStyle = {
  background: "var(--champagne)",
  color: "#060709",
  fontFamily: "var(--font-manrope), sans-serif",
  fontWeight: 700,
} as const;

export function PublicNav() {
  const pathname = usePathname();

  return (
    <>
      <nav
        aria-label="Navegação principal"
        className="hidden items-center gap-8 md:flex"
      >
        {NAV_LINKS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`relative py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "text-[var(--sor-champagne)]"
                  : "text-[#9A9DA6] hover:text-[var(--sor-text)]"
              }`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -bottom-1 mx-auto h-0.5 bg-[linear-gradient(90deg,transparent,#C9A86A,transparent)] transition-all ${
                  isActive
                    ? "w-full opacity-100 shadow-[0_0_10px_rgba(201,168,106,0.5)]"
                    : "w-0 opacity-0"
                }`}
              />
            </Link>
          );
        })}
        <Link
          href="/diagnostico"
          style={ctaStyle}
          className="inline-flex items-center rounded-xl px-4 py-2.5 text-sm transition hover:opacity-90"
        >
          Solicitar diagnóstico
        </Link>
      </nav>

      <details className="group relative md:hidden">
        <summary
          aria-label="Abrir menu"
          className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-xl border border-white/10 bg-white/[0.025] text-[var(--sor-text)] marker:hidden"
        >
          <span className="grid gap-1.5">
            <span className="h-px w-5 bg-current transition group-open:translate-y-[7px] group-open:rotate-45" />
            <span className="h-px w-5 bg-current transition group-open:opacity-0" />
            <span className="h-px w-5 bg-current transition group-open:-translate-y-[7px] group-open:-rotate-45" />
          </span>
        </summary>
        <nav
          aria-label="Navegação mobile"
          className="absolute right-0 top-14 z-50 grid min-w-56 gap-1 rounded-2xl border border-[var(--border-soft)] bg-[rgba(6,7,9,0.97)] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          {NAV_LINKS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-xl px-4 py-3 text-sm font-medium hover:bg-[rgba(201,168,106,0.05)] hover:text-[var(--sor-champagne)] ${
                  isActive ? "text-[var(--sor-champagne)]" : "text-[#9A9DA6]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/diagnostico"
            style={ctaStyle}
            className="mt-1 rounded-xl px-4 py-3 text-center text-sm"
          >
            Solicitar diagnóstico
          </Link>
        </nav>
      </details>
    </>
  );
}
