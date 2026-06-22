import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth/admin-request";
import {
  LEAD_STATUSES,
  LOSS_REASONS,
  type LeadStatus,
} from "@/lib/lead-types";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

type StatusRequest = {
  status?: unknown;
  action?: unknown;
  lossReason?: unknown;
  force?: unknown;
};

const ALLOWED_TRANSITIONS: Record<LeadStatus, LeadStatus[]> = {
  prospectado: ["contato_iniciado"],
  diagnostico_solicitado: ["em_analise"],
  em_analise: ["contato_iniciado"],
  contato_iniciado: ["proposta_enviada", "sem_retorno"],
  proposta_enviada: ["negocio_ganho", "negocio_perdido"],
  negocio_ganho: ["em_execucao"],
  em_execucao: ["entregue"],
  entregue: [],
  sem_retorno: ["contato_iniciado"],
  negocio_perdido: [],
};

function getText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  let body: StatusRequest;
  try {
    body = (await request.json()) as StatusRequest;
  } catch {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const { id } = await context.params;
  const nextStatus = getText(body.status) as LeadStatus;
  const action = getText(body.action);
  const lossReason = getText(body.lossReason);
  const force = body.force === true;

  if (!LEAD_STATUSES.includes(nextStatus) || !action) {
    return NextResponse.json(
      { error: "Status ou ação inválidos." },
      { status: 400 },
    );
  }

  if (
    nextStatus === "negocio_perdido" &&
    !LOSS_REASONS.includes(lossReason as (typeof LOSS_REASONS)[number])
  ) {
    return NextResponse.json(
      { error: "Informe um motivo de perda válido." },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdminClient();
  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .select("id,status")
    .eq("id", id)
    .single();

  if (leadError || !lead) {
    return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
  }

  const currentStatus = lead.status as LeadStatus;
  if (
    !force &&
    (!LEAD_STATUSES.includes(currentStatus) ||
      !ALLOWED_TRANSITIONS[currentStatus].includes(nextStatus))
  ) {
    return NextResponse.json(
      { error: "Transição de status não permitida." },
      { status: 409 },
    );
  }

  const updateQuery = supabase
    .from("leads")
    .update({
      status: nextStatus,
      atualizado_em: new Date().toISOString(),
    })
    .eq("id", id);

  if (!force) {
    updateQuery.eq("status", currentStatus);
  }

  const { data: updatedLead, error: updateError } = await updateQuery
    .select("id")
    .single();

  if (updateError || !updatedLead) {
    console.error("[CRM] Falha ao atualizar status", updateError.message);
    return NextResponse.json(
      { error: "Não foi possível atualizar o status." },
      { status: 500 },
    );
  }

  const { data: history, error: historyError } = await supabase
    .from("lead_historico")
    .insert({
      lead_id: id,
      status_anterior: currentStatus,
      novo_status: nextStatus,
      acao: action,
      motivo_perda: nextStatus === "negocio_perdido" ? lossReason : null,
    })
    .select(
      "id,lead_id,status_anterior,novo_status,acao,motivo_perda,criado_em",
    )
    .single();

  if (historyError) {
    await supabase
      .from("leads")
      .update({
        status: currentStatus,
        atualizado_em: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("status", nextStatus);

    console.error("[CRM] Falha ao registrar histórico", historyError.message);
    return NextResponse.json(
      { error: "A migration do histórico precisa ser aplicada no Supabase." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    status: nextStatus,
    history,
  });
}
