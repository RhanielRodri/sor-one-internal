"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/public/container";
import { SectionHeading } from "@/components/public/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SOR_WHATSAPP_URL } from "@/lib/whatsapp";

const faqs = [
  {
    question: "Preciso saber qual serviço contratar antes de entrar em contato?",
    answer:
      "Não. O diagnóstico existe exatamente para isso. Você descreve seu cenário e eu indico o que faz mais sentido para o seu negócio — sem compromisso.",
  },
  {
    question: "Quanto tempo leva para entregar um projeto?",
    answer:
      "Depende do escopo. Sites e landing pages ficam prontos em 7 a 14 dias. Sistemas e automações levam de 3 a 6 semanas. O prazo exato vem na proposta, antes de qualquer pagamento.",
  },
  {
    question: "Atende fora do Espírito Santo?",
    answer:
      "Sim. O atendimento é 100% remoto. Já trabalhei com clientes de outros estados sem nenhum impacto na qualidade da entrega.",
  },
];

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
  return (
    <>
      <section className="border-b border-border bg-[var(--sor-bg-soft)] py-16 sm:py-22">
        <Container>
          <SectionHeading
            centered
            eyebrow="Contato"
            title="Escolha o melhor caminho para começar."
            description="Para uma resposta mais precisa, envie primeiro o diagnóstico. Se preferir falar agora, chame no WhatsApp."
          />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm text-muted">
            <span className="flex items-center gap-2">
              <span className="text-[var(--sor-champagne)]">◎</span>
              Resposta em até 24h úteis
            </span>
            <span className="hidden text-[var(--sor-border-main)] sm:inline">·</span>
            <span className="flex items-center gap-2">
              <span className="text-[var(--sor-champagne)]">↗</span>
              Vila Velha, ES — Atendimento remoto
            </span>
            <span className="hidden text-[var(--sor-border-main)] sm:inline">·</span>
            <span className="flex items-center gap-2">
              <span className="text-[var(--sor-champagne)]">✓</span>
              WhatsApp disponível para urgências
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
              <h2 className="mt-7 break-words text-2xl font-black">WhatsApp</h2>
              <p className="mt-3 min-w-0 flex-1 break-words leading-7 text-muted">
                Contato direto para quem precisa conversar imediatamente sobre um projeto.
              </p>
              <Button href={SOR_WHATSAPP_URL} variant="secondary" className="mt-6 w-full sm:w-fit">
                Falar pelo WhatsApp
              </Button>
            </Card>

            {/* Diagnóstico — destaque */}
            <Card className="group flex min-w-0 flex-col overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,rgba(14,165,164,0.09),var(--sor-card))] p-7 transition hover:-translate-y-1 hover:border-[rgba(14,165,164,0.32)] sm:col-span-2 lg:col-span-2">
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-accent/25 bg-accent/10 font-mono text-xl font-black text-accent">◎</span>
              <h2 className="mt-8 break-words text-3xl font-black sm:text-4xl">Diagnóstico gratuito</h2>
              <p className="mt-3 min-w-0 flex-1 break-words leading-7 text-muted">
                O caminho recomendado para apresentar seu cenário e receber uma resposta mais precisa.
              </p>
              <Button href="/diagnostico" className="mt-6 w-full sm:w-fit">
                Solicitar diagnóstico
              </Button>
            </Card>

            {/* Serviços */}
            <Card className="group flex min-w-0 flex-col overflow-hidden rounded-[2rem] p-7 transition hover:-translate-y-1 hover:border-[rgba(14,165,164,0.32)] lg:col-span-2">
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-accent/25 bg-accent/10 font-mono text-xl font-black text-accent">◇</span>
              <h2 className="mt-7 break-words text-2xl font-black">Serviços</h2>
              <p className="mt-3 min-w-0 flex-1 break-words leading-7 text-muted">
                Conheça as soluções disponíveis, valores iniciais e prazos.
              </p>
              <Button href="/solucoes" variant="secondary" className="mt-6 w-full sm:w-fit">
                Ver soluções
              </Button>
            </Card>

            {/* Resposta rápida */}
            <Card className="group flex min-w-0 flex-col overflow-hidden rounded-[2rem] p-7 transition hover:-translate-y-1 hover:border-[rgba(14,165,164,0.32)] lg:col-span-2">
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-accent/25 bg-accent/10 font-mono text-xl font-black text-accent">✓</span>
              <h2 className="mt-7 break-words text-2xl font-black">Resposta rápida</h2>
              <p className="mt-3 break-words leading-7 text-muted">
                Retorno objetivo, humano e focado no próximo passo.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={SOR_WHATSAPP_URL}
                  className="flex items-center gap-2 text-sm font-bold text-[var(--sor-champagne)] underline-offset-4 hover:underline"
                >
                  <span aria-hidden="true">↗</span>
                  WhatsApp — resposta imediata
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
            <h2 className="text-2xl font-black">Perguntas frequentes</h2>
            <div className="mt-6 rounded-[1.75rem] border border-[var(--sor-border-main)] bg-[var(--sor-card)] px-7 py-2">
              {faqs.map((faq) => (
                <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          <div className="os-panel mt-8 flex min-w-0 flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl p-7 text-white sm:flex-row sm:items-center sm:p-9">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--sor-petrol)]">Links úteis</p>
              <h2 className="mt-2 break-words text-2xl font-black">Conheça a operação antes de conversar.</h2>
              <p className="mt-3 text-sm text-muted">
                Ou envie direto para{" "}
                <a href="mailto:rhanielrodrigs@gmail.com" className="font-bold text-[var(--sor-champagne)] hover:underline">
                  rhanielrodrigs@gmail.com
                </a>
              </p>
            </div>
            <div className="flex w-full flex-wrap gap-3 sm:w-auto">
              <Link href="/" className="rounded-xl border border-border px-4 py-2.5 text-sm font-bold hover:bg-card">Início</Link>
              <Link href="/solucoes" className="rounded-xl border border-border px-4 py-2.5 text-sm font-bold hover:bg-card">Soluções</Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
