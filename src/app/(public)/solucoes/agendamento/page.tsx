import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrowserFrame } from "@/components/public/browser-frame";
import { Container } from "@/components/public/container";
import { siteUrl } from "@/lib/constants";

const STUDIO_CUT_URL = "https://studio-cut-public.sor-os-demos.workers.dev";
const LUMIERE_URL = "https://lumiere-public.sor-os-demos.workers.dev";

export const metadata: Metadata = {
  title: "Sistema de agendamento online para negócios",
  description:
    "A SOR ONE implanta agendamento online, agenda, clientes, leads e painel administrativo configurados para a operação de barbearias, salões, clínicas e negócios de atendimento.",
  keywords: [
    "sistema de agendamento online",
    "agenda para barbearia",
    "agenda para clínica de estética",
    "painel administrativo",
    "SOR ONE",
  ],
  alternates: {
    canonical: `${siteUrl}/solucoes/agendamento`,
  },
  openGraph: {
    title: "Agendamento online configurado para sua operação | SOR ONE",
    description:
      "Uma implantação da SOR ONE para organizar serviços, profissionais, horários, clientes e relacionamento em um só fluxo.",
    url: `${siteUrl}/solucoes/agendamento`,
    siteName: "SOR ONE",
    locale: "pt_BR",
    type: "website",
  },
};

const capabilities = [
  {
    title: "Agendamento online",
    description:
      "O cliente escolhe serviço ou procedimento, profissional e um horário realmente disponível.",
  },
  {
    title: "Disponibilidade em tempo real",
    description:
      "A agenda considera horários de trabalho, duração do atendimento e bloqueios antes de oferecer cada vaga.",
  },
  {
    title: "Prevenção de conflitos",
    description:
      "O mesmo horário não pode ser ocupado duas vezes, mesmo quando os pedidos acontecem ao mesmo tempo.",
  },
  {
    title: "Clientes, leads e follow-ups",
    description:
      "Contatos, oportunidades e próximas ações ficam organizados para a equipe continuar o relacionamento.",
  },
  {
    title: "Horários e bloqueios",
    description:
      "A operação controla disponibilidade recorrente, pausas, folgas e indisponibilidades pontuais.",
  },
  {
    title: "Painel e indicadores",
    description:
      "Agenda, serviços, profissionais, clientes e indicadores operacionais ficam reunidos em uma área protegida.",
  },
];

const steps = [
  {
    number: "01",
    title: "Entendemos a operação",
    description:
      "Mapeamos serviços, profissionais, regras de agenda e o caminho atual do cliente.",
  },
  {
    number: "02",
    title: "Configuramos a solução",
    description:
      "Adaptamos identidade, linguagem, catálogo, disponibilidade e acessos ao segmento.",
  },
  {
    number: "03",
    title: "Colocamos em funcionamento",
    description:
      "Publicamos o ambiente, validamos os fluxos e entregamos a operação pronta para uso.",
  },
];

const demos = [
  {
    name: "Studio Cut",
    segment: "Versão para barbearias",
    description:
      "Serviços, barbeiros e uma jornada direta de agendamento, com identidade própria para o segmento.",
    image: "/screenshots/studio-cut.png",
    alt: "Página da Studio Cut com serviços de barbearia e agendamento online",
    href: STUDIO_CUT_URL,
    cta: "Testar versão para barbearias",
  },
  {
    name: "Lumière Estética",
    segment: "Versão para estética",
    description:
      "Procedimentos, profissionais e uma experiência de agendamento alinhada a uma marca de estética premium.",
    image: "/screenshots/lumiere.png",
    alt: "Página da Lumière Estética com procedimentos e agendamento online",
    href: LUMIERE_URL,
    cta: "Testar versão para estética",
  },
];

