import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth/admin-request";
import { DIAGNOSTIC_SERVICES } from "@/lib/diagnostic-config";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

type ManualLeadRequest = {
  empresa?: unknown;
  nome?: unknown;
  whatsapp?: unknown;
  email?: unknown;
  social?: unknown;
  segmento?: unknown;
  solucao?: unknown;
  observacao?: unknown;
  origem?: unknown;
};

const MANUAL_ORIGINS = [
  "Prospecção manual",
  "Diagnóstico",
  "Indicação",
  "Instagram",
  "Workana",
  "Outro",
] as const;

function getText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  let body: ManualLeadRequest;
  try {
    body = (await request.json()) as ManualLeadRequest;
  } catch {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const empresa = getText(body.empresa);
  const nome = getText(body.nome);
  const whatsapp = getText(body.whatsapp);
  const email = getText(body.email);
  const social = getText(body.social);
  const segmento = getText(body.segmento);
  const solucao = getText(body.solucao);
  const observacao = getText(body.observacao);
  const origem = getText(body.origem);

  const validSolution = DIAGNOSTIC_SERVICES.some(
    (service) => service.name === solucao,
  );
  const validOrigin = MANUAL_ORIGINS.includes(
    origem as (typeof MANUAL_ORIGINS)[number],
  );

  if (
    !empresa ||
    !nome ||
    !whatsapp ||
    !segmento ||
    !validSolution ||
    !validOrigin
  ) {
    return NextResponse.json(
      { error: "Preencha os campos obrigatórios corretamente." },
      { status: 400 },
    );
  }

  const problem = [
    `SOLUÇÃO:\n${solucao}`,
    "OBJETIVO:\nProspecção manual",
    "PRAZO:\nNão informado",
    "INVESTIMENTO:\nAinda não sei",
    "RESPOSTAS DO DIAGNÓSTICO:",
    `Segmento: ${segmento}`,
    `Site ou Instagram: ${social || "Não informado"}`,
    `CONTEXTO ADICIONAL:\n${observacao || "Não informado"}`,
  ].join("\n\n");

  const supabase = getSupabaseAdminClient();
  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .insert({
      empresa,
      nome,
      whatsapp,
      email: email || null,
      segmento,
      problema: problem,
      urgencia: null,
      orcamento: null,
      origem,
      status: "prospectado",
      observacoes: observacao || null,
    })
    .select(
      "id,nome,empresa,whatsapp,email,segmento,problema,urgencia,orcamento,origem,status,observacoes,criado_em,atualizado_em",
    )
    .single();

  if (leadError || !lead) {
    console.error("[CRM] Falha ao cadastrar lead manual", leadError?.message);
    return NextResponse.json(
      { error: "Não foi possível cadastrar o lead." },
      { status: 500 },
    );
  }

  const { data: history, error: historyError } = await supabase
    .from("lead_historico")
    .insert({
      lead_id: lead.id,
      status_anterior: "cadastro_manual",
      novo_status: "prospectado",
      acao: "Lead adicionado manualmente",
      motivo_perda: null,
    })
    .select(
      "id,lead_id,status_anterior,novo_status,acao,motivo_perda,criado_em",
    )
    .single();

  if (historyError || !history) {
    await supabase.from("leads").delete().eq("id", lead.id);
    console.error("[CRM] Falha ao registrar criação manual", historyError?.message);
    return NextResponse.json(
      { error: "A migration do histórico precisa ser aplicada no Supabase." },
      { status: 500 },
    );
  }

  return NextResponse.json({ lead, history }, { status: 201 });
}
