import { Container } from "@/components/public/container";

const fragmented = [
  "Mensagens espalhadas em conversas soltas",
  "Controle em planilhas, papel e memória",
  "Informações que se perdem entre uma etapa e outra",
  "Tarefas manuais repetidas todos os dias",
  "Contatos sem retorno e sem acompanhamento",
  "Ferramentas que não conversam entre si",
];

const organized = [
  "Entrada de clientes estruturada",
  "Informações centralizadas em um só lugar",
  "Próxima ação definida para cada solicitação",
  "Equipe acompanhando o andamento",
  "Automações cuidando do repetitivo",
  "Indicadores úteis para decidir",
];

export function ProblemContrast() {
  return (
    <section className="scroll-mt-24 border-b border-[var(--border-soft)] bg-[var(--bg-soft)] py-20 sm:py-24">
      <Container className="max-w-[80rem]">
        <p className="reveal m-0 text-xs font-bold uppercase tracking-[0.2em] text-[var(--sor-champagne)]">
          O problema
        </p>
        <h2 className="reveal mt-4 max-w-2xl text-3xl font-extrabold tracking-[-0.035em] text-[var(--text)] sm:text-4xl">
          Não falta esforço. Falta operação organizada.
        </h2>
        <p className="reveal mt-5 max-w-2xl text-base leading-relaxed text-[var(--sor-text-muted)]">
          A maioria dos negócios perde tempo e cliente porque a operação vive
          espalhada. A implantação certa transforma esse cenário — sem trocar a
          forma como o negócio funciona, organizando o que já existe.
        </p>

        <div
          data-reveal-group
          className="mt-12 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-6"
        >
          <div className="reveal rounded-3xl border border-[var(--border-soft)] bg-[rgba(6,7,9,0.6)] p-7 sm:p-8">
            <p className="m-0 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-soft-2)]">
              Antes
            </p>
            <h3 className="mt-2 text-xl font-extrabold tracking-[-0.02em] text-[var(--text-muted-2)]">
              Operação fragmentada
            </h3>
            <ul className="m-0 mt-6 grid list-none gap-3.5 p-0">
              {fragmented.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 text-[var(--sor-text-soft)]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full border border-[var(--border-soft)] text-[9px] text-[var(--text-soft-2)]"
                  >
                    ✕
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            aria-hidden="true"
            className="reveal flex items-center justify-center lg:flex-col"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--champagne-border)] bg-[var(--champagne-dim)] text-lg text-[var(--sor-champagne)] lg:rotate-0">
              <span className="hidden lg:inline">→</span>
              <span className="lg:hidden">↓</span>
            </span>
          </div>

          <div className="reveal rounded-3xl border border-[rgba(201,168,106,0.24)] bg-[linear-gradient(155deg,rgba(15,61,86,0.28),var(--card-deep))] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.4),0_1px_0_rgba(201,168,106,0.14)_inset] sm:p-8">
            <p className="m-0 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--sor-champagne)]">
              Depois da implantação
            </p>
            <h3 className="mt-2 text-xl font-extrabold tracking-[-0.02em] text-[var(--text)]">
              Operação organizada
            </h3>
            <ul className="m-0 mt-6 grid list-none gap-3.5 p-0">
              {organized.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 text-[var(--sor-text-muted)]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full border border-[var(--champagne-border)] bg-[var(--champagne-dim)] text-[9px] text-[var(--sor-champagne)]"
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
