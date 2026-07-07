import {
  BOTTLENECKS,
  BUSINESS_TYPES,
  CURRENT_CHANNELS,
  DESIRED_OUTCOMES,
  LEAD_VOLUMES,
  PRIMARY_GOALS,
} from "@/lib/diagnostic/options";
import type { DiagnosticSubmission } from "@/lib/diagnostic/types";

const MAX_TEXT = 160;
const MAX_EMAIL = 160;

type ValidationSuccess = {
  ok: true;
  data: DiagnosticSubmission;
};

type ValidationFailure = {
  ok: false;
  error: string;
};

export type ValidationResult = ValidationSuccess | ValidationFailure;

function asText(value: unknown, max = MAX_TEXT) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isOption(value: string, options: readonly string[]) {
  return options.includes(value);
}

export function normalizePhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("55")) return digits;
  if (digits.length === 10 || digits.length === 11) return `55${digits}`;
  return digits;
}

function isValidPhone(normalized: string) {
  return normalized.length >= 12 && normalized.length <= 13;
}

function isValidEmail(email: string) {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateSubmission(payload: unknown): ValidationResult {
  if (typeof payload !== "object" || payload === null) {
    return { ok: false, error: "Dados inválidos." };
  }

  const body = payload as Record<string, unknown>;

  if (asText(body.website, 40)) {
    return { ok: false, error: "Não foi possível validar o envio." };
  }

  const name = asText(body.name, 80);
  const businessName = asText(body.businessName, 80);
  const cityState = asText(body.cityState, 80);
  const email = asText(body.email, MAX_EMAIL).toLowerCase();
  const phone = normalizePhone(asText(body.phone, 40));

  const primaryGoal = asText(body.primaryGoal);
  const businessType = asText(body.businessType);
  const bottleneck = asText(body.bottleneck);
  const leadVolume = asText(body.leadVolume);
  const desiredOutcome = asText(body.desiredOutcome);

  const rawChannels = Array.isArray(body.currentChannels)
    ? body.currentChannels
    : [];
  const currentChannels = rawChannels
    .map((item) => asText(item))
    .filter((item) => isOption(item, CURRENT_CHANNELS));

  const consent = body.consent === true;

  if (!name || !businessName || !cityState) {
    return { ok: false, error: "Preencha nome, nome do negócio e cidade/UF." };
  }
  if (!isValidPhone(phone)) {
    return { ok: false, error: "Informe um WhatsApp válido com DDD." };
  }
  if (!isValidEmail(email)) {
    return { ok: false, error: "Informe um e-mail válido ou deixe em branco." };
  }
  if (!isOption(primaryGoal, PRIMARY_GOALS)) {
    return { ok: false, error: "Selecione a prioridade principal." };
  }
  if (!isOption(businessType, BUSINESS_TYPES)) {
    return { ok: false, error: "Selecione o tipo de negócio." };
  }
  if (currentChannels.length === 0) {
    return { ok: false, error: "Selecione como você atende hoje." };
  }
  if (!isOption(bottleneck, BOTTLENECKS)) {
    return { ok: false, error: "Selecione o principal gargalo." };
  }
  if (!isOption(leadVolume, LEAD_VOLUMES)) {
    return { ok: false, error: "Selecione o volume de contatos." };
  }
  if (!isOption(desiredOutcome, DESIRED_OUTCOMES)) {
    return { ok: false, error: "Selecione o resultado desejado." };
  }
  if (!consent) {
    return { ok: false, error: "É necessário autorizar o contato para continuar." };
  }

  return {
    ok: true,
    data: {
      name,
      businessName,
      phone,
      cityState,
      email,
      primaryGoal,
      businessType,
      currentChannels,
      bottleneck,
      leadVolume,
      desiredOutcome,
      consent,
    },
  };
}
