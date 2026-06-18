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
  { status: "novo", label: "Leads novos" },
  {
    status: "diagnostico_solicitado",
    label: STATUS_LABELS.diagnostico_solicitado,
  },
  {
    status: "diagnostico_enviado",
    label: STATUS_LABELS.diagnostico_enviado,
  },
  { status: "proposta_enviada", label: STATUS_LABELS.proposta_enviada },
  { status: "fechado", label: "Fechados" },
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
      <p className="text-sm font-semibold text-accent">Visão geral</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-muted">
        Acompanhamento dos leads capturados pelo diagnóstico.
      </p>

      {error ? (
        <p className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {metrics.map((metric) => (
            <Card key={metric.label} className="p-6">
              <p className="text-sm font-medium text-muted">{metric.label}</p>
              <p className="mt-3 text-4xl font-bold tracking-tight">
                {metric.status
                  ? leads.filter((lead) => lead.status === metric.status).length
                  : leads.length}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
