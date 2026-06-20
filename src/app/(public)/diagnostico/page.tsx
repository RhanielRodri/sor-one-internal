import type { Metadata } from "next";
import { Container } from "@/components/public/container";
import { DiagnosticForm } from "@/components/public/diagnostic-form";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Diagnóstico digital",
  description: "Receba uma análise inicial e três melhorias práticas para seu negócio.",
};

type DiagnosticPageProps = {
  searchParams: Promise<{ servico?: string }>;
};

export default async function DiagnosticPage({ searchParams }: DiagnosticPageProps) {
  const { servico } = await searchParams;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-[var(--sor-bg-soft)]">
        <div className="premium-grid absolute inset-0" />
        <Container className="relative grid gap-12 py-16 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:py-22">
          <div className="lg:sticky lg:top-28">
            <Badge>Diagnóstico gratuito</Badge>
            <h1 className="text-balance mt-6 text-4xl font-black leading-[1.08] tracking-[-0.05em] sm:text-5xl">
              Receba uma análise inicial da sua presença digital.
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted">
              Conte como seu negócio funciona hoje e receba 3 melhorias práticas para vender, atender ou organizar melhor.
            </p>
            <div className="mt-8 grid gap-3">
              {[
                ["01", "Conte o cenário atual", "Explique o negócio, o principal problema e sua prioridade."],
                ["02", "Receba uma leitura objetiva", "O SOR identifica gargalos e oportunidades iniciais."],
                ["03", "Defina o próximo passo", "Você recebe uma recomendação prática e proporcional."],
              ].map(([number, title, text]) => (
                <div key={number} className={`flex gap-4 rounded-2xl border border-border bg-card p-4 ${number==="02"?"lg:translate-x-5":""}`}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-accent/25 bg-accent/10 font-mono text-xs font-black text-accent">{number}</span>
                  <div><h2 className="font-extrabold">{title}</h2><p className="mt-1 text-sm leading-6 text-muted">{text}</p></div>
                </div>
              ))}
            </div>
            <div className="mt-7 rounded-[1.75rem] border border-blue-400/14 bg-[linear-gradient(145deg,rgba(17,26,32,0.82),rgba(8,12,16,0.9))] p-5">
              <p className="text-sm font-extrabold text-blue-300">O que você recebe</p>
              <ul className="mt-3 grid gap-2 text-sm text-muted">
                <li>✓ Leitura inicial da presença digital</li>
                <li>✓ Prioridades de melhoria</li>
                <li>✓ Recomendação de solução inicial</li>
              </ul>
            </div>
          </div>
          <DiagnosticForm initialServiceSlug={servico} />
        </Container>
      </section>
    </>
  );
}
