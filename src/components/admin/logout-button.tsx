"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    setIsSubmitting(true);

    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.replace("/login");
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isSubmitting}
      className="w-full rounded-xl border border-slate-800 px-3 py-2.5 text-left text-sm font-semibold text-slate-400 hover:border-slate-700 hover:bg-slate-900 hover:text-white disabled:opacity-50"
    >
      {isSubmitting ? "Saindo..." : "Sair"}
    </button>
  );
}
