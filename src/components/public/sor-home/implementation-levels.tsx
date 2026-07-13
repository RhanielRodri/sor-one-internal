import { Container } from "@/components/public/container";

const levels = [
  {
    name: "Essencial",
    promise: "Organiza uma jornada crítica.",
    fits: [
      "Landing ou site",
      "Formulário estruturado",
      "Agendamento",
      "Catálogo ou cardápio",
      "Automação pontual",
    ],
    depth: 1,
  },
  {
    name: "Operacional",
    promise: "Conecta atendimento, gestão e acompanhamento.",
    fits: [
      "Painel e CRM",
      "Histórico e usuários",
      "Status e responsáveis",
      "Relatórios",
      "Integrações",
    ],
    depth: 2,
  },
  {
    name: "Inteligente",
    promise: "Automatiza, integra e mede a operação.",
    fits: [
      "IA e triagem",
      "Regras e automações",
      "Múltiplas integrações",
      "Acompanhamento recorrente",
      "Indicadores",
    ],
    depth: 3,
  },
];

export function ImplementationLevels() {
  return (
    <section
      id="niveis"
      className="scroll-mt-24 border-b border-[var(--border-soft)] bg-[var(--bg-soft)] py-20 sm:py-24"
    >
      <Container className="max-w-[80rem]">
        <p className="reveal m-0 text-xs font-bold uppercase tracking-[0.2em] text-[var(--sor-champagne)]">
          Níveis de implantação
        </p>
        <h2 className="reveal mt-4 max-w-2xl text-3xl font-extrabold tracking-[-0.035em] text-[var(--text)] sm:text-4xl">
          Do essencial ao inteligente, uma progressão — não um menu de planos.
        </h2>
        <p className="reveal mt-5 max-w-2xl text-base leading-relaxed text-[var(--sor-text-muted)]">
          Cada nível amplia o anterior: o que começa organizando uma jornada
          pode evoluir para uma operação conectada e, depois, automatizada e
          medida.
        </p>

        <div data-reveal-group className="mt-12 grid gap-4 lg:grid-cols-3 lg:gap-0">
          {levels.map((level, index) => (
            <article
              key={level.name}
              className={`reveal relative border border-[var(--border-soft)] bg-[var(--card-deep)] p-7 sm:p-8 lg:border-l-0 lg:first:rounded-l-3xl lg:first:border-l lg:last:rounded-r-3xl ${
                index === 2
                  ? "rounded-3xl border-[rgba(201,168,106,0.28)] bg-[linear-gradient(160deg,var(--card-elevated),var(--card-deep))] shadow-[0_30px_80px_rgba(0,0,0,0.4)] lg:-my-4 lg:rounded-3xl lg:border-l lg:p-10"
                  : "rounded-3xl lg:rounded-none"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-extrabold uppercase tracking-[0.08em] text-[var(--sor-champagne)]">
                  {level.name}
                </h3>
                <span
                  aria-label={`Nível ${index + 1} de 3`}
                  className="flex gap-1"
                >
                  {[1, 2, 3].map((mark) => (
                    <span
                      key={mark}
                      aria-hidden="true"
                      className={`h-1.5 w-5 rounded-full ${
                        mark <= level.depth
                          ? "bg-[var(--champagne)]"
                          : "bg-[var(--border-soft)]"
                      }`}
                    />
                  ))}
                </span>
              </div>
              <p className="mt-4 text-[15px] font-semibold leading-6 text-[var(--text)]">
                {level.promise}
              </p>
              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-soft-2)]">
                Adequado para
              </p>
              <ul className="m-0 mt-3 grid list-none gap-2 p-0">
                {level.fits.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-[var(--sor-text-muted)]"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 shrink-0 rounded-full bg-[var(--sor-champagne)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              {index < 2 ? (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-4 left-1/2 z-10 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full border border-[var(--champagne-border)] bg-[var(--bg-soft)] text-xs text-[var(--sor-champagne)] lg:-right-3.5 lg:bottom-auto lg:left-auto lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0"
                >
                  <span className="lg:hidden">↓</span>
                  <span className="hidden lg:inline">→</span>
                </span>
              ) : null}
            </article>
          ))}
        </div>

        <p className="reveal mt-10 max-w-2xl text-sm leading-6 text-[var(--sor-text-soft)]">
          O nível é definido pelo diagnóstico e pelo escopo necessário — não
          por uma tabela de preços. Projetos começam onde a operação precisa e
          evoluem quando o negócio pede.
        </p>
      </Container>
    </section>
  );
}
