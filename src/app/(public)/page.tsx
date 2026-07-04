import Link from "next/link";
import { Container } from "@/components/public/container";
import { HeroGrid3D } from "@/components/public/HeroGrid3D";
import { ConsoleMockup } from "@/components/public/ConsoleMockup";
import { ServicesShowcase } from "@/components/public/services-showcase";
import { RevealManager } from "@/components/public/reveal-manager";
import { getActiveServices, type PublicService } from "@/lib/services";
import { SOR_WHATSAPP_URL } from "@/lib/whatsapp";
import {
  staticServiceShowcase,
  toShowcaseFromServices,
  type ServiceShowcaseItem,
} from "@/data/service-catalog";

export const dynamic = "force-dynamic";

const stats = [
  { value: "4", label: "Projetos online" },
  { value: "100%", label: "Em produção" },
  { value: "3min", label: "Diagnóstico" },
  { value: "Vila Velha", label: "ES — Brasil" },
];

const mobileDashboardProjects = [
  "AgendaFácil — Studio Cut",
  "CatalogPro B2B",
  "MesaFlow",
  "Barber Prime",
];

function MobileProjectDashboard() {
  return (
    <div
      data-testid="mobile-project-dashboard"
      className="mt-8 block w-full overflow-hidden rounded-xl border border-[var(--border-soft)] bg-[linear-gradient(160deg,var(--card-elevated),var(--card-deep))] text-xs shadow-[0_20px_50px_rgba(0,0,0,0.35)] md:hidden"
    >
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border-soft)] px-4 py-3">
        <p className="min-w-0 font-bold text-[var(--text)]">
          DASHBOARD <span className="text-soft">· Projetos online</span>
        </p>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-green-500/25 bg-green-500/8 px-2 py-1 text-[10px] font-bold text-green-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
          Sistema Ativo
        </span>
      </div>

      <ul className="divide-y divide-[var(--border-soft)] px-4">
        {mobileDashboardProjects.map((project) => (
          <li key={project} className="flex items-center justify-between gap-3 py-3">
            <span className="min-w-0 truncate font-semibold text-[#e5e5e5]">
              {project}
            </span>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-[10px] font-bold text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              ONLINE
            </span>
          </li>
        ))}
      </ul>

      <p className="border-t border-[var(--border-soft)] px-4 py-3 text-center text-soft">
        <strong className="text-[var(--text)]">4 / 4 projetos online</strong> ·
        100% em produção
      </p>
    </div>
  );
}

const problems = [
  {
    icon: "↗",
    title: "Clientes não te encontram",
    text: "Seu negócio fica invisível enquanto o concorrente aparece no Google. Você perde venda antes de abrir a boca — e nem sabe quantas.",
  },
  {
    icon: "◎",
    title: "Você perde cliente no WhatsApp",
    text: "Orçamentos sem resposta, atendimento desorganizado, cliente some. Falta de processo custa dinheiro todo dia — e é invisível no extrato.",
  },
  {
    icon: "◇",
    title: "Produto bom que ninguém vê",
    text: "Catálogo em PDF ou foto no story não converte. Sem vitrine profissional, sem credibilidade — o cliente vai pro concorrente que parece maior.",
  },
  {
    icon: "▦",
    title: "Tempo gasto no que não vende",
    text: "Agendamento manual, planilha de controle, resposta repetitiva no WhatsApp. Tarefas que um sistema resolve em segundos tomam horas do seu dia.",
  },
];

const steps = [
  {
    number: "01",
    title: "Diagnóstico gratuito",
    text: "Responda 5 perguntas em 3 minutos. Analiso seu cenário e identifico o que está travando sua captação e vendas. Sem compromisso.",
  },
  {
    number: "02",
    title: "Proposta clara",
    text: "Escopo definido, prazo real, preço justo. Você sabe exatamente o que vai receber, quando vai receber e o que vai custar — antes de fechar.",
  },
  {
    number: "03",
    title: "Entrega e suporte",
    text: "Projeto no ar e funcionando. Você aprende a usar, tem suporte direto e pode evoluir conforme o negócio cresce.",
  },
];

const flows = [
  {
    icon: "◎",
    title: "Captura de Lead",
    nodes: [
      "Cliente preenche diagnóstico",
      "Lead salvo no console",
      "Notificação no WhatsApp",
      "Resposta automática em 2 min",
    ],
  },
  {
    icon: "⟳",
    title: "Agendamento Automático",
    nodes: [
      "Cliente acessa AgendaFácil",
      "Escolhe horário disponível",
      "Confirmação por WhatsApp",
      "Lembrete 1h antes",
    ],
  },
  {
    icon: "◇",
    title: "Catálogo + Pedido B2B",
    nodes: [
      "Cliente acessa CatalogPro",
      "Seleciona produtos",
      "Solicita cotação",
      "Vendedor notificado na hora",
    ],
  },
];

