import Link from "next/link";
import { Container } from "@/components/public/container";
import { SorLogo } from "@/components/ui/SorLogo";
import { SOR_WHATSAPP_URL } from "@/lib/whatsapp";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Produto",
    links: [
      { label: "Soluções", href: "/solucoes" },
      { label: "Projetos", href: "/projetos" },
      { label: "Diagnóstico", href: "/diagnostico" },
    ],
  },
  {
    title: "Plataforma",
    links: [
      {
        label: "AgendaFácil",
        href: "https://agendafacil-sistema.vercel.app",
        external: true,
      },
      {
        label: "CatalogPro",
        href: "https://catalogpro-b2b.vercel.app",
        external: true,
      },
      {
        label: "MenuZap",
        href: "https://menuzap-cardapio-digital.vercel.app",
        external: true,
      },
      { label: "Console", href: "/console" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre", href: "/contato" },
      { label: "Contato", href: "/contato" },
      {
        label: "GitHub",
        href: "https://github.com/RhanielRodri",
        external: true,
      },
      { label: "WhatsApp", href: SOR_WHATSAPP_URL, external: true },
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "Central de ajuda", href: "/contato" },
      { label: "WhatsApp", href: SOR_WHATSAPP_URL, external: true },
      { label: "Status", href: "/projetos" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      id="sobre"
      className="scroll-mt-24 border-t"
      style={{ borderColor: "var(--border-soft)", background: "var(--bg)" }}
    >
      <Container className="max-w-[92rem] py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div>
            <SorLogo variant="horizontal" />
            <p className="mt-4 max-w-xs text-sm leading-6 text-[var(--sor-text-muted)]">
              Tecnologia aplicada a negócios reais.
            </p>
            <p className="mt-2 text-xs text-[var(--sor-text-soft)]">
              Vila Velha, ES — Brasil.
            </p>
            <p className="mt-3 text-xs text-[var(--sor-text-soft)]">
              <a
                href="mailto:rhanielrodrigs@gmail.com"
                className="hover:text-[var(--sor-champagne)]"
              >
                rhanielrodrigs@gmail.com
              </a>
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--sor-text-soft)]">
                {column.title}
              </p>
              <ul className="mt-4 grid gap-2.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--sor-text-muted)] transition-colors hover:text-[var(--sor-champagne)]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--sor-text-muted)] transition-colors hover:text-[var(--sor-champagne)]"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-12 flex flex-col items-start justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center"
          style={{ borderColor: "var(--border-soft)" }}
        >
          <p className="text-xs text-[var(--sor-text-soft)]">
            © 2026 SOR ONE Soluções Digitais. Todos os direitos reservados.
          </p>
          <div className="flex gap-5 text-xs text-[var(--sor-text-soft)]">
            <a
              href="https://github.com/RhanielRodri"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--sor-champagne)]"
            >
              GitHub
            </a>
            <a
              href={SOR_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--sor-champagne)]"
            >
              WhatsApp
            </a>
            <Link href="/contato" className="hover:text-[var(--sor-champagne)]">
              Contato
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
