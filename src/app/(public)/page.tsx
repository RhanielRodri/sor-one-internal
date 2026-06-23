import { Container } from "@/components/public/container";
import { SectionHeading } from "@/components/public/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SorLogo } from "@/components/ui/SorLogo";
import {
  getActiveServices,
  type PublicService,
} from "@/lib/services";

export const dynamic = "force-dynamic";

const operationalMetrics = [
  ["32", "Leads capturados", "+18%"],
  ["11", "Diagnósticos", "8 enviados"],
  ["06", "Serviços ativos", "Online"],
  ["R$ 18k", "Receita potencial", "+24%"],
];

const recentActivities = [
  ["Clínica Sorriso", "Diagnóstico enviado", "Concluído"],
  ["Studio Prime", "Nova oportunidade", "Em análise"],
  ["Café da Vila", "Catálogo publicado", "Ativo"],
];

const problems = [
  {
    icon: "↗",
    title: "Clientes não te encontram",
    text: "Seu negócio fica invisível enquanto o concorrente aparece no Google. Você perde venda antes de abrir a boca.",
  },
  {
    icon: "◎",
    title: "Você perde cliente no WhatsApp",
    text: "Orçamentos sem resposta, atendimento desorganizado, cliente some. Falta de processo custa dinheiro todo dia.",
  },
  {
    icon: "◇",
    title: "Produto bom que ninguém vê",
    text: "Catálogo em PDF ou foto no story não converte. Sem vitrine profissional, sem credibilidade, sem pedido.",
  },
  {
    icon: "▦",
    title: "Tempo gasto no que não vende",
    text: "Tarefas manuais ocupam seu dia inteiro. Sem automação, você trabalha mais e cresce menos.",
  },
];

const steps = [
  {
    number: "01",
    title: "Diagnóstico gratuito",
    text: "Responda 5 perguntas em 3 minutos. Analiso seu cenário e identifico o que está travando sua captação e vendas.",
  },
  {
    number: "02",
    title: "Proposta clara",
    text: "Escopo definido, prazo real, preço justo. Você sabe exatamente o que vai receber antes de fechar.",
  },
  {
    number: "03",
    title: "Entrega e suporte",
    text: "Projeto no ar e funcionando. Você aprende a usar e tem suporte para evoluir conforme o negócio cresce.",
  },
];

const services = [
  { icon: "↗", name: "Sites institucionais", text: "Sua empresa na internet com profissionalismo e clareza." },
  { icon: "⚡", name: "Landing pages", text: "Páginas focadas em converter visitantes em contatos." },
  { icon: "◇", name: "Catálogos digitais B2B/B2C", text: "Vitrine digital com produtos, categorias e pedidos." },
  { icon: "◎", name: "Agendamento online", text: "Agenda, horários e atendimentos organizados automaticamente." },
  { icon: "▦", name: "Dashboards administrativos", text: "Painel para visualizar e controlar sua operação." },
  { icon: "⟳", name: "Automações com IA", text: "Fluxos automáticos para WhatsApp, leads e atendimento." },
];

function formatPrice(value: number | null) {
  if (value === null) return "Sob consulta";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

function getServiceIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("catálogo") || n.includes("catalogo")) return "◇";
  if (n.includes("agenda")) return "◎";
  if (n.includes("manutenção") || n.includes("manutencao")) return "↻";
  if (n.includes("ajuste")) return "⌁";
  if (n.includes("site") || n.includes("presença")) return "↗";
  return "▦";
}

