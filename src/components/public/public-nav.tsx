"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { NAV_ITEMS } from "@/lib/constants";
import { LangToggle } from "@/components/public/lang-toggle";

export function PublicNav() {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <>
      <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`relative py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "text-[var(--sor-champagne)]"
                  : "text-[#8A8D94] hover:text-[var(--sor-text)]"
              }`}
            >
              {t(item.key)}
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
        <LangToggle />
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
          className="absolute right-0 top-14 z-50 grid min-w-52 gap-1 rounded-2xl border border-blue-400/14 bg-[rgba(5,8,13,0.96)] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-4 py-3 text-sm font-medium text-[#8A8D94] hover:bg-[rgba(201,168,106,0.05)] hover:text-[var(--sor-champagne)]"
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="mt-1 flex justify-end border-t border-white/6 px-4 pt-3 pb-1">
            <LangToggle />
          </div>
        </nav>
      </details>
    </>
  );
}
