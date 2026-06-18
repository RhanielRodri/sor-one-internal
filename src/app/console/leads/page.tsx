import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/admin/status-badge";
import {
  getLeads,
  LEAD_STATUSES,
  STATUS_LABELS,
  type Lead,
  type LeadStatus,
} from "@/lib/leads";

export const metadata: Metadata = {
  title: "Leads",
};

export const dynamic = "force-dynamic";

type LeadsPageProps = {
  searchParams: Promise<{ status?: string }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(value));
}

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  const { status } = await searchParams;
  const selectedStatus = LEAD_STATUSES.includes(status as LeadStatus)
    ? status
    : "";
  let leads: Lead[] = [];
  let error = "";

  try {
    leads = await getLeads(selectedStatus);
  } catch (caughtError) {
    console.error(
      "[Console Leads] Falha ao carregar leads",
      caughtError instanceof Error ? caughtError.message : "Erro desconhecido",
    );
    error = "Não foi possível carregar os leads do Supabase.";
  }

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-accent">Captação</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Leads</h1>
          <p className="mt-2 text-muted">
            Registros enviados pelo formulário de diagnóstico.
          </p>
        </div>
        <form className="flex items-end gap-2" method="get">
          <label className="grid gap-2 text-sm font-medium">
            Status
            <select
              name="status"
              defaultValue={selectedStatus}
              className="min-h-11 rounded-lg border border-border bg-white px-3.5 outline-none focus:border-accent"
            >
              <option value="">Todos</option>
              {LEAD_STATUSES.map((item) => (
                <option key={item} value={item}>
                  {STATUS_LABELS[item]}
                </option>
              ))}
            </select>
          </label>
          <button className="min-h-11 rounded-lg bg-accent px-4 text-sm font-semibold text-white hover:bg-accent-hover">
            Filtrar
          </button>
        </form>
      </div>

      {error ? (
        <p className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      ) : leads.length === 0 ? (
        <Card className="mt-8 py-14 text-center">
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
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-border bg-slate-50 text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-5 py-4 font-semibold">Lead</th>
                  <th className="px-5 py-4 font-semibold">Contato</th>
                  <th className="px-5 py-4 font-semibold">Segmento</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Origem</th>
                  <th className="px-5 py-4 font-semibold">Criado em</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leads.map((lead) => (
                  <tr key={lead.id} className="align-top hover:bg-slate-50/70">
                    <td className="px-5 py-4">
                      <p className="font-semibold">{lead.nome}</p>
                      <p className="mt-1 text-xs text-muted">
                        {lead.empresa || "Sem empresa"}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p>{lead.whatsapp}</p>
                      <p className="mt-1 text-xs text-muted">
                        {lead.email || "Sem e-mail"}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-muted">
                      {lead.segmento || "Não informado"}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-5 py-4 text-muted">
                      {lead.origem || "site"}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-muted">
                      {formatDate(lead.criado_em)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
