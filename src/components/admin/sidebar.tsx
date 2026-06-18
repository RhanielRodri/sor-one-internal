import Link from "next/link";
import { LogoutButton } from "@/components/admin/logout-button";

const links = [
  { href: "/console/dashboard", label: "Dashboard" },
  { href: "/console/leads", label: "Leads" },
];

export function Sidebar() {
  return (
    <aside className="flex w-full flex-col bg-slate-950 px-5 py-5 text-white lg:fixed lg:inset-y-0 lg:w-64 lg:py-7">
      <div>
        <p className="text-lg font-extrabold tracking-tight">SOR ONE</p>
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
          Console interno
        </p>
      </div>
      <nav
        aria-label="Navegação do console"
        className="mt-6 flex gap-2 lg:flex-1 lg:flex-col"
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mt-5">
        <LogoutButton />
      </div>
    </aside>
  );
}
