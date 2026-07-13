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

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isUuid(value: string) {
  return UUID_RE.test(value);
}

export type CaptureData = {
  sessionId: string;
  name: string;
  phone: string;
  consent: boolean;
};

export type CompletionData = {
  sessionId: string;
  name: string;
  businessName: string;
  cityState: string;
  email: string;
  primaryGoal: string;
  businessType: string;
  currentChannels: string[];
  bottleneck: string;
  leadVolume: string;
  desiredOutcome: string;
};

type CaptureResult =
  | { ok: true; data: CaptureData }
  | { ok: false; error: string };

type CompletionResult =
  | { ok: true; data: CompletionData }
  | { ok: false; error: string };

export function validateCapture(payload: unknown): CaptureResult {
  if (typeof payload !== "object" || payload === null) {
    return { ok: false, error: "Dados inválidos." };
  }

  const body = payload as Record<string, unknown>;

  if (asText(body.website, 40)) {
    return { ok: false, error: "Não foi possível validar o envio." };
  }

  const sessionId = asText(body.sessionId, 40);
  const name = asText(body.name, 80);
  const phone = normalizePhone(asText(body.phone, 40));
  const consent = body.consent === true;

  if (!isUuid(sessionId)) {
    return { ok: false, error: "Sessão de diagnóstico inválida." };
  }
  if (!name) {
    return { ok: false, error: "Informe seu nome." };
  }
  if (!isValidPhone(phone)) {
    return { ok: false, error: "Informe um WhatsApp válido com DDD." };
  }
  if (!consent) {
    return { ok: false, error: "É necessário autorizar o contato para continuar." };
  }

  return { ok: true, data: { sessionId, name, phone, consent } };
}

export function validateCompletion(payload: unknown): CompletionResult {
  if (typeof payload !== "object" || payload === null) {
    return { ok: false, error: "Dados inválidos." };
  }

  const body = payload as Record<string, unknown>;

  if (asText(body.website, 40)) {
    return { ok: false, error: "Não foi possível validar o envio." };
  }

  const sessionId = asText(body.sessionId, 40);
  const name = asText(body.name, 80);
  const businessName = asText(body.businessName, 80);
  const cityState = asText(body.cityState, 80);
  const email = asText(body.email, MAX_EMAIL).toLowerCase();

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

  if (!isUuid(sessionId)) {
    return { ok: false, error: "Sessão de diagnóstico inválida." };
  }
  if (!name) {
    return { ok: false, error: "Informe seu nome." };
  }
  if (!businessName || !cityState) {
    return { ok: false, error: "Preencha nome do negócio e cidade/UF." };
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
  if (
    !Array.isArray(body.currentChannels) ||
    currentChannels.length === 0 ||
    currentChannels.length !== rawChannels.length
  ) {
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

  return {
    ok: true,
    data: {
      sessionId,
      name,
      businessName,
      cityState,
      email,
      primaryGoal,
      businessType,
      currentChannels,
      bottleneck,
      leadVolume,
      desiredOutcome,
    },
  };
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
