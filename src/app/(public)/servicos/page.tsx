import type { Metadata } from "next";
import { Container } from "@/components/public/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getActiveServices,
  type PublicService,
} from "@/lib/services";
import { SOR_WHATSAPP_URL } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Serviços",
  description: "Soluções digitais simples para pequenos negócios.",
};

export const dynamic = "force-dynamic";

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

function getServicePositioning(name: string) {
  const normalized = name.toLowerCase();
  if (normalized.includes("catálogo") || normalized.includes("catalogo")) {
    return {
      ideal: "Negócios com produtos ou serviços que precisam vender pelo digital.",
      result: "Oferta organizada e caminho mais curto até o pedido.",
    };
  }
  if (normalized.includes("agenda") || normalized.includes("agendamento")) {
    return {
      ideal: "Profissionais e equipes que trabalham com horários marcados.",
      result: "Atendimento mais previsível e menos organização manual.",
    };
  }
  if (
    normalized.includes("site") ||
    normalized.includes("página") ||
    normalized.includes("presença")
  ) {
    return {
      ideal: "Negócios que precisam transmitir confiança e gerar contatos.",
      result: "Presença profissional e comunicação mais clara.",
    };
  }
  return {
    ideal: "Negócios que precisam organizar uma rotina ou processo específico.",
    result: "Menos improviso e mais clareza operacional.",
  };
}

function getServiceIcon(name: string) {
  const normalized = name.toLowerCase();

  if (normalized.includes("catálogo") || normalized.includes("catalogo")) {
    return "◇";
  }
  if (normalized.includes("agenda")) {
    return "◎";
  }
  if (normalized.includes("manutenção") || normalized.includes("manutencao")) {
    return "↻";
  }
  if (normalized.includes("ajuste")) {
    return "⌁";
  }
  if (normalized.includes("site") || normalized.includes("presença")) {
    return "↗";
  }

  return "▦";
}

