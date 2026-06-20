import Link from "next/link";
import { LogoutButton } from "@/components/admin/logout-button";
import { SorLogo } from "@/components/ui/SorLogo";

const links = [
  { href: "/console/dashboard", label: "Dashboard", icon: "▦" },
  { href: "/console/leads", label: "Leads", icon: "◎" },
];

export function Sidebar() {
  return (
    <aside className="flex w-full flex-col border-b border-[var(--sor-border-champagne)] bg-[var(--sor-bg-soft)] px-5 py-5 text-[var(--sor-text)] lg:fixed lg:inset-y-0 lg:w-68 lg:border-b-0 lg:border-r lg:py-7">
      <div className="flex items-center justify-between gap-3 lg:block">
        <SorLogo variant="horizontal" className="max-w-[168px]" />
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--sor-text-soft)] lg:mt-3">
          Console interno
        </p>
      </div>
      <nav
        aria-label="Navegação do console"
        className="mt-6 flex gap-2 overflow-x-auto lg:flex-1 lg:flex-col lg:overflow-visible"
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex shrink-0 items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm font-semibold text-[var(--sor-text-soft)] hover:border-[var(--sor-border-petrol)] hover:bg-[var(--sor-card)] hover:text-[var(--sor-text)]"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--sor-border-petrol)] bg-[var(--sor-panel)] text-sm text-[var(--sor-petrol)]">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mt-5 lg:border-t lg:border-[var(--sor-border-champagne)] lg:pt-5">
        <p className="mb-3 hidden text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--sor-text-soft)] lg:block">Sessão administrativa</p>
        <LogoutButton />
      </div>
    </aside>
  );
}
