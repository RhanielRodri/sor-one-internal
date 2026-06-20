import {
  LEAD_STATUSES,
  STATUS_LABELS,
  type LeadStatus,
} from "@/lib/lead-types";

export function StatusBadge({ status }: { status: string }) {
  const knownStatus = LEAD_STATUSES.includes(status as LeadStatus)
    ? (status as LeadStatus)
    : null;

  const styles: Record<LeadStatus, string> = {
    prospectado: "bg-teal-500/10 text-teal-300 ring-teal-400/20",
    diagnostico_solicitado: "bg-amber-500/10 text-amber-300 ring-amber-400/20",
    em_analise: "bg-sky-500/10 text-sky-300 ring-sky-400/20",
    contato_iniciado: "bg-cyan-500/10 text-cyan-300 ring-cyan-400/20",
    proposta_enviada: "bg-indigo-500/10 text-indigo-300 ring-indigo-400/20",
    negocio_ganho: "bg-emerald-500/10 text-emerald-300 ring-emerald-400/20",
    em_execucao: "bg-blue-500/10 text-blue-300 ring-blue-400/20",
    entregue: "bg-green-500/10 text-green-300 ring-green-400/20",
    sem_retorno: "bg-slate-500/10 text-slate-300 ring-slate-400/20",
    negocio_perdido: "bg-red-500/10 text-red-300 ring-red-400/20",
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${knownStatus ? styles[knownStatus] : "bg-slate-100 text-slate-700 ring-slate-200"}`}>
      {knownStatus ? STATUS_LABELS[knownStatus] : status}
    </span>
  );
}
