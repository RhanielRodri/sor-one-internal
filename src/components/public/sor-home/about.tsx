import { Container } from "@/components/public/container";

export function About() {
  return (
    <section
      id="sobre"
      className="scroll-mt-24 border-b border-[var(--border-soft)] bg-[var(--bg)] py-20 sm:py-24"
    >
      <Container className="max-w-[80rem]">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="reveal m-0 text-xs font-bold uppercase tracking-[0.2em] text-[var(--sor-champagne)]">
              Sobre a SOR ONE
            </p>
            <h2 className="reveal mt-4 text-3xl font-extrabold tracking-[-0.035em] text-[var(--text)] sm:text-4xl">
              Uma empresa de implantação, não de software de prateleira.
            </h2>
          </div>
          <div data-reveal-group className="grid gap-5">
            <p className="reveal m-0 text-base leading-relaxed text-[var(--sor-text-muted)]">
              A SOR ONE conecta tecnologia à operação real: entende como o
              negócio atende, vende e opera, e implanta sistemas, automações e
              integrações dentro de um escopo definido — construídos para essa
              realidade, não para um cliente genérico.
            </p>
            <p className="reveal m-0 text-base leading-relaxed text-[var(--sor-text-muted)]">
              A implantação não termina na publicação: inclui treinamento da
              equipe, acompanhamento e evolução planejada, com proximidade de
              quem conhece a operação por dentro. De Vila Velha, ES, para todo
              o Brasil.
            </p>
          </div>
        </div>

        <div className="reveal mt-14 rounded-3xl border border-[var(--champagne-border)] bg-[linear-gradient(150deg,rgba(201,168,106,0.07),rgba(15,61,86,0.12))] p-7 sm:p-9">
          <p className="m-0 text-xs font-bold uppercase tracking-[0.18em] text-[var(--sor-champagne)]">
            Clareza antes da implementação
          </p>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[var(--sor-text-muted)]">
            Os módulos, integrações, prazos e responsabilidades são definidos
            no diagnóstico e formalizados na proposta. Você sabe exatamente o
            que será implantado antes de qualquer linha entrar em produção — e
            evoluções fora do escopo são dimensionadas separadamente, com a
            mesma clareza.
          </p>
        </div>
      </Container>
    </section>
  );
}
