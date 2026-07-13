import { Container } from "@/components/public/container";

const categories = [
  {
    number: "01",
    title: "Presença e conversão",
    problem:
      "Coloca o negócio no ar com uma presença que apresenta bem e transforma visita em contato qualificado.",
    modules: "Landing page · site institucional · SEO local · captação de contatos",
  },
  {
    number: "02",
    title: "Agendamento e relacionamento",
    problem:
      "Tira a agenda do papel: o cliente marca sozinho e o negócio acompanha horários, profissionais e retornos.",
    modules: "Agenda online · serviços e profissionais · lembretes · painel administrativo",
  },
  {
    number: "03",
    title: "Catálogos, pedidos e orçamentos",
    problem:
      "Estrutura a entrada de pedidos e orçamentos, sem depender de conversa solta para fechar e acompanhar.",
    modules: "Catálogo · cardápio · pedidos · orçamentos · acompanhamento de oportunidades",
  },
  {
    number: "04",
    title: "Operação e gestão",
    problem:
      "Centraliza ordens, clientes e tarefas para a equipe saber o que fazer e o gestor enxergar o todo.",
    modules: "Ordens de serviço · estoque · processos · painéis · relatórios",
  },
  {
    number: "05",
    title: "Atendimento e automação",
    problem:
      "Organiza a entrada dos clientes, captura contexto, encaminha solicitações e reduz tarefas repetitivas.",
    modules: "WhatsApp · IA · triagem · CRM · acompanhamento",
  },
];

export function SolutionCategories() {
  return (
    <section
      id="solucoes"
      className="scroll-mt-24 border-b border-[var(--border-soft)] bg-[var(--bg)] py-20 sm:py-24"
    >
      <Container className="max-w-[80rem]">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="reveal m-0 text-xs font-bold uppercase tracking-[0.2em] text-[var(--sor-champagne)]">
              Soluções
            </p>
            <h2 className="reveal mt-4 text-3xl font-extrabold tracking-[-0.035em] text-[var(--text)] sm:text-4xl">
              O que a SOR ONE implanta, organizado por jornada.
            </h2>
            <p className="reveal mt-5 max-w-md text-base leading-relaxed text-[var(--sor-text-muted)]">
              Não é um catálogo de produtos. São jornadas da sua operação —
              entrada de clientes, atendimento, agendamento, vendas, pedidos,
              acompanhamento e gestão — resolvidas com os módulos certos. A
              combinação sai do diagnóstico.
            </p>
          </div>

          <div data-reveal-group>
            {categories.map((category) => (
              <article
                key={category.number}
                className="reveal group grid grid-cols-[auto_1fr] gap-5 border-t border-[var(--border-soft)] py-7 transition-colors first:border-t-0 first:pt-0 last:pb-0 sm:gap-8"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 font-mono text-sm font-bold text-[var(--text-soft-2)] transition-colors group-hover:text-[var(--sor-champagne)] sm:text-base"
                >
                  {category.number}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-extrabold tracking-[-0.02em] text-[var(--text)] sm:text-xl">
                    {category.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--text-muted-2)]">
                    {category.problem}
                  </p>
                  <p className="mt-3 text-[13px] text-[var(--sor-text-soft)]">
                    <span className="font-semibold text-[var(--sor-champagne)]">
                      Possíveis módulos:
                    </span>{" "}
                    {category.modules}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
