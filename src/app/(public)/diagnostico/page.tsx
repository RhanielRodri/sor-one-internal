import type { Metadata } from "next";
import { Container } from "@/components/public/container";
import { DiagnosticForm } from "@/components/public/diagnostic-form";
import { siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Diagnóstico gratuito — Encontre a solução certa para seu negócio",
  description: "Responda o diagnóstico comercial da SOR ONE e receba a recomendação certa para transformar contatos em agendamentos, pedidos e orçamentos. Gratuito e sem compromisso.",
  keywords: ["diagnóstico comercial gratuito", "análise presença digital", "atendimento e conversão pequenos negócios"],
  openGraph: {
    title: "Diagnóstico comercial gratuito | SOR ONE Atendimento & Conversão",
    description: "Responda seis etapas rápidas e receba a solução recomendada para o seu cenário. Sem compromisso.",
    url: `${siteUrl}/diagnostico`,
    siteName: "SOR ONE",
    locale: "pt_BR",
    type: "website",
  },
};

export default function DiagnosticPage() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden border-b border-border bg-[var(--sor-bg-soft)]">
      <div className="premium-grid absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-80 w-[48rem] max-w-[92vw] -translate-x-1/2 rounded-full bg-[rgba(201,168,76,0.08)] blur-3xl" />
      <Container className="relative py-10 sm:py-14 lg:py-18">
        <div className="mx-auto max-w-4xl">
          <DiagnosticForm />
          <p className="reveal mt-5 text-center text-xs text-soft">
            Gratuito, sem compromisso e com recomendação baseada no seu cenário.
          </p>
        </div>
      </Container>
    </section>
  );
}
