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
      className="w-full rounded-lg border border-slate-700 px-3 py-2 text-left text-sm font-medium text-slate-300 hover:border-slate-600 hover:bg-slate-800 hover:text-white disabled:opacity-50"
    >
      {isSubmitting ? "Saindo..." : "Sair"}
    </button>
  );
}
