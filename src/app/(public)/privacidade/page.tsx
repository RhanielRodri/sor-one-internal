import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/public/container";
import { siteUrl } from "@/lib/constants";
import { PRIVACY_POLICY_VERSION } from "@/lib/diagnostic/options";
import { SOR_WHATSAPP_URL } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description:
    "Como a SOR ONE coleta, usa e protege os dados enviados no diagnóstico comercial.",
  alternates: { canonical: `${siteUrl}/privacidade` },
  openGraph: {
    title: "Política de privacidade | SOR ONE",
    description:
      "Como a SOR ONE coleta, usa e protege os dados enviados no diagnóstico comercial.",
    url: `${siteUrl}/privacidade`,
    siteName: "SOR ONE",
    locale: "pt_BR",
    type: "website",
  },
};

const sections = [
  {
    title: "1. Quais dados são coletados",
    body: "No diagnóstico comercial coletamos apenas o que você informa: nome, nome do negócio, WhatsApp, cidade/UF e, opcionalmente, e-mail. Também guardamos as respostas do diagnóstico (prioridade, tipo de negócio, canais de atendimento, gargalo, volume de contatos e resultado desejado) e a recomendação gerada.",
  },
  {
    title: "2. Para que os dados são usados",
    body: "Usamos esses dados exclusivamente para analisar o seu cenário, gerar a recomendação e entrar em contato sobre o diagnóstico e as soluções da SOR ONE. Não vendemos, alugamos nem compartilhamos seus dados com terceiros para fins de marketing.",
  },
  {
    title: "3. Base do contato",
    body: "O contato acontece a partir da autorização que você marca ao enviar o diagnóstico. Registramos a data e hora desse consentimento e a versão desta política vigente no momento do envio.",
  },
  {
    title: "4. Onde os dados ficam",
    body: "Os dados são armazenados em banco de dados gerenciado (Supabase) com acesso restrito. Apenas a SOR ONE acessa os registros, por meio de painel administrativo protegido por autenticação.",
  },
  {
    title: "5. Seus direitos",
    body: "Você pode solicitar a qualquer momento a consulta, correção ou exclusão dos seus dados. Basta pedir pelo WhatsApp e atendemos a solicitação.",
  },
];

export default function PrivacyPage() {
  return (
    <section className="relative border-b border-border bg-[var(--sor-bg-soft)]">
      <div className="premium-grid absolute inset-0 opacity-40" />
      <Container className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sor-champagne)]">
            Versão {PRIVACY_POLICY_VERSION}
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            Política de privacidade
          </h1>
          <p className="mt-4 leading-7 text-muted">
            Esta política descreve como a SOR ONE trata os dados enviados no
            diagnóstico comercial do site.
          </p>

          <div className="mt-10 grid gap-6">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-[var(--sor-border-main)] bg-[var(--sor-card)] p-6"
              >
                <h2 className="text-lg font-black tracking-[-0.02em]">
                  {section.title}
                </h2>
                <p className="mt-3 leading-7 text-muted">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={SOR_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#C9A86A,#B8943A)] px-6 py-3 text-sm font-bold text-[#0A0E12] transition hover:-translate-y-0.5"
            >
              Falar sobre meus dados no WhatsApp
            </a>
            <Link
              href="/diagnostico"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--sor-border-main)] px-6 py-3 text-sm font-bold text-muted transition hover:border-[var(--sor-border-champagne)] hover:text-foreground"
            >
              Voltar ao diagnóstico
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
