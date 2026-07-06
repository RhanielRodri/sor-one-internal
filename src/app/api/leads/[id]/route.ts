import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase/client";

type LeadUpdateRequest = {
  nome?: unknown;
  whatsapp?: unknown;
  segmento?: unknown;
  problema?: unknown;
  urgencia?: unknown;
  orcamento?: unknown;
};

function getText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "Lead inválido." }, { status: 400 });
  }

  let body: LeadUpdateRequest;
  try {
    body = (await request.json()) as LeadUpdateRequest;
  } catch {
    return NextResponse.json(
      { error: "Dados enviados em formato inválido." },
      { status: 400 },
    );
  }

  const nome = getText(body.nome);
  const whatsapp = getText(body.whatsapp);
  const problema = getText(body.problema);

  const hasAnyField =
    body.nome !== undefined ||
    body.whatsapp !== undefined ||
    body.problema !== undefined ||
    body.segmento !== undefined ||
    body.urgencia !== undefined ||
    body.orcamento !== undefined;

  if (!hasAnyField) {
    return NextResponse.json({ error: "Nenhum dado para atualizar." }, { status: 400 });
  }

  if (
    (body.nome !== undefined && !nome) ||
    (body.whatsapp !== undefined && !whatsapp) ||
    (body.problema !== undefined && !problema)
  ) {
    return NextResponse.json(
      { error: "Nome, WhatsApp e problema não podem ficar vazios." },
      { status: 400 },
    );
  }

  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.rpc("update_lead_qualification", {
      p_id: id,
      p_nome: nome || null,
      p_whatsapp: whatsapp || null,
      p_segmento: getText(body.segmento) || null,
      p_problema: problema || null,
      p_urgencia: getText(body.urgencia) || null,
      p_orcamento: getText(body.orcamento) || null,
    });

    if (error) {
      console.error("Falha ao atualizar lead no Supabase:", error.message);
      return NextResponse.json(
        { error: "Não foi possível atualizar o diagnóstico." },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "Diagnóstico atualizado com sucesso." });
  } catch (error) {
    console.error(
      "Falha na configuração do Supabase:",
      error instanceof Error ? error.message : "Erro desconhecido",
    );
    return NextResponse.json(
      { error: "Serviço temporariamente indisponível." },
      { status: 500 },
    );
  }
}
