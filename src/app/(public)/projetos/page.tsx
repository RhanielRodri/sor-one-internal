import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrowserFrame } from "@/components/public/browser-frame";
import { Container } from "@/components/public/container";
import { NovatechComposition } from "@/components/public/sor-home/implementation-showcase";
import { siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Implantações demonstrativas — Sistemas da SOR ONE em funcionamento",
  description:
    "Três negócios fictícios usando implantações reais da SOR ONE: atendimento e triagem para assistência técnica, landing e agendamento para barbearia e para clínica de estética.",
  keywords: [
    "implantação de sistemas",
    "sistema de agendamento",
    "atendimento com automação",
    "demonstração de sistema",
    "SOR ONE",
  ],
  openGraph: {
    title: "Implantações demonstrativas | SOR ONE",
    description:
      "Negócios fictícios usando implantações reais da SOR ONE, configuradas para a operação de cada segmento.",
    url: `${siteUrl}/projetos`,
    siteName: "SOR ONE",
    locale: "pt_BR",
    type: "website",
  },
};

type Implementation = {
  id: string;
  category: string;
  name: string;
  context: string;
  problem: string;
  journey: { stage: string; detail: string }[];
  modules: string[];
  visual: React.ReactNode;
  externalCta?: { label: string; href: string };
};

const implementations: Implementation[] = [
  {
    id: "novatech",
    category: "Atendimento, triagem e operação para assistência técnica",
    name: "NovaTech Assistência",
    context:
      "A NovaTech é uma assistência técnica fictícia que recebe dezenas de solicitações por dia, quase todas começando por uma mensagem no WhatsApp. Sem estrutura, cada conversa vira um atendimento manual do zero.",
    problem:
      "A implantação organiza a entrada: o cliente descreve o problema, a triagem captura o contexto com perguntas rápidas, a solicitação é registrada com identificação e a equipe recebe uma próxima ação clara — com o acompanhamento visível para a operação.",
    journey: [
      { stage: "Entrada", detail: "O cliente descreve o problema do aparelho na landing ou no WhatsApp." },
      { stage: "Triagem", detail: "Perguntas guiadas capturam tipo de aparelho, sintoma e urgência." },
      { stage: "Registro", detail: "A solicitação vira um registro estruturado, com identificação e histórico." },
      { stage: "Encaminhamento", detail: "A equipe técnica recebe a solicitação com a próxima ação definida." },
      { stage: "Acompanhamento", detail: "O andamento fica organizado do recebimento à entrega." },
    ],
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
    externalCta: {
      label: "Explorar ambiente",
      href: "https://demo-assistencia-tecnica.sor-os-demos.workers.dev",
    },
  },
  {
    id: "studio-cut",
    category: "Landing e sistema de agendamento para barbearia",
    name: "Studio Cut",
    context:
      "A Studio Cut é uma barbearia fictícia de Vila Velha que dependia de agenda no caderno e horários combinados por mensagem — com furos, esquecimentos e tempo perdido confirmando cliente por cliente.",
    problem:
      "A implantação dá à barbearia uma landing própria, com identidade forte, onde o cliente escolhe serviço, profissional e horário sozinho. A administração passa a enxergar a agenda e os clientes em um painel.",
    journey: [
      { stage: "Presença", detail: "Landing própria apresenta a barbearia, os serviços e os profissionais." },
      { stage: "Escolha", detail: "O cliente seleciona serviço, profissional e horário disponível." },
      { stage: "Confirmação", detail: "O agendamento é confirmado online, sem ligação e sem espera." },
      { stage: "Gestão", detail: "Horários, serviços e clientes administrados em um painel próprio." },
    ],
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
          sizes="(min-width: 1024px) 600px, 100vw"
          className="h-auto w-full"
        />
      </BrowserFrame>
    ),
  },
  {
    id: "lumiere",
    category: "Landing e sistema de agendamento para estética",
    name: "Lumière Estética",
    context:
      "A Lumière é uma clínica de estética fictícia com um posicionamento delicado e premium. A marcação de tratamentos por telefone não acompanhava a experiência que a clínica queria transmitir.",
    problem:
      "A implantação traduz a identidade da clínica em uma landing própria e organiza a agenda: tratamentos e profissionais apresentados com cuidado, agendamento online e gestão administrativa em um só lugar.",
    journey: [
      { stage: "Presença", detail: "Landing própria apresenta a clínica, os tratamentos e as profissionais." },
      { stage: "Escolha", detail: "A cliente seleciona tratamento, profissional e horário." },
      { stage: "Confirmação", detail: "O agendamento é confirmado online, com a elegância da marca." },
      { stage: "Gestão", detail: "Agenda, tratamentos e clientes administrados em um painel próprio." },
    ],
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
          sizes="(min-width: 1024px) 600px, 100vw"
          className="h-auto w-full"
        />
      </BrowserFrame>
    ),
  },
];

