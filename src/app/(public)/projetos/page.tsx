import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/public/container";
import { ProjectCard, type Project } from "@/components/public/project-card";
import { siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Projetos — Sistemas publicados e em produção",
  description:
    "AgendaFácil, CatalogPro B2B, MenuZap e Barber Prime: sistemas e sites publicados e acessíveis online. Desenvolvidos por freelancer em Vila Velha, ES para resolver problemas reais de negócios.",
  keywords: [
    "portfólio desenvolvedor",
    "sistema de agendamento",
    "catálogo digital B2B",
    "freelancer full stack",
    "projetos Next.js React",
  ],
  openGraph: {
    title: "Projetos em produção | SOR ONE",
    description:
      "Sistemas reais desenvolvidos para resolver problemas de negócios. Acesse e teste online.",
    url: `${siteUrl}/projetos`,
    siteName: "SOR ONE",
    locale: "pt_BR",
    type: "website",
  },
};

const mainProjects: Project[] = [
  {
    icon: "◎",
    category: "Sistema de Agendamento",
    name: "AgendaFácil",
    usedBy: "Studio Cut · Lumière",
    description:
      "Clientes agendam pelo celular em menos de 1 minuto. Sem ligação, sem grupo de WhatsApp.",
    demoUrl: "https://agendafacil-sistema.vercel.app",
    demoHost: "agendafacil-sistema.vercel.app",
    screenshot: "/screenshots/agendafacil.png",
    screenshotAlt: "Página inicial do AgendaFácil em funcionamento",
    eager: true,
    highlights: [
      "Agendamento online",
      "Escolha de profissional",
      "Horários disponíveis",
      "Painel administrativo",
    ],
  },
  {
    icon: "◇",
    category: "Catálogo B2B",
    name: "CatalogPro B2B",
    description:
      "Catálogo online onde o cliente pesquisa, monta o pedido e manda a cotação direto pelo WhatsApp.",
    demoUrl: "https://catalogpro-b2b.vercel.app",
    demoHost: "catalogpro-b2b.vercel.app",
    screenshot: "/screenshots/catalogpro-b2b.png",
    screenshotAlt: "Página inicial do CatalogPro B2B em funcionamento",
    highlights: [
      "Busca de produtos",
      "Filtros por categoria",
      "Cotação pelo WhatsApp",
      "Painel administrativo",
    ],
  },
];

const supportingProjects: Project[] = [
  {
    icon: "⚡",
    category: "Cardápio Digital",
    name: "MenuZap",
    description:
      "O cliente escolhe os itens, monta o pedido e envia tudo pronto pelo WhatsApp.",
    demoUrl: "https://menuzap-cardapio-digital.vercel.app",
    demoHost: "menuzap-cardapio-digital.vercel.app",
    screenshot: "/screenshots/menuzap.png",
    screenshotAlt: "Página inicial do MenuZap em funcionamento",
    highlights: [
      "Carrinho de pedido",
      "Pix e dinheiro",
      "Pedido pelo WhatsApp",
      "QR Code",
    ],
  },
  {
    icon: "↗",
    category: "Landing Page",
    name: "Barber Prime",
    description:
      "Site profissional para apresentar serviços, preços, localização e facilitar o contato com a barbearia.",
    demoUrl: "https://landing-barber-prime.vercel.app",
    demoHost: "landing-barber-prime.vercel.app",
    screenshot: "/screenshots/barber-prime.png",
    screenshotAlt: "Página inicial da Barber Prime em funcionamento",
    highlights: [
      "Serviços e preços",
      "Galeria",
      "Localização no mapa",
      "Contato pelo WhatsApp",
    ],
  },
];

export default function ProjectsPage() {
  return (
    <div className="relative overflow-hidden bg-[var(--bg)]">
      <section className="relative border-b border-[var(--border-soft)] py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[44rem] max-w-[94vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(201,168,106,0.12),transparent_60%)] blur-[34px]"
        />
        <Container>
          <div className="relative mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--champagne-border)] bg-[var(--champagne-dim)] px-3 py-1.5 text-xs font-bold text-[var(--sor-champagne)]">
              Projetos em produção
            </span>
            <h1
              className="mt-6 text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            >
              Sistemas reais, no ar e funcionando.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
              Cada projeto foi feito para um negócio real e está funcionando agora.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-22">
        <Container>
          <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
            {mainProjects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>

          <div className="mt-5 grid grid-cols-1 items-stretch gap-5 md:grid-cols-2">
            {supportingProjects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--champagne-border)] bg-[linear-gradient(135deg,var(--card-elevated),var(--card-deep))] p-8 text-center sm:p-12">
            <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Quer um sistema assim para o seu negócio?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted">
              Comece pelo diagnóstico gratuito. Em poucos minutos eu entendo seu
              cenário e digo o que faz sentido construir primeiro.
            </p>
            <Link
              href="/diagnostico"
              className="mt-7 inline-flex items-center justify-center rounded-xl bg-[var(--champagne)] px-7 py-3.5 text-sm font-bold text-[#060709] transition hover:opacity-90"
            >
              Solicitar diagnóstico gratuito
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
