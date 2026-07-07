import "server-only";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  LEAD_STATUSES,
  type Lead,
  type LeadHistory,
  type LeadStatus,
} from "@/lib/lead-types";

export {
  LEAD_STATUSES,
  STATUS_LABELS,
  type Lead,
  type LeadHistory,
  type LeadStatus,
} from "@/lib/lead-types";

export async function getLeads(status?: string) {
  const supabase = getSupabaseAdminClient();
  let query = supabase
    .from("leads")
    .select(
      "id,nome,empresa,whatsapp,email,segmento,problema,urgencia,orcamento,origem,status,observacoes,criado_em,atualizado_em,cidade_uf,objetivo_principal,tipo_negocio,canais_atuais,gargalo,volume_contatos,resultado_desejado,solucao_recomendada,modulos_recomendados,maturidade",
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

export async function getLeadHistories(leadIds: Array<string | number>) {
  if (leadIds.length === 0) {
    return [] as LeadHistory[];
  }

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("lead_historico")
    .select(
      "id,lead_id,status_anterior,novo_status,acao,motivo_perda,criado_em",
    )
    .in("lead_id", leadIds.map(String))
    .order("criado_em", { ascending: false });

  if (error) {
    console.error("[Supabase Admin] Erro ao consultar histórico de leads", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    throw new Error(error.message);
  }

  return (data ?? []) as LeadHistory[];
}