export default async function HomePage() {
  let dbServices: PublicService[] = [];

  try {
    dbServices = (await getActiveServices()).slice(0, 3);
  } catch (caughtError) {
    console.error(
      "[Home] Falha ao carregar vitrine de serviços",
      caughtError instanceof Error ? caughtError.message : "Erro desconhecido",
    );
  }

  return (
    <>
      {/* HERO */}
      <section className="aurora-surface cinematic-hero relative overflow-hidden border-b border-[var(--sor-border-main)] lg:min-h-[85vh]">
        <div className="premium-grid absolute inset-0 opacity-80" />
        <div className="hero-particles absolute inset-0 hidden lg:block" />
        <div className="perspective-lines pointer-events-none absolute inset-x-[-12%] bottom-[-13rem] hidden h-[34rem] lg:block" />
        <div className="vertical-light-beam pointer-events-none absolute bottom-[-10rem] left-[58%] hidden h-[34rem] w-64 -translate-x-1/2 lg:block" />
        <div className="absolute left-[8%] top-28 h-1 w-1 rounded-full bg-[var(--sor-champagne)]/40 shadow-[0_0_16px_rgba(201,168,106,0.6)]" />
        <div className="absolute right-[12%] top-36 h-1.5 w-1.5 rounded-full bg-[var(--sor-petrol)]/40 shadow-[0_0_18px_rgba(14,165,164,0.5)]" />
        <div className="absolute bottom-24 left-[46%] h-1 w-1 rounded-full bg-[var(--sor-champagne)]/30" />
        <div className="absolute -right-[18rem] top-[-14rem] hidden h-[54rem] w-[54rem] rounded-full border border-[rgba(201,168,106,0.06)] lg:block" />
        <div className="absolute -right-[7rem] top-[-4rem] hidden h-[42rem] w-[42rem] rounded-full border border-[rgba(201,168,106,0.04)] lg:block" />

        <div className="relative mx-auto grid w-full max-w-[92rem] gap-14 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-center lg:gap-8 lg:px-10 lg:pb-20 lg:pt-16">
          <div className="relative z-10">
            <Badge>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--sor-status)] shadow-[0_0_10px_rgba(34,197,94,0.7)]" />
              Tecnologia aplicada a negócios reais
            </Badge>
            <h1 className="text-balance mt-7 max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-[3.8rem] xl:text-[4.2rem]">
              Transformo seu atendimento, site e captação de clientes em uma{" "}
              <span className="bg-[linear-gradient(90deg,#C9A86A,#D4B87A_55%,#e8d9b8)] bg-clip-text text-transparent">
                operação digital simples, profissional e pronta para crescer.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Crio sites, sistemas e automações para pequenos negócios que querem atrair mais clientes, organizar processos e reduzir trabalho manual.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/diagnostico">Solicitar diagnóstico</Button>
              <Button href="/solucoes" variant="secondary">Conhecer serviços</Button>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 border-t border-white/6 pt-6 sm:grid-cols-3">
              {[
                ["Estratégia", "Prioridade clara"],
                ["Tecnologia", "Solução proporcional"],
                ["Operação", "Evolução contínua"],
              ].map(([title, text]) => (
                <div key={title}>
                  <p className="text-sm font-extrabold text-[var(--sor-champagne)]">{title}</p>
                  <p className="mt-1 text-xs text-soft">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[54rem] lg:translate-x-4 xl:translate-x-8">
            <div aria-hidden="true" className="hero-orbit -inset-12 hidden lg:block" />
            <div aria-hidden="true" className="hero-orbit -inset-24 hidden border-[rgba(201,168,106,0.04)] lg:block" />
            <div aria-hidden="true" className="absolute -inset-[12%] rounded-full bg-[rgba(201,168,106,0.06)] blur-[110px]" />
            <div aria-hidden="true" className="perspective-floor absolute left-[4%] right-[4%] top-[94%] hidden h-56 lg:block" />
            <div aria-hidden="true" className="holographic-base absolute -bottom-20 left-[4%] right-[4%] hidden h-36 lg:block" />
            <div aria-hidden="true" className="absolute -bottom-8 left-[15%] right-[15%] hidden h-12 rounded-[50%] bg-[rgba(201,168,106,0.08)] blur-2xl lg:block" />
            <div className="console-shell glass-panel relative overflow-hidden rounded-[1.85rem]">
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-[10%] top-0 h-20 bg-[linear-gradient(to_bottom,rgba(201,168,106,0.04),transparent)]" />
              <div className="flex items-center justify-between border-b border-[var(--sor-border-main)] px-4 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-[rgba(201,168,106,0.18)] bg-[rgba(201,168,106,0.06)]">
                    <SorLogo variant="mark" className="h-7 w-7" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold" translate="no">SOR ONE Console</p>
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
                          ? "border-[rgba(201,168,106,0.22)] bg-[rgba(201,168,106,0.05)]"
                          : "border-[var(--sor-border-main)] bg-[rgba(10,14,18,0.58)]"
                      }`}
                    >
                      <p className="text-xl font-black sm:text-2xl">{value}</p>
                      <p className="mt-1 text-[10px] font-semibold text-soft">{label}</p>
                      <p className={`mt-3 text-[9px] font-bold ${index === 2 ? "text-green-400" : "text-[var(--sor-champagne)]"}`}>{detail}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
                  <div className="console-inner-card rounded-2xl border border-[var(--sor-border-main)] bg-[rgba(10,14,18,0.68)] p-5 transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-extrabold">Oportunidades</p>
                        <p className="mt-1 text-[10px] text-soft">Últimos 30 dias</p>
                      </div>
                      <span className="rounded-full bg-[rgba(201,168,106,0.08)] px-2.5 py-1 text-[9px] font-bold text-[var(--sor-champagne)]">+21%</span>
                    </div>
                    <div className="relative mt-7 flex h-36 items-end gap-2">
                      <svg aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible opacity-70" viewBox="0 0 320 120" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartLine" x1="0" x2="1">
                            <stop offset="0%" stopColor="#C9A86A" />
                            <stop offset="100%" stopColor="#D4B87A" />
                          </linearGradient>
                        </defs>
                        <path d="M0 96 C42 82, 58 89, 88 66 S145 76, 174 48 S224 55, 252 28 S294 33, 320 10" fill="none" stroke="url(#chartLine)" strokeWidth="2.5" />
                      </svg>
                      {[34, 48, 42, 61, 55, 76, 70, 88, 82, 96].map((height, index) => (
                        <span
                          key={height}
                          className="animate-bar-rise flex-1 rounded-t bg-[linear-gradient(to_top,#8B6B2A,#C9A86A_70%,#D4B87A)]"
                          style={{ height: `${height}%`, opacity: 0.4 + index * 0.05, animationDelay: `${index * 70}ms` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="console-inner-card rounded-2xl border border-green-400/10 bg-[linear-gradient(145deg,rgba(10,14,18,0.72),rgba(14,165,164,0.03))] p-5 transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-extrabold">IA & Automação</p>
                        <p className="mt-1 text-[10px] text-soft">Fluxos ativos</p>
                      </div>
                      <span className="flex items-center gap-2 rounded-full border border-green-400/15 bg-green-500/8 px-2.5 py-1 text-[9px] font-bold text-green-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--sor-status)] shadow-[0_0_10px_rgba(34,197,94,0.65)]" />
                        Ativa
                      </span>
                    </div>
                    <div className="mt-6 grid gap-3">
                      {[
                        ["Captura de leads", "Ativa"],
                        ["Organização comercial", "Ativa"],
                        ["Alertas operacionais", "Online"],
                      ].map(([name, status]) => (
                        <div key={name} className="flex items-center justify-between border-b border-white/6 pb-3 last:border-0 last:pb-0">
                          <span className="text-[10px] text-muted">{name}</span>
                          <span className="text-[9px] font-bold text-green-400">{status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="console-inner-card rounded-2xl border border-[var(--sor-border-main)] bg-[rgba(10,14,18,0.58)] p-4 transition sm:p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-extrabold">Atividades recentes</p>
                    <span className="text-[9px] font-bold text-[var(--sor-champagne)]">Agora</span>
                  </div>
                  <div className="grid gap-2">
                    {recentActivities.map(([name, activity, status], index) => (
                      <div key={name} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-3 sm:grid-cols-[1fr_1fr_auto]">
                        <p className="text-[11px] font-bold">{name}</p>
                        <p className="hidden text-[10px] text-soft sm:block">{activity}</p>
                        <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${index === 1 ? "bg-[rgba(201,168,106,0.1)] text-[var(--sor-champagne)]" : "bg-green-500/8 text-green-400"}`}>{status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMAS QUE RESOLVO */}
      <section className="border-b border-[var(--sor-border-main)] bg-[var(--sor-bg)] py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Problemas que resolvo"
            title="Se isso parece familiar, é hora de resolver."
            description="Esses problemas custam clientes todo dia. A boa notícia: todos têm solução."
            centered
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((p) => (
              <div
                key={p.title}
                className="group relative rounded-2xl border border-[var(--sor-border-main)] bg-[var(--sor-card)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--sor-border-champagne)]"
              >
                <div className="service-icon-shell mb-4 grid h-10 w-10 place-items-center rounded-xl border border-[rgba(201,168,106,0.14)] text-base text-[var(--sor-champagne)]">
                  {p.icon}
                </div>
                <h3 className="font-extrabold">{p.title}</h3>
                <p className="mt-2 text-sm leading-6 text-soft">{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* COMO FUNCIONA */}
      <section className="border-b border-[var(--sor-border-main)] bg-[var(--sor-bg-soft)] py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Como funciona"
            title="Do diagnóstico à entrega em 3 passos."
            description="Processo direto, sem reuniões intermináveis. Você vê resultado rápido."
            centered
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="step-connector absolute left-full top-8 z-10 hidden h-px w-6 -translate-y-1/2 sm:block"
                  />
                )}
                <div className="rounded-2xl border border-[var(--sor-border-main)] bg-[var(--sor-card)] p-7 transition duration-300 hover:border-[var(--sor-border-champagne)]">
                  <span className="inline-block rounded-xl border border-[rgba(201,168,106,0.22)] bg-[rgba(201,168,106,0.06)] px-3 py-1.5 text-xs font-black text-[var(--sor-champagne)]">
                    {step.number}
                  </span>
                  <h3 className="mt-5 text-xl font-black">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-soft">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SOLUÇÕES */}
      {dbServices.length > 0 ? (
        <section className="relative overflow-hidden border-b border-[var(--sor-border-main)] bg-[var(--sor-bg)] py-16 sm:py-20">
          <div className="premium-grid pointer-events-none absolute inset-0 opacity-30" />
          <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[rgba(201,168,106,0.04)] blur-3xl" />
          <Container>
            <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <SectionHeading
                eyebrow="Soluções"
                title="O que posso desenvolver para você"
                description="Escolha uma estrutura ou solicite um diagnóstico para receber uma proposta personalizada."
              />
              <Button href="/solucoes" variant="secondary" className="shrink-0">Ver todas as soluções</Button>
            </div>
            <div className="relative mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {dbServices.map((service) => (
                <Card key={service.id} className="home-service-card group relative flex min-h-[290px] flex-col overflow-hidden rounded-[1.5rem] border-[var(--sor-border-main)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--sor-border-champagne)]">
                  <div className="flex items-start justify-between gap-4">
                    <span className="service-icon-shell grid h-11 w-11 place-items-center rounded-xl border border-[rgba(201,168,106,0.14)] text-lg text-[var(--sor-champagne)]">{getServiceIcon(service.nome)}</span>
                    {service.destaque ? <span className="rounded-full border border-[var(--sor-border-champagne)] bg-[rgba(201,168,106,0.06)] px-2.5 py-1 text-[9px] font-bold text-[var(--sor-champagne)]">Destaque</span> : null}
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
                  <Button href="/diagnostico" variant="secondary" fullWidth className="mt-5 min-h-10 py-2">Solicitar diagnóstico</Button>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      ) : (
        <section className="relative overflow-hidden border-b border-[var(--sor-border-main)] bg-[var(--sor-bg)] py-16 sm:py-20">
          <div className="premium-grid pointer-events-none absolute inset-0 opacity-30" />
          <Container>
            <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <SectionHeading
                eyebrow="Soluções"
                title="O que posso desenvolver para você"
                description="Do site ao sistema, escolha a estrutura certa para o seu negócio."
              />
              <Button href="/solucoes" variant="secondary" className="shrink-0">Ver todas as soluções</Button>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <div key={s.name} className="home-service-card group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-[var(--sor-border-main)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--sor-border-champagne)]">
                  <span className="service-icon-shell grid h-10 w-10 place-items-center rounded-xl border border-[rgba(201,168,106,0.14)] text-base text-[var(--sor-champagne)]">{s.icon}</span>
                  <h3 className="mt-5 font-extrabold">{s.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-soft">{s.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* PROJETOS */}
      <section className="border-b border-[var(--sor-border-main)] bg-[var(--sor-bg-soft)] py-20 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Portfólio"
              title="Projetos construídos e em produção"
              description="Sistemas reais criados para organizar operações e gerar resultado."
            />
            <Button href="/projetos" variant="secondary" className="shrink-0">Ver todos os projetos</Button>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Card className="console-shell glass-panel relative overflow-hidden rounded-[1.75rem] border-[rgba(201,168,106,0.16)] p-7">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[rgba(201,168,106,0.18)] bg-[rgba(201,168,106,0.06)]">
                  <SorLogo variant="mark" className="h-9 w-9" />
                </span>
                <div>
                  <Badge>Plataforma própria</Badge>
                  <h3 className="mt-2 text-xl font-black" translate="no">SOR ONE Console</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted">
                Plataforma full stack em produção para captação de diagnósticos, gestão de leads, console operacional e integração com serviços.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Next.js", "Supabase", "TypeScript", "Deploy ativo"].map((tag) => (
                  <span key={tag} className="rounded-full border border-[var(--sor-border-main)] bg-[rgba(201,168,106,0.04)] px-3 py-1.5 text-xs font-semibold text-soft">
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
            <Card className="service-card-shell relative overflow-hidden rounded-[1.75rem] border-[var(--sor-border-main)] p-7">
              <div className="flex items-start justify-between">
                <span className="service-icon-shell grid h-10 w-10 place-items-center rounded-xl border border-[rgba(201,168,106,0.14)] text-base text-[var(--sor-champagne)]">◇</span>
                <Badge>Case técnico</Badge>
              </div>
              <h3 className="mt-5 text-xl font-black">CatalogPro</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                Catálogo digital para empresas B2B/B2C com produtos, categorias, solicitação de orçamento e painel administrativo.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Catálogo B2B/B2C", "Painel admin", "Pedidos online"].map((tag) => (
                  <span key={tag} className="rounded-full border border-[var(--sor-border-main)] bg-[rgba(201,168,106,0.04)] px-3 py-1.5 text-xs font-semibold text-soft">
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-[2.25rem] border border-[rgba(201,168,106,0.18)] bg-[linear-gradient(135deg,var(--sor-card-elevated),var(--sor-panel))] p-8 sm:p-12">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[rgba(201,168,106,0.06)] blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[rgba(37,99,235,0.04)] blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--sor-champagne)]">Próximo passo</p>
                <h2 className="mt-4 text-3xl font-black sm:text-5xl">Pronto para parar de perder cliente?</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
                  Responda o diagnóstico em 3 minutos e receba uma análise do que está travando seu negócio.
                </p>
              </div>
              <Button href="/diagnostico" className="shrink-0">Solicitar diagnóstico grátis</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
