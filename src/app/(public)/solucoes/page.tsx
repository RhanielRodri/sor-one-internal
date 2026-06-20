import type { Metadata } from "next";
import { Container } from "@/components/public/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getServiceSlug } from "@/lib/diagnostic-config";
import { getActiveServices, type PublicService } from "@/lib/services";

export const metadata: Metadata = {
  title: "Soluções",
  description: "Soluções digitais para vender, atender e organizar melhor.",
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

function getServiceDetails(name: string): ServiceDetails {
  const normalized = name.toLowerCase();

  if (normalized.includes("catálogo") || normalized.includes("catalogo")) {
    return {
      audience: "Lojas, confeitarias e negócios que precisam apresentar produtos com clareza.",
      includes: ["Catálogo responsivo", "Organização de produtos", "Contato ou pedido facilitado"],
    };
  }

  if (normalized.includes("agendamento") || normalized.includes("agenda")) {
    return {
      audience: "Clínicas, salões e prestadores que trabalham com horários marcados.",
      includes: ["Agenda online", "Organização de horários", "Fluxo de atendimento"],
    };
  }

  if (normalized.includes("manutenção") || normalized.includes("manutencao")) {
    return {
      audience: "Negócios que já possuem presença digital e precisam mantê-la estável.",
      includes: ["Atualizações recorrentes", "Ajustes técnicos", "Suporte prioritário"],
    };
  }

  if (normalized.includes("ajuste")) {
    return {
      audience: "Empresas com site existente que precisa de correções ou evolução pontual.",
      includes: ["Correções visuais", "Responsividade", "Melhorias de desempenho"],
    };
  }

  if (normalized.includes("institucional")) {
    return {
      audience: "Empresas que precisam apresentar marca, serviços e canais de contato.",
      includes: ["Site completo", "Páginas comerciais", "Formulário de contato"],
    };
  }

  return {
    audience: "Pequenos negócios que precisam construir confiança e gerar novos contatos.",
    includes: ["Página profissional", "Versão responsiva", "Contato integrado"],
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
      <section className="relative border-b border-border py-18 sm:py-24">
        <div className="services-hero-glow pointer-events-none absolute left-1/2 top-1/2 h-80 w-[44rem] max-w-[94vw] -translate-x-1/2 -translate-y-1/2" />
        <Container>
          <div className="relative mx-auto max-w-4xl text-center">
            <Badge>Soluções SOR OS</Badge>
            <h1 className="text-balance mt-6 text-4xl font-black tracking-[-0.055em] sm:text-5xl lg:text-6xl">
              Soluções digitais para vender, atender e organizar melhor.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
              Escolha uma estrutura pronta ou solicite uma solução personalizada para o seu negócio.
            </p>
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
              {services.map((service, index) => {
                const details = getServiceDetails(service.nome);

                return (
                  <Card
                    key={service.id}
                    className={`service-card-shell group relative flex min-h-[540px] flex-col overflow-hidden rounded-[1.75rem] border-blue-400/14 p-7 transition duration-300 hover:-translate-y-1.5 hover:border-blue-400/30 ${
                      service.destaque ? "service-card-featured border-blue-400/28" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid h-11 w-11 place-items-center rounded-xl border border-blue-400/20 bg-blue-500/8 text-sm font-black text-blue-300">
                        0{index + 1}
                      </span>
                      {service.destaque ? (
                        <span className="rounded-full border border-[var(--sor-border-champagne)] bg-[rgba(214,181,109,0.06)] px-3 py-1.5 text-[10px] font-bold text-[var(--sor-champagne-light)]">
                          Destaque
                        </span>
                      ) : null}
                    </div>

                    <h2 className="mt-6 text-2xl font-black tracking-[-0.025em]">{service.nome}</h2>
                    <p className="mt-3 text-sm leading-6 text-muted">{service.descricao}</p>

                    <div className="mt-6 border-t border-white/7 pt-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-300">Para quem é</p>
                      <p className="mt-2 text-sm leading-6 text-soft">{details.audience}</p>
                    </div>

                    <div className="mt-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-300">O que inclui</p>
                      <ul className="mt-3 grid gap-2 text-sm text-muted">
                        {details.includes.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="text-[var(--sor-petrol)]">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-white/6 bg-black/12 p-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-soft">A partir de</p>
                        <p className="mt-1 text-lg font-black">{formatPrice(service.preco_inicio)}</p>
                      </div>
                      <div className="border-l border-white/7 pl-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-soft">Prazo estimado</p>
                        <p className="mt-1 text-lg font-black">
                          {service.prazo_dias ? `${service.prazo_dias} dias` : "A definir"}
                        </p>
                      </div>
                    </div>

                    <Button href={`/diagnostico?servico=${getServiceSlug(service.nome)}`} variant="secondary" fullWidth className="mt-auto">
                      Solicitar diagnóstico
                    </Button>
                  </Card>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      <section className="relative pb-20 sm:pb-24">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-blue-400/20 bg-[linear-gradient(135deg,rgba(22,34,41,0.96),rgba(8,13,20,0.98))] p-8 shadow-[0_32px_90px_rgba(0,0,0,0.38)] sm:p-11">
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-600/12 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                  Projetos personalizados
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-muted">
                  Para negócios que precisam de painel, automação, integração ou fluxo específico.
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
