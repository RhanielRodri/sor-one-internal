import type { Metadata } from "next";
import { Container } from "@/components/public/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getServiceSlug } from "@/lib/diagnostic-config";
import { getActiveServices, type PublicService } from "@/lib/services";

export const metadata: Metadata = {
  title: "Soluções | SOR ONE — Sites, sistemas e automações para pequenos negócios",
  description: "Sites profissionais, catálogos digitais, sistemas de agendamento e automações para pequenos negócios em Vila Velha, ES e em todo o Brasil. Preços a partir de R$497.",
  keywords: ["site para barbearia", "catálogo digital", "sistema de agendamento", "site para pequenos negócios", "freelancer Vila Velha ES"],
  openGraph: {
    title: "Soluções digitais para pequenos negócios | SOR ONE",
    description: "Sites, catálogos e sistemas de agendamento a partir de R$497. Diagnóstico gratuito.",
    url: "https://sor-one-internal.vercel.app/solucoes",
    siteName: "SOR ONE",
    locale: "pt_BR",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

type ServiceDetails = {
  audience: string;
  includes: string[];
};

function formatPrice(value: number | null) {
  if (value === null) {
    return "Sob consulta";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

function getServiceIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("catálogo") || n.includes("catalogo")) return "◇";
  if (n.includes("agenda") || n.includes("agendamento")) return "◎";
  if (n.includes("manutenção") || n.includes("manutencao")) return "↻";
  if (n.includes("ajuste")) return "⌁";
  if (n.includes("institucional")) return "↗";
  if (n.includes("landing")) return "⚡";
  if (n.includes("dashboard") || n.includes("painel")) return "▦";
  if (n.includes("automaç") || n.includes("ia ")) return "⟳";
  return "▦";
}

function getServiceDetails(name: string): ServiceDetails {
  const normalized = name.toLowerCase();

  if (normalized.includes("catálogo") || normalized.includes("catalogo")) {
    return {
      audience: "Lojas, confeitarias e distribuidores que vendem para outras empresas ou direto ao consumidor.",
      includes: ["Catálogo responsivo e organizado", "Categorias e filtros", "Solicitação de pedido ou orçamento"],
    };
  }

  if (normalized.includes("agendamento") || normalized.includes("agenda")) {
    return {
      audience: "Clínicas, salões, estúdios e prestadores que dependem de horário marcado.",
      includes: ["Agenda online com confirmação", "Organização automática de horários", "Fluxo de atendimento sem papel"],
    };
  }

  if (normalized.includes("manutenção") || normalized.includes("manutencao")) {
    return {
      audience: "Negócios que já têm presença digital e precisam mantê-la funcional e atualizada.",
      includes: ["Atualizações recorrentes de conteúdo", "Ajustes técnicos e correções", "Suporte com prioridade"],
    };
  }

  if (normalized.includes("ajuste")) {
    return {
      audience: "Empresas com site existente que precisa de melhorias pontuais ou correções.",
      includes: ["Correções visuais e de layout", "Responsividade mobile", "Melhorias de velocidade"],
    };
  }

  if (normalized.includes("institucional")) {
    return {
      audience: "Empresas que precisam apresentar marca, serviços e formas de contato com profissionalismo.",
      includes: ["Site completo e responsivo", "Páginas de serviços e contato", "Integração com WhatsApp"],
    };
  }

  return {
    audience: "Pequenos negócios que querem atrair mais clientes e se apresentar melhor.",
    includes: ["Página profissional responsiva", "Formulário de contato integrado", "Pronto para Google"],
  };
}

export default async function SolutionsPage() {
  let services: PublicService[] = [];
  let error = "";

  try {
    services = (await getActiveServices()).slice(0, 6);
  } catch (caughtError) {
    console.error(
      "[Soluções] Falha ao carregar serviços",
      caughtError instanceof Error ? caughtError.message : "Erro desconhecido",
    );
    error = "Não foi possível carregar as soluções agora.";
  }

  return (
    <div className="services-surface relative overflow-hidden">
      <div className="premium-grid pointer-events-none absolute inset-0 opacity-60" />
      <section className="relative border-b border-[var(--sor-border-main)] py-20 sm:py-28">
        <div className="services-hero-glow pointer-events-none absolute left-1/2 top-1/2 h-80 w-[44rem] max-w-[94vw] -translate-x-1/2 -translate-y-1/2" />
        <Container>
          <div className="relative mx-auto max-w-4xl text-center">
            <Badge>Soluções digitais</Badge>
            <h1 className="text-balance mt-6 text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Sites, sistemas e automações para o seu negócio crescer.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
              Escolha a solução certa para o momento do seu negócio ou solicite um diagnóstico gratuito para receber uma proposta personalizada.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Button href="/diagnostico">Solicitar diagnóstico grátis</Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative py-16 sm:py-22">
        <Container>
          {error ? (
            <p className="rounded-2xl border border-red-400/20 bg-red-500/8 p-5 text-center text-sm text-red-300">
              {error}
            </p>
          ) : services.length === 0 ? (
            <Card className="py-14 text-center">
              <h2 className="text-xl font-bold">Nenhuma solução disponível no momento</h2>
              <p className="mt-2 text-sm text-muted">Novas soluções serão publicadas em breve.</p>
            </Card>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => {
                const details = getServiceDetails(service.nome);

                return (
                  <Card
                    key={service.id}
                    className={`service-card-shell group relative flex min-h-[540px] flex-col overflow-hidden rounded-[1.75rem] border-[var(--sor-border-main)] p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[var(--sor-border-champagne)] ${
                      service.destaque ? "service-card-featured border-[rgba(201,168,106,0.2)]" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="service-icon-shell grid h-11 w-11 place-items-center rounded-xl border border-[rgba(201,168,106,0.14)] text-base text-[var(--sor-champagne)]">
                        {getServiceIcon(service.nome)}
                      </span>
                      {service.destaque ? (
                        <span className="rounded-full border border-[var(--sor-border-champagne)] bg-[rgba(201,168,106,0.06)] px-3 py-1.5 text-[10px] font-bold text-[var(--sor-champagne)]">
                          Mais procurado
                        </span>
                      ) : null}
                    </div>

                    <h2 className="mt-6 text-2xl font-black tracking-[-0.025em]">{service.nome}</h2>
                    <p className="mt-3 text-sm leading-6 text-muted">{service.descricao}</p>

                    <div className="mt-6 border-t border-[var(--sor-border-main)] pt-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--sor-champagne)]">Para quem é</p>
                      <p className="mt-2 text-sm leading-6 text-soft">{details.audience}</p>
                    </div>

                    <div className="mt-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--sor-champagne)]">O que inclui</p>
                      <ul className="mt-3 grid gap-2 text-sm text-muted">
                        {details.includes.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="text-[var(--sor-champagne)]">·</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-[var(--sor-border-main)] bg-black/10 p-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-soft">A partir de</p>
                        <p className="mt-1 text-lg font-black">{formatPrice(service.preco_inicio)}</p>
                      </div>
                      <div className="border-l border-[var(--sor-border-main)] pl-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-soft">Prazo estimado</p>
                        <p className="mt-1 text-lg font-black">
                          {service.prazo_dias ? `${service.prazo_dias} dias` : "A definir"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto pt-6">
                      <Button href={`/diagnostico?servico=${getServiceSlug(service.nome)}`} fullWidth>
                        Solicitar diagnóstico
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      <section className="relative pb-20 sm:pb-24">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(201,168,106,0.18)] bg-[linear-gradient(135deg,var(--sor-card-elevated),var(--sor-panel))] p-8 shadow-[0_32px_90px_rgba(0,0,0,0.42)] sm:p-11">
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[rgba(201,168,106,0.06)] blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                  Projetos personalizados
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-muted">
                  Para negócios que precisam de painel administrativo, automação, integração com sistemas ou fluxo específico.
                </p>
                <p className="mt-5 text-lg font-black">A partir de R$ 2.000</p>
              </div>
              <Button href="/diagnostico?servico=projeto-personalizado" className="shrink-0">
                Conversar sobre projeto
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
