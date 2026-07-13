import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { PRIVACY_POLICY_VERSION } from "@/lib/diagnostic/options";
import {
  checkRateLimit,
  readJsonBody,
} from "@/lib/diagnostic/request-security";
import { validateCapture } from "@/lib/diagnostic/validation";

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(request, "diagnostic-capture", 12, 60_000);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde antes de tentar novamente." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  const body = await readJsonBody(request, 4096);
  if (!body.ok) {
    return NextResponse.json({ error: body.error }, { status: body.status });
  }

  const validation = validateCapture(body.data);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const capture = validation.data;

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase.rpc("capture_diagnostic_lead", {
      p_payload: {
        sessionId: capture.sessionId,
        name: capture.name,
        phone: capture.phone,
        consent: capture.consent,
        privacyPolicyVersion: PRIVACY_POLICY_VERSION,
      },
    });

    if (error?.code === "P4091") {
      return NextResponse.json(
        { error: "Esta sessão já está vinculada a outro contato." },
        { status: 409 },
      );
    }

    if (error || !data) {
      console.error("Falha ao capturar diagnóstico no Supabase", {
        code: error?.code ?? "unknown",
      });
      return NextResponse.json(
        { error: "Não foi possível iniciar o diagnóstico. Tente novamente." },
        { status: 500 },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch {
    console.error("Falha na configuração do Supabase para captura");
    return NextResponse.json(
      { error: "Serviço temporariamente indisponível." },
      { status: 500 },
    );
  }
}
