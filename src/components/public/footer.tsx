import Link from "next/link";
import { Container } from "@/components/public/container";
import { SorLogo } from "@/components/ui/SorLogo";
import { NAV_ITEMS } from "@/lib/constants";

export function Footer() {
  return (
    <footer id="sobre" className="scroll-mt-24 border-t border-[var(--sor-border-champagne)] bg-[var(--sor-bg)] text-[var(--sor-text)]">
      <Container className="grid gap-10 py-14 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <SorLogo variant="horizontal" />
          <p className="mt-4 max-w-md text-sm leading-6 text-[var(--sor-text-muted)]">
            O SOR ONE reúne meus serviços, projetos publicados e soluções digitais para pequenos negócios.
          </p>
          <p className="mt-3 text-xs text-[var(--sor-text-soft)]">
            <a href="mailto:rhanielrodrigs@gmail.com" className="hover:text-[var(--sor-champagne)]">rhanielrodrigs@gmail.com</a>
          </p>
          <p className="mt-2 text-xs text-[var(--sor-text-soft)]">Vila Velha — ES · Tecnologia aplicada a negócios reais.</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--sor-text-muted)] hover:text-[var(--sor-champagne)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