export default async function HomePage() {
  let showcaseItems: ServiceShowcaseItem[] = staticServiceShowcase;

  try {
    const dbServices: PublicService[] = await getActiveServices();
    if (dbServices.length > 0) {
      showcaseItems = toShowcaseFromServices(dbServices);
    }
  } catch (caughtError) {
    console.error(
      "[Home] Falha ao carregar vitrine de serviços",
      caughtError instanceof Error ? caughtError.message : "Erro desconhecido",
    );
  }

  return (
    <>
      <RevealManager />

      <section
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: "100vh", paddingTop: 72, background: "var(--bg)" }}
      >
        <HeroGrid3D />

        <Container className="relative z-10 max-w-[1280px] py-16">
          <div className="grid items-center gap-12 xl:grid-cols-[1.05fr_0.95fr] xl:gap-20">
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{
                  border: "1px solid var(--champagne-border)",
                  background: "var(--champagne-dim)",
                  color: "var(--text-muted-2)",
                }}
              >
                <span
                  className="status-pulse"
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 9999,
                    background: "var(--green)",
                    animation: "pulse-dot 2s ease-in-out infinite",
                  }}
                />
                Sistema operacional · Vila Velha, ES
              </span>

              <h1
                className="mt-7 font-black tracking-[-0.04em]"
                style={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: "clamp(40px, 6vw, 72px)",
                  lineHeight: 1.04,
                  color: "var(--text)",
                }}
              >
                Tecnologia que
                <br />
                <em style={{ fontStyle: "normal", color: "var(--champagne)" }}>
                  gera resultado.
                </em>
              </h1>

              <p
                className="mt-6 max-w-[480px] text-[17px] leading-7"
                style={{ color: "var(--text-muted-2)" }}
              >
                Crio sites, sistemas e automações para negócios locais venderem
                mais e trabalharem menos.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/diagnostico"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm transition hover:opacity-90"
                  style={{
                    background: "var(--champagne)",
                    color: "#060709",
                    fontFamily: "var(--font-manrope), sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Solicitar diagnóstico
                </Link>
                <Link
                  href="/projetos"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:border-[var(--champagne-border)]"
                  style={{
                    border: "1px solid var(--border-soft)",
                    color: "var(--text)",
                  }}
                >
                  Ver projetos →
                </Link>
              </div>

              <MobileProjectDashboard />

              <div
                className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t pt-7 sm:grid-cols-4"
                style={{ borderColor: "var(--border-soft)" }}
              >
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div
                      className="font-black"
                      style={{
                        fontFamily: "var(--font-manrope), sans-serif",
                        fontSize: "clamp(20px, 2.4vw, 26px)",
                        color: "var(--text)",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="mt-1 text-xs"
                      style={{ color: "var(--sor-text-soft)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              <ConsoleMockup />
            </div>
          </div>
        </Container>

        <div
          className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 xl:flex"
          style={{ color: "var(--sor-text-soft)" }}
        >
          <span className="text-[10px] uppercase tracking-[0.24em]">Scroll</span>
          <span
            className="scroll-hint-arrow text-sm"
            style={{ animation: "bounce-down 1.6s ease-in-out infinite" }}
          >
            ↓
          </span>
        </div>
      </section>

      <section
        className="reveal border-b py-20 sm:py-24"
        style={{ background: "var(--bg)", borderColor: "var(--border-soft)" }}
      >
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--sor-champagne)]">
            Problemas que resolvo
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-black tracking-[-0.035em] sm:text-4xl">
            Se isso parece familiar, é hora de mudar.
          </h2>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {problems.map((problem) => (
              <div
                key={problem.title}
                className="group rounded-2xl border p-7 transition duration-300 hover:-translate-y-1"
                style={{
                  borderColor: "var(--border-soft)",
                  background: "var(--card-deep)",
                }}
              >
                <div className="service-icon-shell grid h-11 w-11 place-items-center rounded-xl border border-[rgba(201,168,106,0.14)] text-lg text-[var(--sor-champagne)]">
                  {problem.icon}
                </div>
                <h3 className="mt-5 text-lg font-extrabold">{problem.title}</h3>
                <p className="mt-2 text-sm leading-6 text-soft">{problem.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section
        className="reveal border-b py-20 sm:py-24"
        style={{ background: "var(--bg-soft)", borderColor: "var(--border-soft)" }}
      >
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--sor-champagne)]">
            Soluções
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-black tracking-[-0.035em] sm:text-4xl">
            O que posso desenvolver para o seu negócio
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
            Cada solução é desenvolvida sob medida para o que o seu negócio
            precisa hoje — sem inflar escopo, sem cobrar pelo que você não vai
            usar.
          </p>

          <div className="mt-10">
            <ServicesShowcase items={showcaseItems} />
          </div>

          <div className="mt-8">
            <Link
              href="/solucoes"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--sor-champagne)] transition hover:opacity-80"
            >
              Ver todas as soluções →
            </Link>
          </div>
        </Container>
      </section>

      <section
        className="reveal border-b py-20 sm:py-24"
        style={{ background: "var(--bg)", borderColor: "var(--border-soft)" }}
      >
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--sor-champagne)]">
            Como funciona
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-black tracking-[-0.035em] sm:text-4xl">
            Do diagnóstico à entrega em 3 passos.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
            Processo direto, sem reuniões intermináveis e sem enrolação. Você
            sabe onde está o projeto em cada etapa.
          </p>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {index < steps.length - 1 ? (
                  <div
                    aria-hidden="true"
                    className="step-connector absolute left-full top-8 z-10 hidden h-px w-6 -translate-y-1/2 sm:block"
                  />
                ) : null}
                <div
                  className="rounded-2xl border p-7 transition duration-300 hover:border-[var(--champagne-border)]"
                  style={{
                    borderColor: "var(--border-soft)",
                    background: "var(--card-deep)",
                  }}
                >
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

      <section
        className="reveal border-b py-20 sm:py-24"
        style={{ background: "var(--bg-soft)", borderColor: "var(--border-soft)" }}
      >
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--sor-champagne)]">
            Automações com IA
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-black tracking-[-0.035em] sm:text-4xl">
            Seu negócio respondendo enquanto você dorme.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
            Fluxos automáticos para captura, agendamento e vendas — o cliente é
            atendido na hora, mesmo fora do horário comercial.
          </p>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {flows.map((flow) => (
              <div
                key={flow.title}
                className="rounded-2xl border p-6"
                style={{
                  borderColor: "var(--border-soft)",
                  background: "var(--card-deep)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="service-icon-shell grid h-10 w-10 place-items-center rounded-xl border border-[rgba(201,168,106,0.14)] text-base text-[var(--sor-champagne)]">
                    {flow.icon}
                  </span>
                  <h3 className="text-base font-black">{flow.title}</h3>
                </div>

                <div className="mt-5 grid gap-2">
                  {flow.nodes.map((node, index) => {
                    const highlighted =
                      index === 0 || index === flow.nodes.length - 1;
                    return (
                      <div key={node}>
                        <div
                          className="rounded-xl border px-4 py-3 text-xs font-semibold"
                          style={{
                            borderColor: highlighted
                              ? "var(--champagne-border)"
                              : "var(--border-soft)",
                            background: highlighted
                              ? "var(--champagne-dim)"
                              : "rgba(6,7,9,0.4)",
                            color: highlighted
                              ? "var(--sor-champagne)"
                              : "var(--text-muted-2)",
                          }}
                        >
                          {node}
                        </div>
                        {index < flow.nodes.length - 1 ? (
                          <div
                            aria-hidden="true"
                            className="mx-auto h-3 w-px"
                            style={{ background: "var(--border-soft)" }}
                          />
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section
        className="reveal relative overflow-hidden py-32 sm:py-40"
        style={{ background: "var(--bg)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] max-w-[94vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(201,168,106,0.16), transparent 60%)",
            filter: "blur(40px)",
          }}
        />
        <Container className="relative text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-black tracking-[-0.04em] sm:text-5xl">
            Pronto para parar de perder cliente?
          </h2>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/diagnostico"
              className="inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm transition hover:opacity-90"
              style={{
                background: "var(--champagne)",
                color: "#060709",
                fontFamily: "var(--font-manrope), sans-serif",
                fontWeight: 700,
              }}
            >
              Solicitar diagnóstico grátis
            </Link>
            <a
              href={SOR_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm font-semibold transition hover:border-[var(--champagne-border)]"
              style={{ border: "1px solid var(--border-soft)", color: "var(--text)" }}
            >
              Falar no WhatsApp →
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
