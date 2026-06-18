import "server-only";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const LEAD_STATUSES = [
  "novo",
  "diagnostico_solicitado",
  "diagnostico_enviado",
  "proposta_enviada",
  "fechado",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type Lead = {
  id: string | number;
  nome: string;
  empresa: string | null;
  whatsapp: string;
  email: string | null;
  segmento: string | null;
  problema: string;
  urgencia: string | null;
  orcamento: string | null;
  origem: string | null;
  status: string;
  observacoes: string | null;
  criado_em: string;
  atualizado_em: string | null;
};

export const STATUS_LABELS: Record<LeadStatus, string> = {
  novo: "Novo",
  diagnostico_solicitado: "Diagnóstico solicitado",
  diagnostico_enviado: "Diagnóstico enviado",
  proposta_enviada: "Proposta enviada",
  fechado: "Fechado",
};

export async function getLeads(status?: string) {
  const supabase = getSupabaseAdminClient();
  let query = supabase
    .from("leads")
    .select(
      "id,nome,empresa,whatsapp,email,segmento,problema,urgencia,orcamento,origem,status,observacoes,criado_em,atualizado_em",
    )
    .order("criado_em", { ascending: false });

  if (status && LEAD_STATUSES.includes(status as LeadStatus)) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("[Supabase Admin] Erro ao consultar leads", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    throw new Error(error.message);
  }

  console.info("[Supabase Admin] Leads carregados", {
    count: data?.length ?? 0,
    status: status || "todos",
  });

  return (data ?? []) as Lead[];
}
