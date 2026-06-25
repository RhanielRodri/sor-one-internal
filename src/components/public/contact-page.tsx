"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/public/container";
import { SectionHeading } from "@/components/public/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SOR_WHATSAPP_URL } from "@/lib/whatsapp";
import { useTranslations } from "next-intl";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--sor-border-main)] last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-bold leading-6">{question}</span>
        <span
          className="shrink-0 text-xl font-bold text-[var(--sor-champagne)] transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "none" }}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {open && (
        <p className="pb-5 text-sm leading-7 text-muted">{answer}</p>
      )}
    </div>
  );
}

export function ContactPage() {
  const t = useTranslations("contact");

  const faqs = [
    { question: t("faq_q1"), answer: t("faq_a1") },
    { question: t("faq_q2"), answer: t("faq_a2") },
    { question: t("faq_q3"), answer: t("faq_a3") },
  ];

  return (
    <>
      <section className="border-b border-border bg-[var(--sor-bg-soft)] py-16 sm:py-22">
        <Container>
          <SectionHeading
            centered
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("desc")}
          />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm text-muted">
            <span className="flex items-center gap-2">
              <span className="text-[var(--sor-champagne)]">◎</span>
              {t("response_time")}
            </span>
            <span className="hidden text-[var(--sor-border-main)] sm:inline">·</span>
            <span className="flex items-center gap-2">
              <span className="text-[var(--sor-champagne)]">↗</span>
              {t("location")}
            </span>
            <span className="hidden text-[var(--sor-border-main)] sm:inline">·</span>
            <span className="flex items-center gap-2">
              <span className="text-[var(--sor-champagne)]">✓</span>
              {t("whatsapp_avail")}
            </span>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* WhatsApp */}
            <Card className="group flex min-w-0 flex-col overflow-hidden rounded-[2rem] p-7 transition hover:-translate-y-1 hover:border-[rgba(14,165,164,0.32)]">
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-accent/25 bg-accent/10 font-mono text-xl font-black text-accent">↗</span>
              <h2 className="mt-7 break-words text-2xl font-black">{t("whatsapp_title")}</h2>
              <p className="mt-3 min-w-0 flex-1 break-words leading-7 text-muted">
                {t("whatsapp_desc")}
              </p>
              <Button href={SOR_WHATSAPP_URL} variant="secondary" className="mt-6 w-full sm:w-fit">
                {t("whatsapp_btn")}
              </Button>
            </Card>

            {/* Diagnóstico — destaque */}
            <Card className="group flex min-w-0 flex-col overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,rgba(14,165,164,0.09),var(--sor-card))] p-7 transition hover:-translate-y-1 hover:border-[rgba(14,165,164,0.32)] sm:col-span-2 lg:col-span-2">
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-accent/25 bg-accent/10 font-mono text-xl font-black text-accent">◎</span>
              <h2 className="mt-8 break-words text-3xl font-black sm:text-4xl">{t("diagnosis_title")}</h2>
              <p className="mt-3 min-w-0 flex-1 break-words leading-7 text-muted">
                {t("diagnosis_desc")}
              </p>
              <Button href="/diagnostico" className="mt-6 w-full sm:w-fit">
                {t("diagnosis_btn")}
              </Button>
            </Card>

            {/* Serviços */}
            <Card className="group flex min-w-0 flex-col overflow-hidden rounded-[2rem] p-7 transition hover:-translate-y-1 hover:border-[rgba(14,165,164,0.32)] lg:col-span-2">
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-accent/25 bg-accent/10 font-mono text-xl font-black text-accent">◇</span>
              <h2 className="mt-7 break-words text-2xl font-black">{t("services_title")}</h2>
              <p className="mt-3 min-w-0 flex-1 break-words leading-7 text-muted">
                {t("services_desc")}
              </p>
              <Button href="/solucoes" variant="secondary" className="mt-6 w-full sm:w-fit">
                {t("services_btn")}
              </Button>
            </Card>

            {/* Resposta rápida */}
            <Card className="group flex min-w-0 flex-col overflow-hidden rounded-[2rem] p-7 transition hover:-translate-y-1 hover:border-[rgba(14,165,164,0.32)] lg:col-span-2">
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-accent/25 bg-accent/10 font-mono text-xl font-black text-accent">✓</span>
              <h2 className="mt-7 break-words text-2xl font-black">{t("fast_title")}</h2>
              <p className="mt-3 break-words leading-7 text-muted">
                {t("fast_desc")}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={SOR_WHATSAPP_URL}
                  className="flex items-center gap-2 text-sm font-bold text-[var(--sor-champagne)] underline-offset-4 hover:underline"
                >
                  <span aria-hidden="true">↗</span>
                  {t("whatsapp_link")}
                </a>
                <a
                  href="mailto:rhanielrodrigs@gmail.com"
                  className="flex items-center gap-2 text-sm font-bold text-[var(--sor-champagne)] underline-offset-4 hover:underline"
                >
                  <span aria-hidden="true">◎</span>
                  rhanielrodrigs@gmail.com
                </a>
              </div>
            </Card>
          </div>

          {/* FAQ */}
          <div className="mt-14">
            <h2 className="text-2xl font-black">{t("faq_title")}</h2>
            <div className="mt-6 rounded-[1.75rem] border border-[var(--sor-border-main)] bg-[var(--sor-card)] px-7 py-2">
              {faqs.map((faq) => (
                <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          <div className="os-panel mt-8 flex min-w-0 flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl p-7 text-white sm:flex-row sm:items-center sm:p-9">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--sor-petrol)]">Links</p>
              <h2 className="mt-2 break-words text-2xl font-black">{t("links_title")}</h2>
              <p className="mt-3 text-sm text-muted">
                {t("links_email_hint")}{" "}
                <a href="mailto:rhanielrodrigs@gmail.com" className="font-bold text-[var(--sor-champagne)] hover:underline">
                  rhanielrodrigs@gmail.com
                </a>
              </p>
            </div>
            <div className="flex w-full flex-wrap gap-3 sm:w-auto">
              <Link href="/" className="rounded-xl border border-border px-4 py-2.5 text-sm font-bold hover:bg-card">{t("links_home")}</Link>
              <Link href="/solucoes" className="rounded-xl border border-border px-4 py-2.5 text-sm font-bold hover:bg-card">{t("links_solutions")}</Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
