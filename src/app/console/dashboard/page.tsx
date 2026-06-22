import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import {
  getLeads,
  STATUS_LABELS,
  type Lead,
  type LeadStatus,
} from "@/lib/leads";

export const metadata: Metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

const pipelineStatuses: LeadStatus[] = [
  "diagnostico_solicitado",
  "em_analise",
  "contato_iniciado",
  "proposta_enviada",
  "negocio_ganho",
];

function parseRevenue(orcamento: string | null): number {
  if (!orcamento) return 0;
  const match = orcamento.match(/[\d.]+/g);
  if (!match) return 0;
  const nums = match.map((n) => parseFloat(n.replace(".", "")));
  return nums.length ? Math.max(...nums) : 0;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(value));
}

export default async function DashboardPage() {
  let leads: Lead[] = [];
  let error = "";

  try {
    leads = await getLeads();
  } catch (caughtError) {
    console.error(
      "[Console Dashboard] Falha ao carregar métricas",
      caughtError instanceof Error ? caughtError.message : "Erro desconhecido",
    );
    error = "Não foi possível carregar as métricas do Supabase.";
  }

  const total = leads.length;
  const ganhos = leads.filter((l) => l.status === "negocio_ganho" || l.status === "em_execucao" || l.status === "entregue").length;
  const conversionRate = total ? Math.round((ganhos / total) * 100) : 0;
  const receitaPotencial = leads
    .filter((l) => l.status === "proposta_enviada" || l.status === "negocio_ganho")
    .reduce((acc, l) => acc + parseRevenue(l.orcamento), 0);
  const latestLeads = leads.slice(0, 5);

  return (
    <div>
      <header className="flex flex-col gap-5 border-b border-[var(--sor-border-main)] pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--sor-champagne)]">Visão geral</p>
          <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Dashboard</h1>
          <p className="mt-2 text-muted">Acompanhamento da operação comercial.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[var(--sor-border-main)] bg-[var(--sor-card)] px-3 py-2 font-mono text-xs font-bold text-soft">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
          Dados em tempo real
        </div>
      </header>

      {error ? (
        <p className="mt-8 rounded-2xl border border-red-400/20 bg-red-500/8 p-5 text-sm font-medium text-red-300">
          {error}
        </p>
      ) : (
        <>
          {/* KPI cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Total de leads", value: String(total), sub: "registros captados" },
              { label: "Taxa de conversão", value: `${conversionRate}%`, sub: `${ganhos} negócios ganhos` },
              { label: "Receita potencial", value: formatCurrency(receitaPotencial), sub: "em propostas + ganhos" },
              { label: "Diagnósticos pendentes", value: String(leads.filter((l) => l.status === "diagnostico_solicitado").length), sub: "aguardando análise" },
            ].map((kpi, i) => (
              <Card
                key={kpi.label}
                className={`relative overflow-hidden rounded-[1.5rem] p-6 ${
                  i === 0
                    ? "border-[rgba(201,168,106,0.25)] bg-[linear-gradient(135deg,rgba(201,168,106,0.08),var(--sor-card))]"
                    : ""
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-soft">{kpi.label}</p>
                <p className="mt-4 text-4xl font-black tracking-[-0.04em]">{kpi.value}</p>
                <p className="mt-2 text-xs text-soft">{kpi.sub}</p>
                <div className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-xl border border-[rgba(201,168,106,0.2)] bg-[rgba(201,168,106,0.06)] text-[10px] font-black text-[var(--sor-champagne)]">
                  0{i + 1}
                </div>
              </Card>
            ))}
          </div>

          {/* Pipeline + Latest leads */}
          <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <Card className="rounded-[1.75rem] border-[var(--sor-border-main)] p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--sor-champagne)]">Pipeline</p>
                  <h2 className="mt-2 text-xl font-black">Distribuição dos leads</h2>
                </div>
                <span className="text-xs font-semibold text-soft">{total} registros</span>
              </div>
              <div className="mt-7 grid gap-5">
                {pipelineStatuses.map((status) => {
                  const count = leads.filter((l) => l.status === status).length;
                  const pct = total ? (count / total) * 100 : 0;
                  return (
                    <div key={status}>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">{STATUS_LABELS[status]}</span>
                        <span className="text-soft">{count}</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--sor-bg-soft)]">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,#C9A86A,#D4B87A)]"
                          style={{ width: `${Math.max(pct, count > 0 ? 6 : 0)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Latest leads */}
            <Card className="rounded-[1.75rem] border-[var(--sor-border-main)] p-7">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--sor-champagne)]">Últimos leads</p>
              <h2 className="mt-2 text-xl font-black">Entradas recentes</h2>
              {latestLeads.length ? (
                <ol className="mt-7 grid gap-4">
                  {latestLeads.map((lead) => (
                    <li key={lead.id} className="flex items-start gap-3 border-b border-[var(--sor-border-main)] pb-4 last:border-0 last:pb-0">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-[var(--sor-border-main)] bg-[var(--sor-bg-soft)] text-xs font-black text-[var(--sor-champagne)]">
                        {lead.nome[0]?.toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">{lead.nome}</p>
                        <p className="mt-0.5 text-xs text-soft">{formatDate(lead.criado_em)}</p>
                      </div>
                      <span className="ml-auto shrink-0 text-[10px] font-bold text-soft">{STATUS_LABELS[lead.status as LeadStatus] || lead.status}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-7 text-sm text-soft">Nenhum lead registrado ainda.</p>
              )}
              <a
                href="/console/leads"
                className="mt-6 inline-flex text-sm font-bold text-[var(--sor-champagne)] hover:underline"
              >
                Ver todos os leads →
              </a>
            </Card>
          </div>

          {/* CTA card */}
          <Card className="mt-5 rounded-[1.75rem] border-[rgba(201,168,106,0.18)] bg-[linear-gradient(135deg,rgba(201,168,106,0.06),var(--sor-card))] p-7">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--sor-champagne)]">Próxima ação</p>
                <h2 className="mt-2 text-2xl font-black">Acompanhe os diagnósticos solicitados.</h2>
                <p className="mt-2 text-sm leading-6 text-muted">Leads em fase inicial precisam de resposta rápida para manter o interesse ativo.</p>
              </div>
              <a
                href="/console/leads?status=diagnostico_solicitado"
                className="shrink-0 rounded-xl border border-[rgba(201,168,106,0.3)] bg-[rgba(201,168,106,0.06)] px-5 py-3 text-sm font-bold text-[var(--sor-champagne)] hover:bg-[rgba(201,168,106,0.12)]"
              >
                Ver leads pendentes →
              </a>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
