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

  const update: Record<string, string | null> = {};

  if (body.nome !== undefined) update.nome = getText(body.nome);
  if (body.whatsapp !== undefined) update.whatsapp = getText(body.whatsapp);
  if (body.problema !== undefined) update.problema = getText(body.problema);
  if (body.segmento !== undefined) update.segmento = getText(body.segmento) || null;
  if (body.urgencia !== undefined) update.urgencia = getText(body.urgencia) || null;
  if (body.orcamento !== undefined) update.orcamento = getText(body.orcamento) || null;

  if (update.nome === "" || update.whatsapp === "" || update.problema === "") {
    return NextResponse.json(
      { error: "Nome, WhatsApp e problema não podem ficar vazios." },
      { status: 400 },
    );
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "Nenhum dado para atualizar." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from("leads").update(update).eq("id", id);

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
