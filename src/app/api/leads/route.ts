import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase/client";

type LeadRequest = {
  nome?: unknown;
  empresa?: unknown;
  whatsapp?: unknown;
  email?: unknown;
  segmento?: unknown;
  problema?: unknown;
  urgencia?: unknown;
  orcamento?: unknown;
  origem?: unknown;
};

function getText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: LeadRequest;

  try {
    body = (await request.json()) as LeadRequest;
  } catch {
    return NextResponse.json(
      { error: "Dados enviados em formato inválido." },
      { status: 400 },
    );
  }

  const nome = getText(body.nome);
  const whatsapp = getText(body.whatsapp);
  const problema = getText(body.problema);

  if (!nome || !whatsapp || !problema) {
    return NextResponse.json(
      { error: "Nome, WhatsApp e problema são obrigatórios." },
      { status: 400 },
    );
  }

  const lead = {
    nome,
    empresa: getText(body.empresa) || null,
    whatsapp,
    email: getText(body.email) || null,
    segmento: getText(body.segmento) || null,
    problema,
    urgencia: getText(body.urgencia) || null,
    orcamento: getText(body.orcamento) || null,
    origem: getText(body.origem) || "site",
    status: "diagnostico_solicitado",
  };

  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from("leads").insert(lead);

    if (error) {
      console.error("Falha ao inserir lead no Supabase:", error.message);
      return NextResponse.json(
        { error: "Não foi possível salvar o diagnóstico. Tente novamente." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Diagnóstico enviado com sucesso." },
      { status: 201 },
    );
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
