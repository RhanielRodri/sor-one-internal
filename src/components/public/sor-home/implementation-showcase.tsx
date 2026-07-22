import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BrowserFrame } from "@/components/public/browser-frame";
import { Container } from "@/components/public/container";

const novatechJourney = [
  { stage: "Entrada", detail: "Cliente descreve o problema do aparelho" },
  { stage: "Triagem", detail: "Perguntas rápidas capturam o contexto" },
  { stage: "Solicitação", detail: "Registro estruturado, com identificação" },
  { stage: "Encaminhamento", detail: "Equipe recebe a próxima ação" },
  { stage: "Acompanhamento", detail: "Andamento organizado até a entrega" },
];

export function NovatechComposition() {
  return (
    <BrowserFrame label="NovaTech Assistência — jornada de atendimento">
      <div className="grid grid-cols-1 gap-2 p-4 sm:p-5">
        {novatechJourney.map((step, index) => (
          <div key={step.stage} className="relative">
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="absolute -top-2 left-[15px] h-2 w-px bg-[rgba(201,168,106,0.25)]"
              />
            ) : null}
            <div className="flex items-center gap-3 rounded-xl border border-[var(--border-soft)] bg-[rgba(6,7,9,0.5)] px-3.5 py-2.5">
              <span
                aria-hidden="true"
                className="grid h-2 w-2 shrink-0 place-items-center rounded-full bg-[var(--sor-champagne)]"
                style={{ marginLeft: 11, marginRight: 3 }}
              />
              <div className="min-w-0">
                <p className="m-0 text-[12px] font-bold text-[var(--text)]">{step.stage}</p>
                <p className="m-0 truncate text-[11px] text-[var(--sor-text-soft)]">
                  {step.detail}
                </p>
              </div>
              {index === 3 ? (
                <span className="ml-auto shrink-0 rounded-full border border-[rgba(14,165,164,0.3)] bg-[rgba(14,165,164,0.08)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-[var(--sor-petrol)]">
                  WhatsApp
                </span>
              ) : null}
            </div>
          </div>
        ))}
        <p className="m-0 mt-1 text-center text-[10px] text-[var(--text-soft-2)]">
          Composição baseada no fluxo implantado
        </p>
      </div>
    </BrowserFrame>
  );
}

type Showcase = {
  id: string;
  category: string;
  name: string;
  description: string;
  modules: string[];
  visual: ReactNode;
  cta:
    | { kind: "external"; label: string; href: string }
    | { kind: "internal"; label: string; href: string };
};

const showcases: Showcase[] = [
  {
    id: "novatech",
    category: "Atendimento, triagem e operação para assistência técnica",
    name: "NovaTech Assistência",
    description:
      "O cliente chega pelo canal que já usa e a conversa vira serviço rastreável: o atendimento entende o contexto, a solicitação é registrada e encaminhada, e a operação acompanha o andamento.",
    modules: [
      "Landing",
      "Atendimento",
      "Triagem",
      "Registro de solicitação",
      "Encaminhamento",
      "Acompanhamento",
      "Automação e WhatsApp",
    ],
    visual: <NovatechComposition />,
    cta: {
      kind: "external",
      label: "Explorar ambiente",
      href: "https://demo-assistencia-tecnica.sor-os-demos.workers.dev",
    },
  },
  {
    id: "studio-cut",
    category: "Landing e sistema de agendamento para barbearia",
    name: "Studio Cut",
    description:
      "Uma barbearia com presença própria: a landing apresenta serviços e profissionais, o cliente agenda sozinho e a administração acompanha horários e clientes em um painel.",
    modules: [
      "Landing própria",
      "Serviços",
      "Profissionais",
      "Agendamento",
      "Gestão administrativa",
    ],
    visual: (
      <BrowserFrame label="Studio Cut — landing e agendamento">
        <Image
          src="/screenshots/studio-cut.png"
          alt="Landing page da Studio Cut, barbearia demonstrativa, com destaque para agendamento online"
          width={1440}
          height={900}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="h-auto w-full"
        />
      </BrowserFrame>
    ),
    cta: {
      kind: "internal",
      label: "Conhecer solução de agendamento",
      href: "/solucoes/agendamento#demos",
    },
  },
  {
    id: "lumiere",
    category: "Landing e sistema de agendamento para estética",
    name: "Lumière Estética",
    description:
      "Uma clínica de estética com identidade delicada e agenda organizada: tratamentos e profissionais apresentados na landing, agendamento online e gestão administrativa.",
    modules: [
      "Landing própria",
      "Tratamentos",
      "Profissionais",
      "Agendamento",
      "Gestão administrativa",
    ],
    visual: (
      <BrowserFrame label="Lumière Estética — landing e agendamento">
        <Image
          src="/screenshots/lumiere.png"
          alt="Landing page da Lumière Estética, clínica demonstrativa, com agendamento de tratamentos"
          width={1440}
          height={900}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="h-auto w-full"
        />
      </BrowserFrame>
    ),
    cta: {
      kind: "internal",
      label: "Conhecer solução de agendamento",
      href: "/solucoes/agendamento#demos",
    },
  },
];