export default function ProjectsPage() {
  return (
    <div className="bg-[var(--bg)]">
      <section className="relative overflow-hidden border-b border-[var(--border-soft)] py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[44rem] max-w-[94vw] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(circle at center, rgba(201,168,106,0.1), transparent 60%)",
            filter: "blur(34px)",
          }}
        />
        <Container className="relative max-w-[80rem]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="reveal m-0 inline-flex items-center rounded-full border border-[var(--champagne-border)] bg-[var(--champagne-dim)] px-3.5 py-1.5 text-xs font-bold text-[var(--sor-champagne)]">
              Implantações demonstrativas
            </p>
            <h1 className="reveal mt-6 text-4xl font-extrabold tracking-[-0.04em] text-[var(--text)] sm:text-5xl">
              Como uma implantação da SOR ONE funciona num negócio real.
            </h1>
            <p className="reveal mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--sor-text-muted)]">
              Três negócios fictícios, cada um com uma implantação real
              configurada para a sua operação — da entrada do cliente ao
              acompanhamento.
            </p>
          </div>
        </Container>
      </section>

      {implementations.map((item, index) => (
        <section
          key={item.id}
          id={item.id}
          className={`scroll-mt-24 border-b border-[var(--border-soft)] py-16 sm:py-20 ${
            index % 2 === 1 ? "bg-[var(--bg-soft)]" : "bg-[var(--bg)]"
          }`}
        >
          <Container className="max-w-[80rem]">
            <article
              data-reveal-group
              className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14"
            >
              <div
                className={`reveal reveal-scale lg:sticky lg:top-28 ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                {item.visual}
                <p className="mt-3 text-center text-[11px] text-[var(--text-soft-2)]">
                  Implantação demonstrativa · negócio fictício
                </p>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <p className="reveal m-0 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--sor-champagne)]">
                  {item.category}
                </p>
                <h2 className="reveal mt-3 text-3xl font-extrabold tracking-[-0.03em] text-[var(--text)] sm:text-4xl">
                  {item.name}
                </h2>
                <p className="reveal mt-4 text-[15px] leading-relaxed text-[var(--text-muted-2)]">
                  {item.context}
                </p>
                <p className="reveal mt-3 text-[15px] leading-relaxed text-[var(--sor-text-muted)]">
                  {item.problem}
                </p>

                <h3 className="reveal mt-8 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-soft-2)]">
                  A jornada implantada
                </h3>
                <ol className="reveal relative m-0 mt-4 grid list-none gap-3 p-0">
                  <span
                    aria-hidden="true"
                    className="absolute bottom-4 left-[11px] top-4 w-px bg-[linear-gradient(to_bottom,rgba(201,168,106,0.35),rgba(201,168,106,0.06))]"
                  />
                  {item.journey.map((step) => (
                    <li key={step.stage} className="relative flex gap-4">
                      <span
                        aria-hidden="true"
                        className="z-10 mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[var(--champagne-border)] bg-[var(--bg)]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--sor-champagne)]" />
                      </span>
                      <p className="m-0 text-sm leading-6 text-[var(--sor-text-muted)]">
                        <span className="font-bold text-[var(--text)]">
                          {step.stage}.
                        </span>{" "}
                        {step.detail}
                      </p>
                    </li>
                  ))}
                </ol>

                <h3 className="reveal mt-8 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-soft-2)]">
                  Módulos da implantação
                </h3>
                <ul className="reveal m-0 mt-3 flex list-none flex-wrap gap-2 p-0">
                  {item.modules.map((module) => (
                    <li
                      key={module}
                      className="rounded-full border border-[var(--border-soft)] bg-[rgba(255,255,255,0.02)] px-3 py-1.5 text-xs font-medium text-[var(--sor-text-muted)]"
                    >
                      {module}
                    </li>
                  ))}
                </ul>

                {item.externalCta ? (
                  <div className="reveal mt-8">
                    <a
                      href={item.externalCta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--champagne)] px-6 py-3 text-sm font-bold text-[#060709] transition hover:bg-[var(--sor-champagne-hover)]"
                    >
                      {item.externalCta.label} →
                    </a>
                  </div>
                ) : null}
              </div>
            </article>
          </Container>
        </section>
      ))}

      <section className="py-20 sm:py-24">
        <Container className="max-w-[80rem]">
          <div className="reveal relative overflow-hidden rounded-[2rem] border border-[var(--champagne-border)] bg-[linear-gradient(135deg,var(--card-elevated),var(--card-deep))] p-8 text-center sm:p-12">
            <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-[var(--text)] sm:text-4xl">
              Quer uma operação assim no seu negócio?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[var(--sor-text-muted)]">
              O diagnóstico identifica o que precisa ser conectado,
              automatizado ou simplificado primeiro — e qual implantação faz
              sentido para o seu porte.
            </p>
            <Link
              href="/diagnostico"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--champagne)] px-7 py-3.5 text-sm font-bold text-[#060709] transition hover:bg-[var(--sor-champagne-hover)]"
            >
              Solicitar diagnóstico
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
