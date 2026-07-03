import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/public/container";
import { ServicesShowcase } from "@/components/public/services-showcase";
import { siteUrl } from "@/lib/constants";
import { getActiveServices, type PublicService } from "@/lib/services";
import {
  staticServiceShowcase,
  toShowcaseFromServices,
  type ServiceShowcaseItem,
} from "@/data/service-catalog";

export const metadata: Metadata = {
  title: "Soluções — Sites, sistemas e automações para pequenos negócios",
  description:
    "Sites profissionais, landing pages, catálogos digitais, sistemas de agendamento, dashboards e automações com IA para pequenos negócios em Vila Velha, ES e em todo o Brasil.",
  keywords: [
    "site para barbearia",
    "catálogo digital",
    "sistema de agendamento",
    "site para pequenos negócios",
    "freelancer Vila Velha ES",
  ],
  openGraph: {
    title: "Soluções digitais para pequenos negócios | SOR ONE",
    description:
      "Sites, catálogos, agendamento e automações sob medida. Diagnóstico gratuito.",
    url: `${siteUrl}/solucoes`,
    siteName: "SOR ONE",
    locale: "pt_BR",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default async function SolutionsPage() {
  let items: ServiceShowcaseItem[] = staticServiceShowcase;

  try {
    const services: PublicService[] = await getActiveServices();
    if (services.length > 0) {
      items = toShowcaseFromServices(services);
    }
  } catch (caughtError) {
    console.error(
      "[Soluções] Falha ao carregar serviços",
      caughtError instanceof Error ? caughtError.message : "Erro desconhecido",
    );
  }

  return (
    <div className="relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <section
        className="relative border-b py-20 sm:py-28"
        style={{ borderColor: "var(--border-soft)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[44rem] max-w-[94vw] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(circle at center, rgba(201,168,106,0.12), transparent 60%)",
            filter: "blur(34px)",
          }}
        />
        <Container>
          <div className="relative mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--champagne-border)] bg-[var(--champagne-dim)] px-3 py-1.5 text-xs font-bold text-[var(--sor-champagne)]">
              Soluções
            </span>
            <h1
              className="mt-6 text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            >
              O que posso desenvolver para o seu negócio
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
              Cada solução é desenvolvida sob medida para o que o seu negócio
              precisa hoje. Compare o escopo, prazo e o que está incluso em cada
              opção.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/diagnostico"
                className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm transition hover:opacity-90"
                style={{
                  background: "var(--champagne)",
                  color: "#060709",
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontWeight: 700,
                }}
              >
                Solicitar diagnóstico gratuito
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-22">
        <Container>
          <ServicesShowcase items={items} headingLevel="h2" />
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container>
          <div
            className="relative overflow-hidden rounded-[2rem] border p-8 sm:p-11"
            style={{
              borderColor: "var(--champagne-border)",
              background:
                "linear-gradient(135deg, var(--card-elevated), var(--card-deep))",
            }}
          >
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                  Não encontrou o que precisa?
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-muted">
                  Todo projeto começa por um diagnóstico. Conte o problema e eu
                  digo a forma mais simples de resolver — sem inflar escopo.
                </p>
              </div>
              <Link
                href="/diagnostico"
                className="inline-flex shrink-0 items-center justify-center rounded-xl px-6 py-3.5 text-sm transition hover:opacity-90"
                style={{
                  background: "var(--champagne)",
                  color: "#060709",
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontWeight: 700,
                }}
              >
                Começar diagnóstico
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
