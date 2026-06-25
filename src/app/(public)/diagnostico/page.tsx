import type { Metadata } from "next";
import { Container } from "@/components/public/container";
import { DiagnosticForm } from "@/components/public/diagnostic-form";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Diagnóstico gratuito | SOR ONE — Análise da sua presença digital",
  description: "Responda 5 perguntas em 3 minutos e receba uma análise da sua presença digital. Gratuito, sem compromisso. Desenvolvedor freelance em Vila Velha, ES.",
  keywords: ["diagnóstico digital gratuito", "análise presença digital", "consultoria grátis pequenos negócios"],
  openGraph: {
    title: "Diagnóstico gratuito de presença digital | SOR ONE",
    description: "5 perguntas, 3 minutos, análise gratuita. Sem compromisso.",
    url: "https://sor-one-internal.vercel.app/diagnostico",
    siteName: "SOR ONE",
    locale: "pt_BR",
    type: "website",
  },
};

type DiagnosticPageProps = {
  searchParams: Promise<{ servico?: string }>;
};

export default async function DiagnosticPage({ searchParams }: DiagnosticPageProps) {
  const { servico } = await searchParams;
  const t = await getTranslations("diagnostic");

  const steps = [
    { number: "01", title: t("step1_title"), text: t("step1_text") },
    { number: "02", title: t("step2_title"), text: t("step2_text"), offset: true },
    { number: "03", title: t("step3_title"), text: t("step3_text") },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-[var(--sor-bg-soft)]">
        <div className="premium-grid absolute inset-0" />
        <Container className="relative grid gap-12 py-16 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:py-22">
          <div className="lg:sticky lg:top-28">
            <Badge>{t("badge")}</Badge>
            <h1 className="text-balance mt-6 text-4xl font-black leading-[1.08] tracking-[-0.05em] sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted">
              {t("sub")}
            </p>
            <div className="mt-8 grid gap-3">
              {steps.map(({ number, title, text, offset }) => (
                <div key={number} className={`flex gap-4 rounded-2xl border border-border bg-card p-4 ${offset ? "lg:translate-x-5" : ""}`}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-accent/25 bg-accent/10 font-mono text-xs font-black text-accent">{number}</span>
                  <div>
                    <h2 className="font-extrabold">{title}</h2>
                    <p className="mt-1 text-sm leading-6 text-muted">{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7 rounded-[1.75rem] border border-blue-400/14 bg-[linear-gradient(145deg,rgba(17,26,32,0.82),rgba(8,12,16,0.9))] p-5">
              <p className="text-sm font-extrabold text-blue-300">{t("what_you_get")}</p>
              <ul className="mt-3 grid gap-2 text-sm text-muted">
                <li>{t("benefit1")}</li>
                <li>{t("benefit2")}</li>
                <li>{t("benefit3")}</li>
              </ul>
            </div>
          </div>
          <DiagnosticForm initialServiceSlug={servico} />
        </Container>
      </section>
    </>
  );
}
