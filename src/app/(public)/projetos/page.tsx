import type { Metadata } from "next";
import { Container } from "@/components/public/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Projetos | SOR ONE — Sistemas publicados e em produção",
  description: "CatalogPro, AgendaFácil e MenuZap: sistemas full stack publicados e acessíveis online. Desenvolvidos por freelancer em Vila Velha, ES para resolver problemas reais de negócios.",
  keywords: ["portfólio desenvolvedor", "sistema de agendamento", "catálogo digital B2B", "freelancer full stack", "projetos Next.js React"],
  openGraph: {
    title: "Projetos em produção | SOR ONE",
    description: "Sistemas reais desenvolvidos para resolver problemas de negócios. Acesse e teste online.",
    url: "https://sor-one-internal.vercel.app/projetos",
    siteName: "SOR ONE",
    locale: "pt_BR",
    type: "website",
  },
};

function StackPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-[var(--sor-border-main)] bg-[rgba(201,168,106,0.04)] px-3 py-1.5 text-xs font-semibold text-soft">
      {label}
    </span>
  );
}

export default async function ProjectsPage() {
  const t = await getTranslations("projects");

  const mainProjects = [
    {
      name: "CatalogPro B2B",
      icon: "◇",
      category: t("catalogpro_category"),
      status: "Online",
      description: t("catalogpro_desc"),
      highlights: [t("catalogpro_h1"), t("catalogpro_h2"), t("catalogpro_h3"), t("catalogpro_h4"), t("catalogpro_h5"), t("catalogpro_h6")],
      stack: ["React", "Node.js", "PostgreSQL", "Prisma", "Vercel", "Render"],
      demoUrl: "https://catalogpro-b2b.vercel.app/",
      codeUrl: "https://github.com/RhanielRodri/catalogpro-b2b",
    },
    {
      name: "AgendaFácil",
      icon: "◎",
      category: t("agendafacil_category"),
      status: "Online",
      description: t("agendafacil_desc"),
      highlights: [t("agendafacil_h1"), t("agendafacil_h2"), t("agendafacil_h3"), t("agendafacil_h4"), t("agendafacil_h5"), t("agendafacil_h6")],
      stack: ["React", "Node.js", "PostgreSQL", "Prisma", "Vercel", "Render"],
      demoUrl: "https://agendafacil-sistema.vercel.app/",
      codeUrl: "https://github.com/RhanielRodri/agendafacil-sistema",
    },
  ];

  const supportingProjects = [
    {
      name: "MenuZap",
      icon: "⚡",
      category: t("menuzap_category"),
      status: "Online",
      description: t("menuzap_desc"),
      highlights: [t("menuzap_h1"), t("menuzap_h2"), t("menuzap_h3"), t("menuzap_h4"), t("menuzap_h5"), t("menuzap_h6")],
      stack: ["HTML", "CSS", "JavaScript", "WhatsApp", "QR Code", "Vercel"],
      demoUrl: "https://menuzap-cardapio-digital.vercel.app/",
      codeUrl: "https://github.com/RhanielRodri/menuzap-cardapio-digital",
    },
    {
      name: "SOR ONE",
      icon: "▦",
      category: t("sorone_category"),
      status: "Online",
      description: t("sorone_desc"),
      highlights: [t("sorone_h1"), t("sorone_h2"), t("sorone_h3"), t("sorone_h4")],
      stack: ["Next.js", "Supabase", "Vercel"],
      demoUrl: null,
      codeUrl: null,
    },
  ];

  return (
    <div className="services-surface relative overflow-hidden">
      <div className="premium-grid pointer-events-none absolute inset-0 opacity-55" />

      {/* Hero */}
      <section className="relative border-b border-border py-18 sm:py-24">
        <div className="services-hero-glow pointer-events-none absolute left-1/2 top-1/2 h-80 w-[44rem] max-w-[94vw] -translate-x-1/2 -translate-y-1/2" />
        <Container>
          <div className="relative mx-auto max-w-4xl text-center">
            <Badge>{t("badge")}</Badge>
            <h1 className="text-balance mt-6 text-4xl font-black tracking-[-0.055em] sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
              {t("sub")}
            </p>
            <p className="mt-4 text-sm text-soft">
              {t("sub2")}
            </p>
          </div>
        </Container>
      </section>

      {/* Main projects */}
      <section className="relative py-16 sm:py-22">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            {mainProjects.map((project) => (
              <Card
                key={project.name}
                className="service-card-shell group relative flex min-h-[540px] flex-col overflow-hidden rounded-[1.75rem] border-[rgba(201,168,106,0.2)] p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[var(--sor-border-champagne)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="service-icon-shell grid h-12 w-12 place-items-center rounded-xl border border-[rgba(201,168,106,0.18)] bg-[rgba(201,168,106,0.06)] text-lg text-[var(--sor-champagne)]">
                    {project.icon}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-[var(--sor-border-champagne)] bg-[rgba(201,168,106,0.06)] px-2.5 py-1 text-[9px] font-black tracking-[0.18em] text-[var(--sor-champagne)]">
                      FULL STACK
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.7)]" />
                      <span className="text-xs font-semibold text-green-400">{project.status}</span>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--sor-champagne)]">
                  {project.category}
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-[-0.025em]">{project.name}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>

                <div className="mt-6 border-t border-[var(--sor-border-main)] pt-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-soft">{t("highlights_label")}</p>
                  <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted">
                    {project.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="text-[var(--sor-champagne)]">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <StackPill key={tech} label={tech} />
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-3 pt-7">
                  <Button href={project.demoUrl}>{t("btn_demo")}</Button>
                  {project.codeUrl && (
                    <Button href={project.codeUrl} variant="secondary">
                      {t("btn_code")}
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Supporting projects */}
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {supportingProjects.map((project) => (
              <Card
                key={project.name}
                className="service-card-shell group relative flex flex-col overflow-hidden rounded-[1.75rem] border-[var(--sor-border-main)] p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[var(--sor-border-champagne)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="service-icon-shell grid h-11 w-11 place-items-center rounded-xl border border-[rgba(201,168,106,0.14)] text-base text-[var(--sor-champagne)]">
                    {project.icon}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.7)]" />
                    <span className="text-xs font-semibold text-green-400">{project.status}</span>
                  </div>
                </div>

                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--sor-champagne)]">
                  {project.category}
                </p>
                <h2 className="mt-1 text-xl font-black tracking-[-0.025em]">{project.name}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.highlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--sor-border-main)] bg-[rgba(201,168,106,0.04)] px-3 py-1.5 text-xs font-semibold text-soft"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <StackPill key={tech} label={tech} />
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  {project.demoUrl ? (
                    <div className="flex flex-wrap gap-3">
                      <Button href={project.demoUrl}>{t("btn_demo")}</Button>
                      {project.codeUrl && (
                        <Button href={project.codeUrl} variant="ghost">
                          {t("btn_code")}
                        </Button>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-soft">{t("this_site")}</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative pb-20 sm:pb-24">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(201,168,106,0.18)] bg-[linear-gradient(135deg,var(--sor-card-elevated),var(--sor-panel))] p-8 text-center sm:p-12">
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-[rgba(201,168,106,0.06)] blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                {t("cta_title")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted">
                {t("cta_sub")}
              </p>
              <Button href="/diagnostico" className="mt-7">
                {t("cta_btn")}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
