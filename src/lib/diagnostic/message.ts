import { createWhatsAppUrl, SOR_WHATSAPP_NUMBER } from "@/lib/whatsapp";
import type {
  DiagnosticAnswers,
  DiagnosticContact,
  Recommendation,
} from "@/lib/diagnostic/types";

export function buildDiagnosticMessage(
  contact: Pick<DiagnosticContact, "name" | "businessName">,
  answers: DiagnosticAnswers,
  recommendation: Recommendation,
) {
  return [
    `Olá, meu nome é ${contact.name}. Fiz o diagnóstico da SOR ONE para ${contact.businessName}.`,
    "",
    `Prioridade: ${answers.primaryGoal}`,
    `Tipo de negócio: ${answers.businessType}`,
    `Principal gargalo: ${answers.bottleneck}`,
    `Volume de contatos: ${answers.leadVolume}`,
    `Resultado desejado: ${answers.desiredOutcome}`,
    "",
    `A recomendação recebida foi: ${recommendation.solutionName}.`,
    "",
    "Gostaria de entender como isso funcionaria no meu negócio.",
  ].join("\n");
}

export function buildDiagnosticWhatsAppUrl(
  contact: Pick<DiagnosticContact, "name" | "businessName">,
  answers: DiagnosticAnswers,
  recommendation: Recommendation,
) {
  return createWhatsAppUrl(
    SOR_WHATSAPP_NUMBER,
    buildDiagnosticMessage(contact, answers, recommendation),
  );
}
