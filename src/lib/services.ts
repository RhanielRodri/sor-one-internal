import "server-only";
import { getSupabaseClient } from "@/lib/supabase/client";

export type PublicService = {
  id: string | number;
  nome: string;
  descricao: string;
  preco_inicio: number | null;
  prazo_dias: number | null;
  destaque: boolean;
};

export async function getActiveServices() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("servicos")
    .select("id,nome,descricao,preco_inicio,prazo_dias,destaque")
    .eq("ativo", true)
    .order("destaque", { ascending: false })
    .order("preco_inicio", { ascending: true, nullsFirst: false });

  if (error) {
    console.error("[Serviços públicos] Falha ao consultar serviços", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    throw new Error(error.message);
  }

  return (data ?? []) as PublicService[];
}
