import type { Metadata } from "next";
import { Container } from "@/components/public/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SorLogo } from "@/components/ui/SorLogo";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Projetos digitais construídos pelo SOR para organizar operações reais.",
};

const internalCapabilities = [
  "Captação de leads",
  "Diagnóstico digital",
  "Dashboard operacional",
  "Console interno",
  "Login protegido",
  "Serviços integrados",
  "Deploy em produção",
];

const secondaryProjects = [
  {
    name: "AgendaFácil",
    badge: "MVP demonstrativo",
    description: "Solução de agendamento para organizar serviços, horários e atendimentos.",
    features: ["Agenda organizada", "Gestão de horários", "Fluxo de atendimento"],
  },
  {
    name: "CatalogPro",
    badge: "MVP demonstrativo",
    description: "Catálogo digital para apresentar produtos, receber pedidos e organizar oportunidades.",
    features: ["Vitrine digital", "Pedidos simplificados", "Oportunidades organizadas"],
  },
];

export default function ProjectsPage() {
  return (
    <div className="services-surface relative overflow-hidden">
      <div className="premium-grid pointer-events-none absolute inset-0 opacity-55" />
      <section className="relative border-b border-border py-18 sm:py-24">
        <div className="services-hero-glow pointer-events-none absolute left-1/2 top-1/2 h-80 w-[44rem] max-w-[94vw] -translate-x-1/2 -translate-y-1/2" />
        <Container>
          <div className="relative mx-auto max-w-4xl text-center">
            <Badge>Projetos SOR OS</Badge>
            <h1 className="text-balance mt-6 text-4xl font-black tracking-[-0.055em] sm:text-5xl lg:text-6xl">
              Projetos construídos para transformar operação em resultado.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
              Produtos próprios e MVPs que demonstram como estratégia, tecnologia e operação podem funcionar juntas.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative py-16 sm:py-22">
        <Container>
          <Card className="console-shell relative overflow-hidden rounded-[2rem] border-blue-400/24 p-0">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="p-7 sm:p-10">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-blue-400/20 bg-blue-500/8">
                    <SorLogo variant="mark" className="h-10 w-10" />
                  </span>
                  <div>
                    <Badge>Projeto interno real</Badge>
                    <h2 className="mt-3 text-3xl font-black">SOR ONE Internal</h2>
                  </div>
                </div>
                <p className="mt-6 text-base leading-7 text-muted">
                  O sistema interno da SOR para captar diagnósticos, organizar leads, acompanhar serviços e centralizar oportunidades.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {internalCapabilities.map((capability) => (
                    <div key={capability} className="rounded-xl border border-white/7 bg-black/15 px-4 py-3 text-sm font-semibold text-muted">
                      <span className="mr-2 text-[var(--sor-petrol)]">•</span>
                      {capability}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-blue-400/12 bg-[linear-gradient(145deg,rgba(7,16,29,0.88),rgba(8,12,16,0.96))] p-5 sm:p-7 lg:border-l lg:border-t-0">
                <div className="grid h-full gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ["Leads", "32"],
                      ["Diagnósticos", "11"],
                      ["Serviços", "06"],
                      ["Sistema", "Online"],
                    ].map(([label, value]) => (
                      <div key={label} className="console-inner-card rounded-2xl border border-white/7 bg-black/20 p-4">
                        <p className="text-[10px] uppercase tracking-[0.14em] text-soft">{label}</p>
                        <p className={`mt-2 text-xl font-black ${value === "Online" ? "text-green-400" : ""}`}>{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="console-inner-card rounded-2xl border border-white/7 bg-black/20 p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-extrabold">Fluxo operacional</p>
                      <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(34,197,94,0.7)]" />
                    </div>
                    <div className="mt-6 grid gap-3">
                      {["Lead capturado", "Diagnóstico organizado", "Oportunidade acompanhada"].map((item, index) => (
                        <div key={item} className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/[0.025] p-3">
                          <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-500/10 text-xs font-black text-blue-300">
                            {index + 1}
                          </span>
                          <span className="text-sm text-muted">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {secondaryProjects.map((project, index) => (
              <Card key={project.name} className="service-card-shell relative overflow-hidden rounded-[1.75rem] p-7 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-blue-400/20 bg-blue-500/8 text-sm font-black text-blue-300">
                    0{index + 2}
                  </span>
                  <Badge>{project.badge}</Badge>
                </div>
                <h2 className="mt-6 text-2xl font-black">{project.name}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.features.map((feature) => (
                    <span key={feature} className="rounded-full border border-blue-400/12 bg-blue-500/5 px-3 py-2 text-xs font-semibold text-soft">
                      {feature}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative pb-20 sm:pb-24">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-blue-400/20 bg-[linear-gradient(135deg,var(--sor-card-elevated),var(--sor-panel))] p-8 text-center sm:p-12">
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-blue-600/12 blur-3xl" />
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
