import type { Metadata } from "next";
import { Container } from "@/components/public/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Soluções publicadas e desenvolvidas para resolver problemas reais de negócios.",
};

const mainProjects = [
  {
    name: "CatalogPro B2B",
    icon: "◇",
    category: "Sistema Comercial B2B",
    status: "Online",
    description:
      "Sistema comercial para catálogos digitais, solicitação de cotações e gestão administrativa.",
    highlights: [
      "Catálogo digital",
      "Busca e filtros",
      "Cotação online",
      "Painel administrativo",
      "Login protegido",
      "PostgreSQL",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Prisma", "Vercel", "Render"],
    demoUrl: "https://catalogpro-b2b.vercel.app/",
    codeUrl: "https://github.com/RhanielRodri/catalogpro-b2b",
  },
  {
    name: "AgendaFácil",
    icon: "◎",
    category: "Sistema de Agendamento",
    status: "Online",
    description:
      "Sistema de agendamento online para negócios de serviço com escolha de horário, prevenção de conflitos e painel administrativo.",
    highlights: [
      "Agendamento online",
      "Horários disponíveis",
      "Prevenção de conflitos",
      "Painel administrativo",
      "Login protegido",
      "PostgreSQL",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Prisma", "Vercel", "Render"],
    demoUrl: "https://agendafacil-sistema.vercel.app/",
    codeUrl: "https://github.com/RhanielRodri/agendafacil-sistema",
  },
];

const supportingProjects = [
  {
    name: "MenuZap",
    icon: "⚡",
    category: "Cardápio Digital",
    status: "Online",
    description:
      "Cardápio digital com carrinho, Pix e integração com WhatsApp para pequenos negócios.",
    highlights: ["Cardápio digital", "Carrinho", "Pix", "WhatsApp", "QR Code", "Mobile first"],
    stack: ["HTML", "CSS", "JavaScript", "WhatsApp", "QR Code", "Vercel"],
    demoUrl: "https://menuzap-cardapio-digital.vercel.app/",
    codeUrl: "https://github.com/RhanielRodri/menuzap-cardapio-digital",
  },
  {
    name: "SOR ONE",
    icon: "▦",
    category: "Hub Profissional",
    status: "Online",
    description:
      "Plataforma própria utilizada para apresentar serviços, projetos, processos e soluções digitais desenvolvidas para negócios.",
    highlights: ["Captação de leads", "Diagnóstico digital", "Console administrativo", "Deploy em produção"],
    stack: ["Next.js", "Supabase", "Vercel"],
    demoUrl: null,
    codeUrl: null,
  },
];

function StackPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-[var(--sor-border-main)] bg-[rgba(201,168,106,0.04)] px-3 py-1.5 text-xs font-semibold text-soft">
      {label}
    </span>
  );
}

export default function ProjectsPage() {
  return (
    <div className="services-surface relative overflow-hidden">
      <div className="premium-grid pointer-events-none absolute inset-0 opacity-55" />

      {/* Hero */}
      <section className="relative border-b border-border py-18 sm:py-24">
        <div className="services-hero-glow pointer-events-none absolute left-1/2 top-1/2 h-80 w-[44rem] max-w-[94vw] -translate-x-1/2 -translate-y-1/2" />
        <Container>
          <div className="relative mx-auto max-w-4xl text-center">
            <Badge>Cases e projetos realizados</Badge>
            <h1 className="text-balance mt-6 text-4xl font-black tracking-[-0.055em] sm:text-5xl lg:text-6xl">
              Cases e projetos realizados.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
              Soluções publicadas e desenvolvidas para resolver problemas reais de negócios.
            </p>
            <p className="mt-4 text-sm text-soft">
              Todos os projetos podem ser testados online e possuem código disponível para consulta.
            </p>
          </div>
        </Container>
      </section>

      {/* Cases principais */}
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
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-soft">Destaques</p>
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
                  <Button href={project.demoUrl}>Ver demonstração</Button>
                  {project.codeUrl && (
                    <Button href={project.codeUrl} variant="secondary">
                      Ver código
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Cases complementares */}
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
                      <Button href={project.demoUrl} variant="secondary">
                        Ver demonstração
                      </Button>
                      {project.codeUrl && (
                        <Button href={project.codeUrl} variant="ghost">
                          Ver código
                        </Button>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-soft">Este site faz parte do ecossistema SOR ONE.</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA final */}
      <section className="relative pb-20 sm:pb-24">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(201,168,106,0.18)] bg-[linear-gradient(135deg,var(--sor-card-elevated),var(--sor-panel))] p-8 text-center sm:p-12">
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-[rgba(201,168,106,0.06)] blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                Precisa de uma solução parecida para o seu negócio?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted">
                Conte o cenário atual e receba uma direção inicial para transformar a operação em uma estrutura mais organizada.
              </p>
              <Button href="/diagnostico" className="mt-7">
                Solicitar diagnóstico
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
