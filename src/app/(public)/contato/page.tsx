import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/public/container";
import { SectionHeading } from "@/components/public/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com o SOR.",
};

const contactBlocks = [
  ["WhatsApp", "Conversa direta para dúvidas rápidas e alinhamentos iniciais.", "Canal em configuração", "↗"],
  ["Diagnóstico gratuito", "O melhor caminho para apresentar seu problema e receber uma direção.", "Solicitar diagnóstico", "◎"],
  ["Serviços", "Conheça as soluções disponíveis, valores iniciais e prazos.", "Ver soluções", "◇"],
  ["Resposta rápida", "Retorno objetivo, humano e focado no próximo passo.", "Atendimento comercial", "✓"],
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-border bg-[var(--sor-bg-soft)] py-16 sm:py-22">
        <Container>
          <SectionHeading centered eyebrow="Contato" title="Uma conversa simples pode organizar o próximo passo." description="Escolha o canal mais adequado. Para uma análise completa, recomendamos começar pelo diagnóstico gratuito." />
        </Container>
      </section>
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contactBlocks.map(([title, text, action, icon], index) => (
              <Card key={title} className={`group flex min-w-0 flex-col overflow-hidden rounded-[2rem] p-7 transition hover:-translate-y-1 hover:border-[rgba(14,165,164,0.32)] ${index===1?"sm:col-span-2 lg:col-span-2 bg-[linear-gradient(145deg,rgba(14,165,164,0.09),var(--sor-card))]":index===2?"lg:col-span-2":""}`}>
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-accent/25 bg-accent/10 font-mono text-xl font-black text-accent">{icon}</span>
                <h2 className={`${index===1?"mt-8 text-3xl sm:text-4xl":"mt-7 text-2xl"} break-words font-black`}>{title}</h2>
                <p className="mt-3 min-w-0 flex-1 break-words leading-7 text-muted">{text}</p>
                {index === 1 ? (
                  <Button href="/diagnostico" className="mt-6 w-full sm:w-fit">{action}</Button>
                ) : index === 2 ? (
                  <Button href="/solucoes" variant="secondary" className="mt-6 w-full sm:w-fit">{action}</Button>
                ) : (
                  <span className="mt-6 break-words text-sm font-bold text-soft">{action}</span>
                )}
              </Card>
            ))}
          </div>
          <div className="os-panel mt-8 flex min-w-0 flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl p-7 text-white sm:flex-row sm:items-center sm:p-9">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--sor-petrol)]">Links úteis</p>
              <h2 className="mt-2 break-words text-2xl font-black">Conheça a operação antes de conversar.</h2>
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