export default function SchedulingSolutionPage() {
  return (
    <div className="bg-[var(--bg)]">
      <section className="relative overflow-hidden border-b border-[var(--border-soft)] py-20 sm:py-28">
        <div className="premium-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-12 h-80 w-[52rem] max-w-[96vw] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(circle at center, rgba(201,168,106,0.13), transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <Container className="relative max-w-[80rem]">
          <div className="mx-auto max-w-4xl text-center">
            <p className="reveal m-0 inline-flex items-center rounded-full border border-[var(--champagne-border)] bg-[var(--champagne-dim)] px-3.5 py-1.5 text-xs font-bold text-[var(--sor-champagne)]">
              Solução de agendamento e relacionamento
            </p>
            <h1 className="reveal mt-6 text-balance text-4xl font-extrabold tracking-[-0.045em] text-[var(--text)] sm:text-5xl lg:text-6xl">
              Sua agenda organizada do primeiro contato ao próximo atendimento.
            </h1>
            <p className="reveal mx-auto mt-6 max-w-3xl text-lg leading-8 text-[var(--sor-text-muted)]">
              A SOR ONE implanta uma solução configurada para o seu negócio:
              presença online, agendamento, equipe, clientes e gestão em um
              fluxo único. Não é um sistema genérico para você montar sozinho.
            </p>
            <div className="reveal mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="#demos"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--champagne)] px-6 py-3 text-sm font-bold text-[#060709] transition hover:bg-[var(--sor-champagne-hover)]"
              >
                Ver versões demonstrativas
              </Link>
              <Link
                href="/diagnostico"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--champagne-border)] bg-[var(--champagne-dim)] px-6 py-3 text-sm font-bold text-[var(--sor-champagne)] transition hover:border-[rgba(201,168,106,0.4)] hover:bg-[rgba(201,168,106,0.14)]"
              >
                Solicitar solução personalizada
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--border-soft)] bg-[var(--bg-soft)] py-20 sm:py-24">
        <Container className="max-w-[80rem]">
          <div className="max-w-3xl">
            <p className="reveal m-0 text-xs font-bold uppercase tracking-[0.2em] text-[var(--sor-champagne)]">
              Operação completa
            </p>
            <h2 className="reveal mt-4 text-balance text-3xl font-extrabold tracking-[-0.035em] text-[var(--text)] sm:text-4xl">
              Mais do que abrir horários na internet.
            </h2>
            <p className="reveal mt-5 text-base leading-7 text-[var(--sor-text-muted)] sm:text-lg">
              A implantação conecta a experiência do cliente à rotina de quem
              atende e administra o negócio.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => (
              <article
                key={capability.title}
                className="reveal home-service-card relative overflow-hidden rounded-2xl border border-[var(--border-soft)] p-6"
              >
                <span className="mb-5 block h-1.5 w-9 rounded-full bg-[var(--champagne)]" aria-hidden="true" />
                <h3 className="text-lg font-extrabold text-[var(--text)]">
                  {capability.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--sor-text-muted)]">
                  {capability.description}
                </p>
              </article>
            ))}
          </div>

          <div className="reveal mt-10 rounded-2xl border border-[var(--champagne-border)] bg-[var(--champagne-dim)] p-6 sm:p-8">
            <p className="text-sm leading-7 text-[var(--sor-text-muted)] sm:text-base">
              <strong className="text-[var(--text)]">Personalização por segmento.</strong>{" "}
              Serviços ou procedimentos, nomenclaturas, identidade visual,
              profissionais, regras de disponibilidade e jornada do cliente são
              configurados para a realidade de cada operação.
            </p>
          </div>
        </Container>
      </section>

      <section id="demos" className="scroll-mt-24 border-b border-[var(--border-soft)] py-20 sm:py-24">
        <Container className="max-w-[80rem]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="reveal m-0 text-xs font-bold uppercase tracking-[0.2em] text-[var(--sor-champagne)]">
              Ambientes funcionais
            </p>
            <h2 className="reveal mt-4 text-balance text-3xl font-extrabold tracking-[-0.035em] text-[var(--text)] sm:text-4xl">
              Teste a mesma base adaptada a dois segmentos.
            </h2>
            <p className="reveal mt-5 text-base leading-7 text-[var(--sor-text-muted)] sm:text-lg">
              As demonstrações são negócios fictícios em ambientes públicos
              reais. Os painéis administrativos não são expostos nesta página.
            </p>
          </div>

          <div className="mt-12 grid min-w-0 gap-6 lg:grid-cols-2">
            {demos.map((demo) => (
              <article
                key={demo.name}
                className="reveal min-w-0 rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--card-deep)] p-5 sm:p-7"
              >
                <BrowserFrame label={`${demo.name} — demonstração pública`}>
                  <Image
                    src={demo.image}
                    alt={demo.alt}
                    width={1440}
                    height={900}
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="h-auto w-full"
                  />
                </BrowserFrame>
                <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--sor-champagne)]">
                  {demo.segment}
                </p>
                <h3 className="mt-2 text-2xl font-extrabold text-[var(--text)]">
                  {demo.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--sor-text-muted)]">
                  {demo.description}
                </p>
                <a
                  href={demo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[var(--champagne)] px-5 py-3 text-center text-sm font-bold text-[#060709] transition hover:bg-[var(--sor-champagne-hover)] sm:w-auto"
                >
                  {demo.cta} →
                </a>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--border-soft)] bg-[var(--bg-soft)] py-20 sm:py-24">
        <Container className="max-w-[80rem]">
          <div className="max-w-3xl">
            <p className="reveal m-0 text-xs font-bold uppercase tracking-[0.2em] text-[var(--sor-champagne)]">
              Implantação SOR ONE
            </p>
            <h2 className="reveal mt-4 text-balance text-3xl font-extrabold tracking-[-0.035em] text-[var(--text)] sm:text-4xl">
              A tecnologia entra pronta para servir ao processo.
            </h2>
          </div>
          <ol className="mt-12 grid list-none gap-5 p-0 lg:grid-cols-3">
            {steps.map((step) => (
              <li
                key={step.number}
                className="reveal rounded-2xl border border-[var(--border-soft)] bg-[var(--bg)] p-6"
              >
                <span className="text-xs font-extrabold tracking-[0.18em] text-[var(--sor-champagne)]">
                  {step.number}
                </span>
                <h3 className="mt-4 text-xl font-extrabold text-[var(--text)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--sor-text-muted)]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="max-w-[80rem]">
          <div className="reveal relative overflow-hidden rounded-[2rem] border border-[var(--champagne-border)] bg-[linear-gradient(135deg,var(--card-elevated),var(--card-deep))] p-8 text-center sm:p-12">
            <h2 className="text-balance text-3xl font-extrabold tracking-[-0.04em] text-[var(--text)] sm:text-4xl">
              Quer essa operação configurada para o seu negócio?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[var(--sor-text-muted)]">
              Conte como sua agenda funciona hoje. O diagnóstico identifica a
              primeira implantação necessária e o nível de personalização do
              projeto.
            </p>
            <Link
              href="/diagnostico"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--champagne)] px-7 py-3.5 text-sm font-bold text-[#060709] transition hover:bg-[var(--sor-champagne-hover)]"
            >
              Solicitar solução personalizada
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