export default async function ServicesPage() {
  let services: PublicService[] = [];
  let error = "";

  try {
    services = (await getActiveServices()).slice(0, 6);
  } catch (caughtError) {
    console.error(
      "[Página de serviços] Falha ao carregar serviços",
      caughtError instanceof Error ? caughtError.message : "Erro desconhecido",
    );
    error = "Não foi possível carregar os serviços agora.";
  }

  return (
    <div className="services-surface relative overflow-hidden">
      <div className="premium-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="hero-particles pointer-events-none absolute inset-0 hidden opacity-45 md:block" />
      <div className="pointer-events-none absolute -left-72 top-[30rem] hidden h-[38rem] w-[38rem] rounded-full border border-blue-400/8 lg:block" />
      <div className="pointer-events-none absolute -right-64 top-[52rem] hidden h-[34rem] w-[34rem] rounded-full border border-[rgba(14,165,164,0.08)] lg:block" />

      <section className="relative overflow-hidden border-b border-border py-18 sm:py-24">
        <div className="services-hero-glow pointer-events-none absolute left-1/2 top-1/2 h-80 w-[44rem] max-w-[94vw] -translate-x-1/2 -translate-y-1/2" />
        <div className="hero-orbit pointer-events-none absolute left-1/2 top-[-21rem] hidden h-[42rem] w-[42rem] -translate-x-1/2 md:block" />
        <Container>
          <div className="relative mx-auto max-w-4xl text-center">
            <Badge>Serviços SOR OS</Badge>
            <h1 className="text-balance mt-6 text-4xl font-black tracking-[-0.055em] sm:text-5xl lg:text-6xl">
              O que podemos desenvolver{" "}
              <span className="bg-[linear-gradient(90deg,#93c5fd,#2563eb_58%,#0ea5a4)] bg-clip-text text-transparent">
                para você
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
              Soluções completas para vender, atender, organizar e automatizar seu negócio.
            </p>
            <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-3 text-xs font-bold text-soft">
              {["Escopo objetivo", "Prazo transparente", "Implementação por etapas"].map((item) => (
                <span key={item} className="rounded-full border border-blue-400/14 bg-[rgba(13,20,24,0.74)] px-4 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative py-16 sm:py-22">
        <div className="pointer-events-none absolute left-[8%] top-24 h-72 w-72 rounded-full bg-blue-600/7 blur-3xl" />
        <div className="pointer-events-none absolute bottom-32 right-[5%] h-80 w-80 rounded-full bg-[rgba(14,165,164,0.05)] blur-3xl" />
        <Container>
          {error ? (
            <p className="relative rounded-2xl border border-red-400/20 bg-red-500/8 p-5 text-center text-sm text-red-300">
              {error}
            </p>
          ) : services.length === 0 ? (
            <Card className="relative py-14 text-center">
              <h2 className="text-xl font-bold">
                Nenhum serviço disponível no momento
              </h2>
              <p className="mt-2 text-sm text-muted">
                Novas soluções serão publicadas em breve.
              </p>
            </Card>
          ) : (
            <div className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service, index) => (
                <Card
                  key={service.id}
                  className={`service-card-shell group relative flex min-h-[430px] flex-col overflow-hidden rounded-[1.75rem] border-blue-400/14 p-7 transition duration-300 hover:-translate-y-1.5 hover:border-blue-400/30 ${
                    service.destaque ? "service-card-featured border-blue-400/28" : ""
                  }`}
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/5 blur-2xl transition group-hover:bg-blue-500/9" />
                  <div className="flex items-start justify-between gap-4">
                    <span className="service-icon-shell grid h-12 w-12 place-items-center rounded-xl border border-blue-400/20 text-xl text-blue-300">
                      {getServiceIcon(service.nome)}
                    </span>
                    {service.destaque ? (
                      <span className="rounded-full border border-blue-400/18 bg-blue-500/8 px-3 py-1.5 text-[10px] font-bold text-blue-200">
                        Destaque
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold tracking-[0.16em] text-soft">
                        0{index + 1}
                      </span>
                    )}
                  </div>
                  <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.18em] text-blue-300/80">
                    Solução SOR OS
                  </p>
                  <h2 className="mt-2 text-2xl font-black tracking-[-0.025em]">{service.nome}</h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{service.descricao}</p>

                  <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-white/6 bg-black/12 p-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-soft">A partir de</p>
                      <p className="mt-1 text-lg font-black">{formatPrice(service.preco_inicio)}</p>
                    </div>
                    <div className="border-l border-white/7 pl-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-soft">Prazo</p>
                      <p className="mt-1 text-lg font-black">{service.prazo_dias ? `${service.prazo_dias} dias` : "A definir"}</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-blue-300/75">Ideal para</p>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-soft">
                      {getServicePositioning(service.nome).ideal}
                    </p>
                  </div>

                  <div className="mt-auto grid gap-3 pt-6">
                    <Button href="/diagnostico" fullWidth>
                      Solicitar diagnóstico
                    </Button>
                    <a
                      href={SOR_WHATSAPP_URL}
                      className="text-center text-xs font-semibold text-soft underline-offset-4 hover:text-blue-300 hover:underline"
                    >
                      Falar agora
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="relative pb-20 sm:pb-24">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-blue-400/20 bg-[linear-gradient(135deg,rgba(22,34,41,0.96),rgba(8,13,20,0.98))] p-8 shadow-[0_32px_90px_rgba(0,0,0,0.38),0_0_45px_rgba(37,99,235,0.06)] sm:p-11">
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-600/12 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-[12%] h-px w-2/3 bg-[linear-gradient(90deg,transparent,rgba(96,165,250,0.5),transparent)]" />
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">Próximo passo</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                  Não sabe qual solução faz sentido?
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-muted">
                  O diagnóstico organiza sua prioridade antes de definir tecnologia, escopo ou investimento.
                </p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-soft">
                  <span>Resposta objetiva</span>
                  <span>Solução proporcional</span>
                  <span>Sem compromisso</span>
                </div>
              </div>
              <Button href="/diagnostico" className="shrink-0">
                Solicitar diagnóstico
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
