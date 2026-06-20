import type { Metadata } from "next";
import Link from "next/link";
import { LeadsExplorer } from "@/components/admin/leads-explorer";
import { Card } from "@/components/ui/card";
import {
  getLeadHistories,
  getLeads,
  type Lead,
  type LeadHistory,
  type LeadStatus,
} from "@/lib/leads";

export const metadata: Metadata = {
  title: "Leads",
};

export const dynamic = "force-dynamic";

type LeadsPageProps = {
  searchParams: Promise<{ status?: string }>;
};

const FILTERS: Array<{ value: LeadStatus | ""; label: string }> = [
  { value: "", label: "Todos" },
  { value: "prospectado", label: "Prospectados" },
  { value: "diagnostico_solicitado", label: "Diagnóstico solicitado" },
  { value: "em_analise", label: "Em análise" },
  { value: "contato_iniciado", label: "Contato iniciado" },
  { value: "proposta_enviada", label: "Proposta enviada" },
  { value: "negocio_ganho", label: "Ganhos" },
  { value: "em_execucao", label: "Em execução" },
  { value: "entregue", label: "Entregues" },
  { value: "negocio_perdido", label: "Perdidos" },
];

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  const { status } = await searchParams;
  const selectedStatus = FILTERS.some((filter) => filter.value === status)
    ? (status as LeadStatus)
    : "";
  let leads: Lead[] = [];
  let histories: LeadHistory[] = [];
  let error = "";
  let historyWarning = "";

  try {
    leads = await getLeads(selectedStatus);
  } catch (caughtError) {
    console.error(
      "[Console Leads] Falha ao carregar leads",
      caughtError instanceof Error ? caughtError.message : "Erro desconhecido",
    );
    error = "Não foi possível carregar os leads do Supabase.";
  }

  if (!error) {
    try {
      histories = await getLeadHistories(leads.map((lead) => lead.id));
    } catch (caughtError) {
      console.error(
        "[Console Leads] Falha ao carregar histórico",
        caughtError instanceof Error ? caughtError.message : "Erro desconhecido",
      );
      historyWarning =
        "A migration do histórico ainda precisa ser aplicada no Supabase.";
    }
  }

  return (
    <div>
      <header className="flex flex-col gap-5 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Captação</p>
          <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Leads</h1>
          <p className="mt-2 text-muted">
            Registros enviados pelo formulário de diagnóstico.
          </p>
        </div>
      </header>

      <nav className="-mx-1 mt-6 flex gap-2 overflow-x-auto px-1 pb-2" aria-label="Filtrar leads por status">
        {FILTERS.map((filter) => (
          <Link
            key={filter.value || "todos"}
            href={filter.value ? `/console/leads?status=${filter.value}` : "/console/leads"}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${
              selectedStatus === filter.value
                ? "border-accent/45 bg-accent-light text-accent"
                : "border-border bg-card text-muted hover:border-accent/30 hover:text-foreground"
            }`}
          >
            {filter.label}
          </Link>
        ))}
      </nav>

      {historyWarning ? (
        <p className="mt-5 rounded-xl border border-amber-400/20 bg-amber-500/8 p-4 text-sm text-amber-200">
          {historyWarning}
        </p>
      ) : null}

      {error ? (
        <p className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      ) : leads.length === 0 ? (
        <Card className="mt-8 py-16 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent-light text-2xl text-accent">◎</span>
          <h2 className="text-xl font-bold">Nenhum lead encontrado</h2>
          <p className="mt-2 text-sm text-muted">
            {selectedStatus
              ? "Não existem leads com o status selecionado."
              : "Os novos diagnósticos aparecerão aqui."}
          </p>
          {selectedStatus ? (
            <Link
              href="/console/leads"
              className="mt-5 inline-flex text-sm font-semibold text-accent hover:underline"
            >
              Limpar filtro
            </Link>
          ) : null}
        </Card>
      ) : (
        <LeadsExplorer leads={leads} histories={histories} />
      )}
    </div>
  );
}
