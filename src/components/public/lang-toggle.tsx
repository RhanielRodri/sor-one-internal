"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function LangToggle() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchLocale(next: string) {
    if (next === locale) return;
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;SameSite=Lax`;
    startTransition(() => {
      router.refresh();
    });
  }

  const active = "text-[var(--sor-champagne)] font-black";
  const inactive = "text-[#8A8D94] hover:text-[var(--sor-text)] font-bold transition-colors";

  return (
    <div
      className="flex items-center gap-1 text-[11px] tracking-wide"
      aria-label="Language toggle"
    >
      <button
        onClick={() => switchLocale("pt")}
        disabled={isPending}
        className={locale === "pt" ? active : inactive}
      >
        PT
      </button>
      <span className="text-[#8A8D94]">|</span>
      <button
        onClick={() => switchLocale("en")}
        disabled={isPending}
        className={locale === "en" ? active : inactive}
      >
        EN
      </button>
    </div>
  );
}
