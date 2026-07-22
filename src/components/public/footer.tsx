import Link from "next/link";
import { Container } from "@/components/public/container";
import { SorLogo } from "@/components/ui/SorLogo";
import { SOR_WHATSAPP_URL } from "@/lib/whatsapp";

const navLinks = [
  { label: "Soluções", href: "/#solucoes" },
  { label: "Implantações", href: "/#implantacoes" },
  { label: "Como funciona", href: "/#metodologia" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Implantações demonstrativas", href: "/projetos" },
  { label: "Solução de agendamento", href: "/solucoes/agendamento" },
  { label: "Diagnóstico", href: "/diagnostico" },
];

const contactLinks = [
  { label: "WhatsApp", href: SOR_WHATSAPP_URL, external: true },
  {
    label: "@soroneoficial",
    href: "https://instagram.com/soroneoficial",
    external: true,
  },
  {
    label: "rhanielrodrigs@gmail.com",
    href: "mailto:rhanielrodrigs@gmail.com",
    external: false,
  },
];

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: "var(--border-soft)", background: "var(--bg)" }}
    >
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="SOR ONE — Início" className="inline-block">
              <SorLogo variant="horizontal" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-[var(--sor-text-muted)]">
              Implantação de sites, sistemas, automações e integrações
              adaptados à operação de cada negócio.
            </p>
            <p className="mt-3 text-xs text-[var(--sor-text-soft)]">
              Vila Velha, ES — atendimento em todo o Brasil.
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--sor-text-soft)]">
              Navegação
            </p>
            <ul className="mt-4 grid gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--sor-text-muted)] transition-colors hover:text-[var(--sor-champagne)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--sor-text-soft)]">
              Contato
            </p>
            <ul className="mt-4 grid gap-2.5">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-sm text-[var(--sor-text-muted)] transition-colors hover:text-[var(--sor-champagne)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={SOR_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--champagne-border)] bg-[var(--champagne-dim)] px-5 py-2.5 text-sm font-bold text-[var(--sor-champagne)] transition hover:border-[rgba(201,168,106,0.4)] hover:bg-[rgba(201,168,106,0.14)]"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col items-start justify-between gap-3 border-t pt-6 sm:flex-row sm:items-center"
          style={{ borderColor: "var(--border-soft)" }}
        >
          <p className="text-xs text-[var(--sor-text-soft)]">
            © 2026 SOR ONE · Vila Velha, ES
          </p>
          <Link
            href="/privacidade"
            className="text-xs text-[var(--sor-text-soft)] transition-colors hover:text-[var(--sor-champagne)]"
          >
            Política de privacidade
          </Link>
        </div>
      </Container>
    </footer>
  );
}
