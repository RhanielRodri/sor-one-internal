import { Container } from "@/components/public/container";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    text: "Processos, gargalos e objetivos mapeados a partir da realidade do negócio.",
    deliverable: "Mapa inicial da operação",
  },
  {
    number: "02",
    title: "Escopo",
    text: "Módulos, integrações e responsabilidades definidos — o que entra agora e o que fica para depois.",
    deliverable: "Proposta e plano de implementação",
  },
  {
    number: "03",
    title: "Configuração",
    text: "A solução é preparada com os dados, textos e regras do seu negócio.",
    deliverable: "Ambiente configurado para a operação",
  },
  {
    number: "04",
    title: "Implementação",
    text: "O sistema entra no ar, integrado aos canais que o negócio já usa.",
    deliverable: "Sistema publicado e integrado",
  },
  {
    number: "05",
    title: "Homologação",
    text: "Fluxos validados com cenários reais antes de abrir para os clientes.",
    deliverable: "Aceite funcional",
  },
  {
    number: "06",
    title: "Treinamento",
    text: "A equipe aprende a operar o sistema no dia a dia, com autonomia.",
    deliverable: "Equipe treinada e material de uso",
  },
  {
    number: "07",
    title: "Operação e evolução",
    text: "Com a base rodando, novas frentes e integrações entram de forma planejada.",
    deliverable: "Rotina de acompanhamento e evolução",
  },
];

export function Methodology() {
  return (
    <section
      id="metodologia"
      className="scroll-mt-24 border-b border-[var(--border-soft)] bg-[var(--bg-soft)] py-20 sm:py-24"
    >
      <Container className="max-w-[80rem]">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="reveal m-0 text-xs font-bold uppercase tracking-[0.2em] text-[var(--sor-champagne)]">
              Como funciona
            </p>
            <h2 className="reveal mt-4 text-3xl font-extrabold tracking-[-0.035em] text-[var(--text)] sm:text-4xl">
              Uma metodologia de implantação, do diagnóstico à operação.
            </h2>
            <p className="reveal mt-5 max-w-md text-base leading-relaxed text-[var(--sor-text-muted)]">
              Cada etapa tem um entregável claro. Você sabe onde o projeto
              está o tempo todo — sem reunião interminável e sem surpresa de
              escopo.
            </p>
          </div>

          <ol data-reveal-group className="relative m-0 grid list-none gap-0 p-0">
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-[19px] top-6 w-px bg-[linear-gradient(to_bottom,rgba(201,168,106,0.4),rgba(201,168,106,0.06))]"
            />
            {steps.map((step) => (
              <li key={step.number} className="reveal relative flex gap-5 pb-9 last:pb-0 sm:gap-7">
                <span className="z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--champagne-border)] bg-[var(--bg)] font-mono text-xs font-bold text-[var(--sor-champagne)]">
                  {step.number}
                </span>
                <div className="min-w-0 pt-1">
                  <h3 className="text-lg font-extrabold tracking-[-0.02em] text-[var(--text)]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-[var(--text-muted-2)]">
                    {step.text}
                  </p>
                  <p className="mt-2.5 inline-flex flex-wrap items-center gap-2 text-[12px]">
                    <span className="rounded-full border border-[var(--border-soft)] px-2.5 py-0.5 font-bold uppercase tracking-[0.1em] text-[var(--text-soft-2)]">
                      Entregável
                    </span>
                    <span className="font-semibold text-[var(--sor-text-muted)]">
                      {step.deliverable}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
