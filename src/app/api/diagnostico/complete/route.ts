import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { recommend } from "@/lib/diagnostic/recommendation";
import { validateCompletion } from "@/lib/diagnostic/validation";
import { buildDiagnosticWhatsAppUrl } from "@/lib/diagnostic/message";
import {
  checkRateLimit,
  readJsonBody,
} from "@/lib/diagnostic/request-security";

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(request, "diagnostic-complete", 30, 60_000);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde antes de tentar novamente." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  const body = await readJsonBody(request, 24576);
  if (!body.ok) {
    return NextResponse.json({ error: body.error }, { status: body.status });
  }

  const validation = validateCompletion(body.data);
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

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase.rpc("complete_diagnostic_lead", {
      p_payload: {
        sessionId: submission.sessionId,
        name: submission.name,
        businessName: submission.businessName,
        cityState: submission.cityState,
        email: submission.email,
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
      },
    });

    if (error?.code === "P4092") {
      return NextResponse.json(
        { error: "Esta sessão não pode ser alterada após a conclusão." },
        { status: 409 },
      );
    }

    if (error?.code === "P4093") {
      return NextResponse.json(
        { error: "Esta sessão não está disponível para conclusão." },
        { status: 409 },
      );
    }

    if (error?.code === "P4040") {
      return NextResponse.json(
        { error: "Sessão de diagnóstico não encontrada." },
        { status: 404 },
      );
    }

    if (error || !data) {
      console.error("Falha ao concluir diagnóstico no Supabase", {
        code: error?.code ?? "unknown",
      });
      return NextResponse.json(
        { error: "Não foi possível concluir o diagnóstico. Tente novamente." },
        { status: 500 },
      );
    }

    const whatsappUrl = buildDiagnosticWhatsAppUrl(
      { name: submission.name, businessName: submission.businessName },
      answers,
      recommendation,
    );

    return NextResponse.json({ recommendation, whatsappUrl }, { status: 200 });
  } catch {
    console.error("Falha na configuração do Supabase para conclusão");
    return NextResponse.json(
      { error: "Serviço temporariamente indisponível." },
      { status: 500 },
    );
  }
}
