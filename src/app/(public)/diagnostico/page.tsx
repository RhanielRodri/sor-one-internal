import type { Metadata } from "next";
import { Container } from "@/components/public/container";
import { DiagnosticForm } from "@/components/public/diagnostic-form";
import { siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Diagnóstico gratuito — Encontre a solução certa para seu negócio",
  description: "Identifique as dores do seu negócio e receba uma recomendação de solução digital. Gratuito e sem compromisso.",
  keywords: ["diagnóstico digital gratuito", "análise presença digital", "consultoria grátis pequenos negócios"],
  openGraph: {
    title: "Diagnóstico gratuito de presença digital | SOR ONE",
    description: "Responda quatro etapas e receba uma recomendação gratuita. Sem compromisso.",
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
          <p className="mt-5 text-center text-xs text-soft">
            Gratuito, sem compromisso e com recomendação baseada no seu cenário.
          </p>
        </div>
      </Container>
    </section>
  );
}
