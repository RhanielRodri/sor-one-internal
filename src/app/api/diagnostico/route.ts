import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase/client";
import { PRIVACY_POLICY_VERSION } from "@/lib/diagnostic/options";
import { recommend } from "@/lib/diagnostic/recommendation";
import { validateSubmission } from "@/lib/diagnostic/validation";
import { buildDiagnosticWhatsAppUrl } from "@/lib/diagnostic/message";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Dados enviados em formato inválido." },
      { status: 400 },
    );
  }

  const validation = validateSubmission(payload);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const submission = validation.data;
  const answers = {
    primaryGoal: submission.primaryGoal,
    businessType: submission.businessType,
    currentChannels: submission.currentChannels,
    bottleneck: submission.bottleneck,
    leadVolume: submission.leadVolume,
    desiredOutcome: submission.desiredOutcome,
  };

  const recommendation = recommend(answers);

  const rpcPayload = {
    name: submission.name,
    businessName: submission.businessName,
    phone: submission.phone,
    email: submission.email,
    cityState: submission.cityState,
    primaryGoal: submission.primaryGoal,
    businessType: submission.businessType,
    currentChannels: submission.currentChannels,
    bottleneck: submission.bottleneck,
    leadVolume: submission.leadVolume,
    desiredOutcome: submission.desiredOutcome,
    solutionName: recommendation.solutionName,
    modules: recommendation.modules,
    maturity: recommendation.maturity,
    answers,
    consent: submission.consent,
    consentAt: new Date().toISOString(),
    privacyPolicyVersion: PRIVACY_POLICY_VERSION,
  };

  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.rpc("create_diagnostic_lead", {
      p_payload: rpcPayload,
    });

    if (error || !data) {
      console.error("Falha ao salvar diagnóstico no Supabase:", error?.message);
      return NextResponse.json(
        { error: "Não foi possível salvar o diagnóstico. Tente novamente." },
        { status: 500 },
      );
    }

    const whatsappUrl = buildDiagnosticWhatsAppUrl(
      { name: submission.name, businessName: submission.businessName },
      answers,
      recommendation,
    );

    return NextResponse.json(
      { id: data, recommendation, whatsappUrl },
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
