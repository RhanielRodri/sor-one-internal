import "server-only";
import { createClient } from "@supabase/supabase-js";

export function getSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const keyType = serviceRoleKey?.startsWith("sb_secret_")
    ? "sb_secret"
    : serviceRoleKey?.startsWith("sb_publishable_")
      ? "sb_publishable"
      : serviceRoleKey?.startsWith("eyJ")
        ? "jwt"
        : serviceRoleKey
          ? "unknown"
          : "missing";

  console.info("[Supabase Admin] Configuração", {
    urlExists: Boolean(supabaseUrl),
    serviceRoleKeyExists: Boolean(serviceRoleKey),
    keyType,
  });

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Configuração administrativa do Supabase ausente.");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