export function ImplementationShowcase() {
  return (
    <section
      id="implantacoes"
      className="scroll-mt-24 border-b border-[var(--border-soft)] bg-[var(--bg)] py-20 sm:py-24"
    >
      <Container className="max-w-[80rem]">
        <p className="reveal m-0 text-xs font-bold uppercase tracking-[0.2em] text-[var(--sor-champagne)]">
          Implantações demonstrativas
        </p>
        <h2 className="reveal mt-4 max-w-2xl text-3xl font-extrabold tracking-[-0.035em] text-[var(--text)] sm:text-4xl">
          Três negócios fictícios, três operações organizadas.
        </h2>
        <p className="reveal mt-5 max-w-2xl text-base leading-relaxed text-[var(--sor-text-muted)]">
          Cada ambiente mostra uma implantação real da SOR ONE em
          funcionamento — do jeito que ela seria configurada para um negócio
          daquele segmento.
        </p>

        <div className="mt-14 grid gap-16 lg:gap-20">
          {showcases.map((item, index) => (
            <article
              key={item.id}
              data-reveal-group
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14"
            >
              <div
                className={`reveal reveal-scale ${index % 2 === 1 ? "lg:order-2" : ""}`}
              >
                {item.visual}
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <p className="reveal m-0 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--sor-champagne)]">
                  {item.category}
                </p>
                <h3 className="reveal mt-3 text-2xl font-extrabold tracking-[-0.03em] text-[var(--text)] sm:text-3xl">
                  {item.name}
                </h3>
                <p className="reveal mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--text-muted-2)]">
                  {item.description}
                </p>
                <ul className="reveal m-0 mt-5 flex list-none flex-wrap gap-2 p-0">
                  {item.modules.map((module) => (
                    <li
                      key={module}
                      className="rounded-full border border-[var(--border-soft)] bg-[rgba(255,255,255,0.02)] px-3 py-1.5 text-xs font-medium text-[var(--sor-text-muted)]"
                    >
                      {module}
                    </li>
                  ))}
                </ul>
                <div className="reveal mt-7 flex flex-wrap items-center gap-4">
                  {item.cta.kind === "external" ? (
                    <a
                      href={item.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--champagne)] px-6 py-3 text-sm font-bold text-[#060709] transition hover:bg-[var(--sor-champagne-hover)]"
                    >
                      {item.cta.label} →
                    </a>
                  ) : (
                    <Link
                      href={item.cta.href}
                      className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--champagne-border)] bg-[var(--champagne-dim)] px-6 py-3 text-sm font-bold text-[var(--sor-champagne)] transition hover:border-[rgba(201,168,106,0.4)] hover:bg-[rgba(201,168,106,0.14)]"
                    >
                      {item.cta.label} →
                    </Link>
                  )}
                  <span className="text-[11px] text-[var(--text-soft-2)]">
                    Implantação demonstrativa · negócio fictício
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
