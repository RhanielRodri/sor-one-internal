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

const metrics: Array<{ status?: LeadStatus; label: string }> = [
  { label: "Total de leads" },
  {
    status: "diagnostico_solicitado",
    label: STATUS_LABELS.diagnostico_solicitado,
  },
  { status: "em_analise", label: STATUS_LABELS.em_analise },
  { status: "contato_iniciado", label: STATUS_LABELS.contato_iniciado },
  { status: "proposta_enviada", label: STATUS_LABELS.proposta_enviada },
  { status: "negocio_ganho", label: STATUS_LABELS.negocio_ganho },
];

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

  return (
    <div>
      <header className="flex flex-col gap-5 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Visão geral</p>
          <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Dashboard</h1>
          <p className="mt-2 text-muted">Acompanhamento da operação comercial do SOR.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 font-mono text-xs font-bold text-soft">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Dados em tempo real
        </div>
      </header>

      {error ? (
        <p className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {metrics.map((metric, index) => {
              const value = metric.status
                ? leads.filter((lead) => lead.status === metric.status).length
                : leads.length;
              return (
                <Card key={metric.label} className={`relative overflow-hidden rounded-[1.5rem] p-6 ${index === 0 ? "border-accent/35 bg-gradient-to-br from-blue-600/20 to-[#080d18] text-white" : ""}`}>
                  <div className={`absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-xl text-xs font-black ${index === 0 ? "bg-accent text-white" : "bg-accent-light text-accent"}`}>0{index + 1}</div>
                  <p className={`text-sm font-semibold ${index === 0 ? "text-slate-400" : "text-muted"}`}>{metric.label}</p>
                  <p className="mt-5 text-4xl font-black tracking-[-0.04em]">{value}</p>
                  <div className={`mt-5 h-1.5 overflow-hidden rounded-full ${index === 0 ? "bg-slate-800" : "bg-slate-100"}`}>
                    <div className="h-full rounded-full bg-accent shadow-[0_0_12px_rgba(34,197,94,.4)]" style={{ width: `${leads.length ? Math.max(12, Math.round((value / leads.length) * 100)) : 0}%` }} />
                  </div>
                </Card>
              );
            })}
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <Card className="rounded-[1.75rem] p-7">
              <div className="flex items-center justify-between">
                <div><p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Pipeline</p><h2 className="mt-2 text-xl font-black">Distribuição dos leads</h2></div>
                <span className="text-xs font-semibold text-soft">{leads.length} registros</span>
              </div>
              <div className="mt-7 grid gap-4">
                {metrics.slice(1).map((metric) => {
                  const value = leads.filter((lead) => lead.status === metric.status).length;
                  return <div key={metric.label} className="grid grid-cols-[1fr_auto] gap-3"><div><div className="flex justify-between text-sm"><span className="font-semibold">{metric.label}</span><span className="text-soft">{value}</span></div><div className="mt-2 h-2 rounded-full bg-slate-100"><div className="h-full rounded-full bg-accent" style={{ width: `${leads.length ? (value / leads.length) * 100 : 0}%` }} /></div></div></div>;
                })}
              </div>
            </Card>
            <Card className="rounded-[1.75rem] border-sky-400/20 bg-gradient-to-br from-[#14213a] to-[#080d18] p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-xl text-white">↗</span>
              <p className="mt-7 text-xs font-black uppercase tracking-[0.18em] text-accent">Próxima ação</p>
              <h2 className="mt-2 text-2xl font-black">Acompanhe os diagnósticos solicitados.</h2>
              <p className="mt-3 text-sm leading-6 text-muted">Leads em fase inicial precisam de resposta rápida para manter o interesse ativo.</p>
              <a href="/console/leads?status=diagnostico_solicitado" className="mt-6 inline-flex font-bold text-accent hover:underline">Ver leads pendentes →</a>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
