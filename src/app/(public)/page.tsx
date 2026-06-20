import { Container } from "@/components/public/container";
import { SectionHeading } from "@/components/public/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SorLogo } from "@/components/ui/SorLogo";
import { faq } from "@/data/faq";
import {
  getActiveServices,
  type PublicService,
} from "@/lib/services";

export const dynamic = "force-dynamic";

const operationalMetrics = [
  ["32", "Leads capturados", "+18%"],
  ["11", "Diagnósticos", "8 enviados"],
  ["06", "Serviços ativos", "Operação online"],
  ["R$ 18k", "Receita potencial", "+24%"],
];

const recentActivities = [
  ["Clínica Sorriso", "Diagnóstico enviado", "Concluído"],
  ["Studio Prime", "Nova oportunidade", "Em análise"],
  ["Café da Vila", "Catálogo publicado", "Ativo"],
];

function formatPrice(value: number | null) {
  if (value === null) {
    return "Sob consulta";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

function getServiceIcon(name: string) {
  const normalized = name.toLowerCase();

  if (normalized.includes("catálogo") || normalized.includes("catalogo")) return "◇";
  if (normalized.includes("agenda")) return "◎";
  if (normalized.includes("manutenção") || normalized.includes("manutencao")) return "↻";
  if (normalized.includes("ajuste")) return "⌁";
  if (normalized.includes("site") || normalized.includes("presença")) return "↗";

  return "▦";
}

export default async function HomePage() {
  let services: PublicService[] = [];

  try {
    services = (await getActiveServices()).slice(0, 3);
  } catch (caughtError) {
    console.error(
      "[Home] Falha ao carregar vitrine de serviços",
      caughtError instanceof Error ? caughtError.message : "Erro desconhecido",
    );
  }

  return (
    <>
      <section className="aurora-surface cinematic-hero relative overflow-hidden border-b border-border lg:min-h-[calc(100vh-72px)]">
        <div className="premium-grid absolute inset-0 opacity-90" />
        <div className="hero-particles absolute inset-0 hidden lg:block" />
        <div className="perspective-lines pointer-events-none absolute inset-x-[-12%] bottom-[-13rem] hidden h-[34rem] lg:block" />
        <div className="vertical-light-beam pointer-events-none absolute bottom-[-10rem] left-[58%] hidden h-[34rem] w-64 -translate-x-1/2 lg:block" />
        <div className="absolute left-[8%] top-28 h-1 w-1 rounded-full bg-blue-300/60 shadow-[0_0_18px_rgba(96,165,250,0.8)]" />
        <div className="absolute right-[12%] top-36 h-1.5 w-1.5 rounded-full bg-[var(--sor-petrol)]/60 shadow-[0_0_20px_rgba(14,165,164,0.7)]" />
        <div className="absolute bottom-24 left-[46%] h-1 w-1 rounded-full bg-blue-400/50" />
        <div className="absolute -right-[18rem] top-[-14rem] hidden h-[54rem] w-[54rem] rounded-full border border-blue-400/8 lg:block" />
        <div className="absolute -right-[7rem] top-[-4rem] hidden h-[42rem] w-[42rem] rounded-full border border-blue-400/7 lg:block" />

        <div className="relative mx-auto grid w-full max-w-[92rem] gap-14 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-center lg:gap-8 lg:px-10 lg:pb-20 lg:pt-16">
          <div className="relative z-10">
            <Badge>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--sor-status)] shadow-[0_0_10px_rgba(34,197,94,0.7)]" />
              Tecnologia aplicada a negócios reais
            </Badge>
            <h1 className="text-balance mt-7 max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.06em] sm:text-5xl lg:text-[4rem] xl:text-[4.5rem]">
              Soluções digitais desenhadas para gerar{" "}
              <span className="bg-[linear-gradient(90deg,#93c5fd,#2563eb_58%,#0ea5a4)] bg-clip-text text-transparent">
                avanço real.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Criamos sites, catálogos, sistemas simples e automações para transformar presença digital em operação real.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/diagnostico">Solicitar diagnóstico</Button>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 border-t border-white/8 pt-6 sm:grid-cols-3">
              {[
                ["Estratégia", "Prioridade clara"],
                ["Tecnologia", "Solução proporcional"],
                ["Operação", "Evolução contínua"],
              ].map(([title, text]) => (
                <div key={title}>
                  <p className="text-sm font-extrabold">{title}</p>
                  <p className="mt-1 text-xs text-soft">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="portfolio" className="relative mx-auto w-full max-w-[54rem] scroll-mt-28 lg:translate-x-4 xl:translate-x-8">
            <span id="demonstracao" className="absolute -top-24" aria-hidden="true" />
            <div aria-hidden="true" className="hero-orbit -inset-12 hidden lg:block" />
            <div aria-hidden="true" className="hero-orbit -inset-24 hidden border-blue-400/5 lg:block" />
            <div aria-hidden="true" className="absolute -inset-[12%] rounded-full bg-blue-600/20 blur-[110px]" />
            <div aria-hidden="true" className="perspective-floor absolute left-[4%] right-[4%] top-[94%] hidden h-56 lg:block" />
            <div aria-hidden="true" className="holographic-base absolute -bottom-20 left-[4%] right-[4%] hidden h-36 lg:block" />
            <div aria-hidden="true" className="absolute -bottom-8 left-[15%] right-[15%] hidden h-12 rounded-[50%] bg-blue-500/20 blur-2xl lg:block" />
            <div className="console-shell glass-panel relative overflow-hidden rounded-[1.85rem]">
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-[10%] top-0 h-20 bg-[linear-gradient(to_bottom,rgba(96,165,250,0.055),transparent)]" />
              <div className="flex items-center justify-between border-b border-white/8 px-4 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-blue-400/20 bg-blue-500/8">
                    <SorLogo variant="mark" className="h-7 w-7" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold">SOR OS Console</p>
                    <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-soft">Centro operacional</p>
                  </div>
                </div>
                <span className="flex items-center gap-2 rounded-full border border-green-400/15 bg-green-500/8 px-3 py-1.5 text-[10px] font-bold text-green-400">
                  <span className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-green-400" />
                  Sistema online
                </span>
              </div>

              <div className="grid gap-4 p-4 sm:p-6 lg:p-7">
                <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                  {operationalMetrics.map(([value, label, detail], index) => (
                    <div
                      key={label}
                      className={`console-inner-card rounded-2xl border p-4 transition ${
                        index === 0
                          ? "border-blue-400/25 bg-blue-500/8"
                          : "border-white/7 bg-[rgba(8,12,16,0.58)]"
                      }`}
                    >
                      <p className="text-xl font-black sm:text-2xl">{value}</p>
                      <p className="mt-1 text-[10px] font-semibold text-soft">{label}</p>
                      <p className={`mt-3 text-[9px] font-bold ${index === 2 ? "text-green-400" : "text-blue-300"}`}>{detail}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
                  <div className="console-inner-card rounded-2xl border border-white/7 bg-[rgba(8,12,16,0.68)] p-5 transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-extrabold">Oportunidades</p>
                        <p className="mt-1 text-[10px] text-soft">Evolução dos últimos 30 dias</p>
                      </div>
                      <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[9px] font-bold text-blue-300">+21%</span>
                    </div>
                    <div className="relative mt-7 flex h-36 items-end gap-2">
                      <svg aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible opacity-70" viewBox="0 0 320 120" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartLine" x1="0" x2="1">
                            <stop offset="0%" stopColor="#2563EB" />
                            <stop offset="100%" stopColor="#0EA5A4" />
                          </linearGradient>
                        </defs>
                        <path d="M0 96 C42 82, 58 89, 88 66 S145 76, 174 48 S224 55, 252 28 S294 33, 320 10" fill="none" stroke="url(#chartLine)" strokeWidth="2.5" />
                      </svg>
                      {[34, 48, 42, 61, 55, 76, 70, 88, 82, 96].map((height, index) => (
                        <span
                          key={height}
                          className="animate-bar-rise flex-1 rounded-t bg-[linear-gradient(to_top,#1e3a8a,#2563eb_70%,#60a5fa)]"
                          style={{ height: `${height}%`, opacity: 0.46 + index * 0.045, animationDelay: `${index * 70}ms` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="console-inner-card rounded-2xl border border-green-400/10 bg-[linear-gradient(145deg,rgba(8,12,16,0.72),rgba(14,165,164,0.045))] p-5 transition shadow-[0_0_28px_rgba(34,197,94,0.025)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-extrabold">IA & Automação</p>
                        <p className="mt-1 text-[10px] text-soft">Fluxos monitorados</p>
                      </div>
                      <span className="flex items-center gap-2 rounded-full border border-green-400/15 bg-green-500/8 px-2.5 py-1 text-[9px] font-bold text-green-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--sor-status)] shadow-[0_0_10px_rgba(34,197,94,0.65)]" />
                        IA ativa
                      </span>
                    </div>
                    <div className="mt-6 grid gap-3">
                      {[
                        ["Captura de leads", "Ativa"],
                        ["Organização comercial", "Ativa"],
                        ["Alertas operacionais", "Monitorando"],
                      ].map(([name, status]) => (
                        <div key={name} className="flex items-center justify-between border-b border-white/6 pb-3 last:border-0 last:pb-0">
                          <span className="text-[10px] text-muted">{name}</span>
                          <span className="text-[9px] font-bold text-green-400">{status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="console-inner-card rounded-2xl border border-white/7 bg-[rgba(8,12,16,0.58)] p-4 transition sm:p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-extrabold">Atividades recentes</p>
                    <span className="text-[9px] font-bold text-blue-300">Agora</span>
                  </div>
                  <div className="grid gap-2">
                    {recentActivities.map(([name, activity, status], index) => (
                      <div key={name} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-white/5 bg-white/[0.025] px-3 py-3 sm:grid-cols-[1fr_1fr_auto]">
                        <p className="text-[11px] font-bold">{name}</p>
                        <p className="hidden text-[10px] text-soft sm:block">{activity}</p>
                        <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${index === 1 ? "bg-blue-500/10 text-blue-300" : "bg-green-500/8 text-green-400"}`}>{status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {services.length > 0 ? (
        <section id="solucoes" className="relative scroll-mt-24 overflow-hidden border-b border-border bg-[linear-gradient(180deg,#07101d,var(--sor-bg-soft))] py-16 sm:py-20">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(96,165,250,0.38),transparent)]" />
          <div className="premium-grid pointer-events-none absolute inset-0 opacity-35" />
          <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-600/7 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[rgba(14,165,164,0.045)] blur-3xl" />
          <Container>
            <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <SectionHeading
                eyebrow="Soluções"
                title="O que podemos desenvolver para você"
                description="Veja qual solução faz mais sentido antes de solicitar um diagnóstico."
              />
              <Button href="/solucoes" variant="secondary" className="shrink-0">Conhecer todas as soluções</Button>
            </div>
            <div className="relative mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <Card key={service.id} className="home-service-card group relative flex min-h-[290px] flex-col overflow-hidden rounded-[1.5rem] border-blue-400/14 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/28">
                  <div className="flex items-start justify-between gap-4">
                    <span className="service-icon-shell grid h-11 w-11 place-items-center rounded-xl border border-blue-400/20 text-lg text-blue-300">{getServiceIcon(service.nome)}</span>
                    {service.destaque ? <span className="rounded-full border border-blue-400/15 bg-blue-500/8 px-2.5 py-1 text-[9px] font-bold text-blue-300">Destaque</span> : null}
                  </div>
                  <h3 className="mt-5 text-xl font-black">{service.nome}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{service.descricao}</p>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-soft">A partir de</p>
                      <p className="mt-1 font-extrabold">{formatPrice(service.preco_inicio)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-soft">Prazo</p>
                      <p className="mt-1 text-sm font-extrabold">{service.prazo_dias ? `${service.prazo_dias} dias` : "A definir"}</p>
                    </div>
                  </div>
                  <Button href="/diagnostico" variant="secondary" fullWidth className="mt-5 min-h-10 border-blue-400/16 bg-[rgba(8,13,20,0.72)] py-2 hover:border-blue-400/34 hover:shadow-[0_0_22px_rgba(37,99,235,0.08)]">Solicitar diagnóstico</Button>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-b border-border bg-[var(--sor-bg)] py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Perguntas frequentes"
            title="Antes de começar"
            description="Respostas diretas para entender como o SOR trabalha e qual é o próximo passo."
            centered
          />
          <div className="mx-auto mt-10 grid max-w-3xl gap-3">
            {faq.map((item) => (
              <Card key={item.question} className="rounded-[1.5rem] border-blue-400/12 bg-[linear-gradient(145deg,rgba(17,28,42,0.82),rgba(8,13,20,0.9))] p-6">
                <h3 className="font-extrabold">{item.question}</h3>
                <p className="mt-3 text-sm leading-6 text-soft">{item.answer}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-[2.25rem] border border-blue-400/20 bg-[linear-gradient(135deg,var(--sor-card-elevated),var(--sor-panel))] p-8 sm:p-12">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/12 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">Próximo passo</p>
                <h2 className="mt-4 text-3xl font-black sm:text-5xl">Pronto para dar o próximo passo?</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">Fale com um especialista e descubra a melhor solução para sua operação.</p>
              </div>
              <Button href="/diagnostico" className="shrink-0">Falar com especialista</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
