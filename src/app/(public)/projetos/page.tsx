import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/public/container";
import { siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Demonstrações — Sistemas implantados pela SOR ONE",
  description:
    "Ambientes demonstrativos de negócios fictícios usando sistemas implantados pela SOR ONE: atendimento e triagem, agendamento para barbearia e agendamento para estética. Configurados para a operação de cada negócio.",
  keywords: [
    "demonstração de sistema",
    "sistema de agendamento",
    "atendimento com automação",
    "implantação de sistemas",
    "SOR ONE",
  ],
  openGraph: {
    title: "Demonstrações | SOR ONE",
    description:
      "Ambientes demonstrativos de sistemas implantados pela SOR ONE, configurados para a operação de cada negócio.",
    url: `${siteUrl}/projetos`,
    siteName: "SOR ONE",
    locale: "pt_BR",
    type: "website",
  },
};

type Demo = {
  icon: string;
  category: string;
  name: string;
  description: string;
  demoUrl: string;
  demoHost: string;
  cta: string;
  highlights: string[];
};

const demos: Demo[] = [
  {
    icon: "⟳",
    category: "Atendimento, triagem e operação",
    name: "NovaTech Assistência",
    description:
      "Uma assistência técnica demonstrativa que recebe o cliente, conduz a triagem, registra a solicitação e organiza o acompanhamento do serviço.",
    demoUrl: "https://demo-assistencia-tecnica.sor-os-demos.workers.dev",
    demoHost: "demo-assistencia-tecnica.sor-os-demos.workers.dev",
    cta: "Explorar ambiente",
    highlights: [
      "Recepção do cliente",
      "Triagem guiada",
      "Registro da solicitação",
      "Acompanhamento do serviço",
    ],
  },
  {
    icon: "◎",
    category: "Agendamento e gestão para barbearia",
    name: "Studio Cut",
    description:
      "Uma jornada de agendamento com serviços, profissionais, horários e painel administrativo.",
    demoUrl: "https://agendafacil-sistema.vercel.app/demo/studio-cut",
    demoHost: "agendafacil-sistema.vercel.app/demo/studio-cut",
    cta: "Ver demonstração",
    highlights: [
      "Agendamento online",
      "Escolha de profissional",
      "Horários disponíveis",
      "Painel administrativo",
    ],
  },
  {
    icon: "◇",
    category: "Agendamento e relacionamento para estética",
    name: "Lumière Estética",
    description:
      "Uma experiência de agendamento com serviços, profissionais e identidade configurada para uma operação de estética.",
    demoUrl: "https://agendafacil-sistema.vercel.app/demo/lumiere",
    demoHost: "agendafacil-sistema.vercel.app/demo/lumiere",
    cta: "Ver implantação",
    highlights: [
      "Agendamento de procedimentos",
      "Escolha de horário",
      "Confirmação online",
      "Painel administrativo",
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
              Demonstrações
            </span>
            <h1
              className="mt-6 text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            >
              Sistemas implantados pela SOR ONE, funcionando.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
              Ambientes demonstrativos de negócios fictícios, cada um usando um
              sistema configurado para a sua operação.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-22">
        <Container>
          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {demos.map((demo) => (
              <article
                key={demo.name}
                className="group flex flex-col overflow-hidden rounded-[1.75rem] border p-7 transition duration-300 hover:-translate-y-1.5"
                style={{
                  borderColor: "var(--border-soft)",
                  background: "var(--card-deep)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-[rgba(201,168,106,0.14)] text-lg text-[var(--sor-champagne)]">
                    {demo.icon}
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--sor-champagne)]">
                    {demo.category}
                  </p>
                </div>

                <h2 className="mt-4 text-2xl font-black tracking-[-0.025em]">
                  {demo.name}
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted">
                  {demo.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {demo.highlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--border-soft)] bg-white/2 px-3 py-1.5 text-xs font-medium text-soft"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-7">
                  <a
                    href={demo.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-[var(--champagne)] px-5 py-2.5 text-sm font-bold text-[#060709] transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sor-champagne)]"
                  >
                    {demo.cta} →
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-[var(--sor-text-soft)]">
            Ambiente demonstrativo desenvolvido pela SOR ONE.
          </p>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--champagne-border)] bg-[linear-gradient(135deg,var(--card-elevated),var(--card-deep))] p-8 text-center sm:p-12">
            <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Quer um sistema assim para o seu negócio?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted">
              Comece pelo diagnóstico. Em poucos minutos eu entendo seu cenário e
              digo o que faz sentido implantar primeiro, no porte da sua operação.
            </p>
            <Link
              href="/diagnostico"
              className="mt-7 inline-flex items-center justify-center rounded-xl bg-[var(--champagne)] px-7 py-3.5 text-sm font-bold text-[#060709] transition hover:opacity-90"
            >
              Solicitar diagnóstico
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
