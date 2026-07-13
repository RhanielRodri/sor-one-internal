import type { Metadata } from "next";
import { Container } from "@/components/public/container";
import { DiagnosticForm } from "@/components/public/diagnostic-form";
import { siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Diagnóstico gratuito — Encontre a solução certa para seu negócio",
  description:
    "Responda o diagnóstico da SOR ONE e receba a recomendação certa para organizar atendimento, agendamentos, pedidos e orçamentos. Gratuito e sem compromisso.",
  keywords: [
    "diagnóstico comercial gratuito",
    "análise presença digital",
    "atendimento e conversão pequenos negócios",
  ],
  openGraph: {
    title: "Diagnóstico gratuito | SOR ONE",
    description:
      "Responda etapas rápidas e receba a recomendação certa para o seu cenário. Sem compromisso.",
    url: `${siteUrl}/diagnostico`,
    siteName: "SOR ONE",
    locale: "pt_BR",
    type: "website",
  },
};

export default function DiagnosticPage() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden border-b border-[var(--border-soft)] bg-[var(--bg-soft)]">
      <div className="premium-grid absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 h-80 w-[48rem] max-w-[92vw] -translate-x-1/2 rounded-full bg-[rgba(201,168,106,0.07)] blur-3xl"
      />
      <Container className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="reveal m-0 text-xs font-bold uppercase tracking-[0.2em] text-[var(--sor-champagne)]">
              Diagnóstico · gratuito e sem compromisso
            </p>
            <h1 className="reveal mt-4 text-3xl font-extrabold tracking-[-0.04em] text-[var(--text)] sm:text-4xl">
              Vamos entender a sua operação.
            </h1>
            <p className="reveal mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--sor-text-muted)]">
              Etapas rápidas sobre como o seu negócio atende, vende e opera.
              Ao final, você recebe uma recomendação do que faz sentido
              conectar, automatizar ou simplificar primeiro.
            </p>
          </div>
          <DiagnosticForm />
          <p className="reveal mt-5 text-center text-xs text-[var(--sor-text-soft)]">
            A recomendação é baseada no seu cenário — e o próximo passo é uma
            conversa, não um contrato.
          </p>
        </div>
      </Container>
    </section>
  );
}
