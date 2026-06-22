import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth/admin-request";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  let body: { observacoes?: unknown };
  try {
    body = (await request.json()) as { observacoes?: unknown };
  } catch {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const { id } = await context.params;
  const observacoes =
    typeof body.observacoes === "string" ? body.observacoes.trim() : "";

  const supabase = getSupabaseAdminClient();
  const { error } = await supabase
    .from("leads")
    .update({ observacoes, atualizado_em: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("[CRM] Falha ao salvar observação", error.message);
    return NextResponse.json(
      { error: "Não foi possível salvar a observação." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
