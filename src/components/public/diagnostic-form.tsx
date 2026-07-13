"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trackDiagnostic } from "@/lib/analytics";
import {
  BOTTLENECKS,
  BUSINESS_TYPES,
  CONSENT_LABEL,
  CURRENT_CHANNELS,
  DESIRED_OUTCOMES,
  LEAD_VOLUMES,
  PRIMARY_GOALS,
} from "@/lib/diagnostic/options";
import { MATURITY_LABELS, type Recommendation } from "@/lib/diagnostic/types";

const TOTAL_STEPS = 7;
const SESSION_STORAGE_KEY = "sor_diagnostic_session_id";

const STEP_LABELS = [
  "Contato",
  "Prioridade",
  "Seu negócio",
  "Canais de atendimento",
  "Gargalos e volume",
  "Resultado esperado",
  "Dados do negócio",
] as const;

type Answers = {
  primaryGoal: string;
  businessType: string;
  currentChannels: string[];
  bottleneck: string;
  leadVolume: string;
  desiredOutcome: string;
};

type Contact = {
  name: string;
  businessName: string;
  phone: string;
  cityState: string;
  email: string;
};

const initialAnswers: Answers = {
  primaryGoal: "",
  businessType: "",
  currentChannels: [],
  bottleneck: "",
  leadVolume: "",
  desiredOutcome: "",
};

const initialContact: Contact = {
  name: "",
  businessName: "",
  phone: "",
  cityState: "",
  email: "",
};

type CaptureResponse = {
  id?: string;
  diagnosticStatus?: string;
  error?: string;
};

type CompleteResponse = {
  recommendation?: Recommendation;
  whatsappUrl?: string;
  error?: string;
};

function isValidEmail(email: string) {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function readOrCreateSessionId() {
  try {
    const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

function ChoiceGrid({
  legend,
  options,
  value,
  onChange,
  columns = "sm:grid-cols-2",
}: {
  legend: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  columns?: string;
}) {
  return (
    <fieldset>
      <legend className="text-2xl font-black tracking-[-0.03em]">{legend}</legend>
      <div className={`mt-6 grid gap-3 ${columns}`}>
        {options.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option)}
              className={`flex min-h-14 items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sor-champagne)] ${
                selected
                  ? "border-[var(--sor-champagne)] bg-[rgba(201,168,76,0.12)] text-foreground shadow-[0_0_28px_rgba(201,168,76,0.1)]"
                  : "border-[var(--sor-border-main)] bg-[var(--sor-bg-soft)] text-muted hover:border-[var(--sor-border-champagne)] hover:text-foreground"
              }`}
            >
              <span
                aria-hidden="true"
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                  selected
                    ? "border-[var(--sor-champagne)] bg-[var(--sor-champagne)]"
                    : "border-slate-500"
                }`}
              >
                {selected ? <span className="h-1.5 w-1.5 rounded-full bg-[#08090b]" /> : null}
              </span>
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function MultiChoiceGrid({
  legend,
  hint,
  options,
  values,
  onToggle,
}: {
  legend: string;
  hint: string;
  options: readonly string[];
  values: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-2xl font-black tracking-[-0.03em]">{legend}</legend>
      <p className="mt-2 text-sm text-muted">{hint}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const selected = values.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onToggle(option)}
              className={`flex min-h-14 items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sor-champagne)] ${
                selected
                  ? "border-[var(--sor-champagne)] bg-[rgba(201,168,76,0.12)] text-foreground shadow-[0_0_28px_rgba(201,168,76,0.1)]"
                  : "border-[var(--sor-border-main)] bg-[var(--sor-bg-soft)] text-muted hover:border-[var(--sor-border-champagne)] hover:text-foreground"
              }`}
            >
              <span
                aria-hidden="true"
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${
                  selected
                    ? "border-[var(--sor-champagne)] bg-[var(--sor-champagne)] text-[#08090b]"
                    : "border-slate-500"
                }`}
              >
                {selected ? "✓" : null}
              </span>
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function DiagnosticForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [contact, setContact] = useState<Contact>(initialContact);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [sessionId] = useState(() =>
    typeof window === "undefined" ? "" : readOrCreateSessionId(),
  );
  const [leadId, setLeadId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    recommendation: Recommendation;
    whatsappUrl: string;
  } | null>(null);
  const [started, setStarted] = useState(false);

  function markStarted() {
    if (!started) {
      setStarted(true);
      trackDiagnostic("diagnostic_started");
    }
  }

  function setAnswer<K extends keyof Answers>(key: K, value: Answers[K]) {
    markStarted();
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function toggleChannel(channel: string) {
    markStarted();
    setAnswers((current) => ({
      ...current,
      currentChannels: current.currentChannels.includes(channel)
        ? current.currentChannels.filter((item) => item !== channel)
        : [...current.currentChannels, channel],
    }));
  }

  function updateContact(field: keyof Contact, value: string) {
    markStarted();
    setContact((current) => ({ ...current, [field]: value }));
  }

  const canContinue =
    step === 0
      ? Boolean(contact.name.trim() && contact.phone.trim() && consent)
      : step === 1
        ? Boolean(answers.primaryGoal)
        : step === 2
          ? Boolean(answers.businessType)
          : step === 3
            ? answers.currentChannels.length > 0
            : step === 4
              ? Boolean(answers.bottleneck && answers.leadVolume)
              : step === 5
                ? Boolean(answers.desiredOutcome)
                : Boolean(
                    contact.businessName.trim() &&
                      contact.cityState.trim() &&
                      isValidEmail(contact.email.trim()),
                  );

  async function captureContact() {
    if (leadId) {
      setError("");
      setStep(1);
      return;
    }
    if (!sessionId) {
      setError("Não foi possível iniciar a sessão. Recarregue a página.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/diagnostico/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          name: contact.name,
          phone: contact.phone,
          consent,
          website,
        }),
      });
      const data = (await response.json()) as CaptureResponse;

      if (!response.ok || !data.id) {
        throw new Error(data.error || "Não foi possível iniciar o diagnóstico.");
      }

      setLeadId(data.id);
      trackDiagnostic("diagnostic_captured");
      setStep(1);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Não foi possível iniciar o diagnóstico.",
      );
      trackDiagnostic("diagnostic_capture_failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function submitDiagnostic() {
    if (!sessionId) {
      setError("Sessão de diagnóstico inválida. Recarregue a página.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/diagnostico/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          name: contact.name,
          businessName: contact.businessName,
          cityState: contact.cityState,
          email: contact.email,
          ...answers,
          website,
        }),
      });
      const data = (await response.json()) as CompleteResponse;

      if (!response.ok || !data.recommendation || !data.whatsappUrl) {
        throw new Error(data.error || "Não foi possível concluir o diagnóstico.");
      }

      setResult({
        recommendation: data.recommendation,
        whatsappUrl: data.whatsappUrl,
      });
      setStep(TOTAL_STEPS);
      trackDiagnostic("diagnostic_submission_success", {
        solution: data.recommendation.solution,
        maturity: data.recommendation.maturity,
      });
      trackDiagnostic("diagnostic_completed");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Não foi possível concluir o diagnóstico.",
      );
      trackDiagnostic("diagnostic_submission_failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  function goNext() {
    if (!canContinue || isSubmitting) return;
    if (step === 0) {
      void captureContact();
      return;
    }
    if (step === 6) {
      void submitDiagnostic();
      return;
    }
    trackDiagnostic("diagnostic_step_completed", { step: step + 1 });
    setError("");
    setStep((current) => Math.min(current + 1, 6));
  }

  function goBack() {
    setError("");
    setStep((current) => Math.max(current - 1, 0));
  }

  function reviewAnswers() {
    setResult(null);
    setError("");
    setStep(0);
  }

  function handleStepSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    goNext();
  }

  if (step === TOTAL_STEPS && result) {
    const { recommendation, whatsappUrl } = result;
    const firstModules = recommendation.modules.slice(0, 5);

    return (
      <Card className="glass-panel min-w-0 overflow-hidden rounded-[2rem] p-6 sm:p-10" aria-live="polite">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sor-champagne)]">
          Diagnóstico concluído · Maturidade {MATURITY_LABELS[recommendation.maturity]}
        </p>
        <h2 className="mt-3 text-balance text-3xl font-black tracking-[-0.04em] sm:text-4xl">
          Sua prioridade agora é {answers.primaryGoal.toLowerCase()}.
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-muted">{recommendation.summary}</p>

        <div className="mt-8 rounded-[1.5rem] border border-[var(--sor-border-champagne)] bg-[var(--sor-bg-soft)] p-5 sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-soft">
            Solução recomendada
          </p>
          <h3 className="mt-2 text-2xl font-black tracking-[-0.03em]">
            {recommendation.solutionName}
          </h3>

          <p className="mt-5 text-sm font-bold text-foreground">O que entra primeiro</p>
          <ul className="mt-3 grid gap-2 text-sm text-muted sm:grid-cols-2">
            {firstModules.map((module) => (
              <li key={module} className="flex gap-2">
                <span className="text-[var(--sor-champagne)]">✓</span>
                {module}
              </li>
            ))}
          </ul>

          {recommendation.nextStep ? (
            <div className="mt-6 rounded-2xl border border-[var(--sor-border-main)] bg-black/10 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-soft">
                Próxima evolução
              </p>
              <p className="mt-2 text-sm font-bold text-foreground">
                {recommendation.nextStep.solutionName}
              </p>
              <p className="mt-1 text-sm leading-6 text-muted">
                {recommendation.nextStep.reason}
              </p>
            </div>
          ) : null}

          <div className="mt-6 border-t border-[var(--sor-border-main)] pt-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-soft">
              Evolução recomendada
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              {recommendation.evolutionNote}
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDiagnostic("whatsapp_cta_clicked", { solution: recommendation.solution })}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#C9A86A,#B8943A)] px-6 py-3 text-sm font-bold text-[#0A0E12] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(201,168,106,0.26)]"
          >
            Enviar diagnóstico pelo WhatsApp
          </a>
          <button
            type="button"
            onClick={reviewAnswers}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--sor-border-main)] px-6 py-3 text-sm font-bold text-muted transition hover:border-[var(--sor-border-champagne)] hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sor-champagne)]"
          >
            Revisar respostas
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-panel min-w-0 overflow-hidden rounded-[2rem] p-0">
      <div className="border-b border-[var(--sor-border-main)] px-5 py-5 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="rounded-lg px-2 py-1 text-sm font-bold text-muted transition hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sor-champagne)] disabled:invisible"
          >
            ← Voltar
          </button>
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--sor-champagne)]">
            Etapa {step + 1} de {TOTAL_STEPS}
            <span className="hidden font-semibold normal-case tracking-normal text-[var(--sor-text-soft)] sm:inline">
              {" "}
              · {STEP_LABELS[step]}
            </span>
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
          aria-valuenow={step + 1}
          aria-label={`Etapa ${step + 1} de ${TOTAL_STEPS}: ${STEP_LABELS[step]}`}
          className="mt-4 flex gap-1.5"
        >
          {Array.from({ length: TOTAL_STEPS }, (_, index) => (
            <span
              key={index}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                index <= step ? "bg-[var(--champagne)]" : "bg-white/6"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-5 sm:p-8 lg:p-10">
        {step === 0 ? (
          <form onSubmit={handleStepSubmit} noValidate>
            <h2 className="text-2xl font-black tracking-[-0.03em]">
              Vamos começar pelo seu contato.
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Seu nome e WhatsApp guardam o diagnóstico e permitem falar sobre
              o próximo passo. Usaremos seus dados apenas para registrar,
              analisar e acompanhar esta solicitação.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Input
                id="name"
                label="Nome"
                placeholder="Seu nome"
                required
                value={contact.name}
                onChange={(event) => updateContact("name", event.target.value)}
              />
              <Input
                id="phone"
                label="WhatsApp"
                placeholder="(27) 99999-9999"
                inputMode="tel"
                required
                value={contact.phone}
                onChange={(event) => updateContact("phone", event.target.value)}
              />
            </div>

            <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
              <label htmlFor="website">Não preencha este campo</label>
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-[var(--sor-border-main)] bg-[var(--sor-bg-soft)] px-4 py-3.5 text-sm leading-6 text-muted transition hover:border-[var(--sor-border-champagne)]">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--sor-champagne)]"
              />
              <span>
                {CONSENT_LABEL}{" "}
                <Link
                  href="/privacidade"
                  className="font-semibold text-[var(--sor-champagne)] underline-offset-4 hover:underline"
                >
                  Política de privacidade
                </Link>
                .
              </span>
            </label>

            {error ? (
              <p
                role="alert"
                className="mt-5 rounded-xl border border-red-400/20 bg-red-500/8 px-4 py-3 text-sm text-red-300"
              >
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              disabled={!canContinue || isSubmitting}
              aria-busy={isSubmitting}
              className="mt-8 w-full sm:w-auto"
            >
              {isSubmitting ? "Iniciando..." : "Começar diagnóstico"}
            </Button>
          </form>
        ) : null}

        {step === 1 ? (
          <ChoiceGrid
            legend="O que você mais quer melhorar primeiro?"
            options={PRIMARY_GOALS}
            value={answers.primaryGoal}
            onChange={(value) => setAnswer("primaryGoal", value)}
          />
        ) : null}

        {step === 2 ? (
          <ChoiceGrid
            legend="Qual descreve melhor seu negócio?"
            options={BUSINESS_TYPES}
            value={answers.businessType}
            onChange={(value) => setAnswer("businessType", value)}
          />
        ) : null}

        {step === 3 ? (
          <MultiChoiceGrid
            legend="Como vocês atendem hoje?"
            hint="Selecione todas que se aplicam."
            options={CURRENT_CHANNELS}
            values={answers.currentChannels}
            onToggle={toggleChannel}
          />
        ) : null}

        {step === 4 ? (
          <div className="grid gap-8">
            <ChoiceGrid
              legend="Onde os contatos mais se perdem hoje?"
              options={BOTTLENECKS}
              value={answers.bottleneck}
              onChange={(value) => setAnswer("bottleneck", value)}
            />
            <ChoiceGrid
              legend="Quantos novos contatos por semana, em média?"
              options={LEAD_VOLUMES}
              value={answers.leadVolume}
              onChange={(value) => setAnswer("leadVolume", value)}
              columns="grid-cols-1 sm:grid-cols-3"
            />
          </div>
        ) : null}

        {step === 5 ? (
          <ChoiceGrid
            legend="Qual resultado seria mais valioso para o seu negócio?"
            options={DESIRED_OUTCOMES}
            value={answers.desiredOutcome}
            onChange={(value) => setAnswer("desiredOutcome", value)}
          />
        ) : null}

        {step === 6 ? (
          <form onSubmit={handleStepSubmit} noValidate>
            <h2 className="text-2xl font-black tracking-[-0.03em]">
              Só mais alguns dados do negócio.
            </h2>
            <p className="mt-2 text-sm text-muted">
              Uso essas informações para preparar a análise e o próximo passo certo para você.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Input
                id="businessName"
                label="Nome do negócio"
                placeholder="Nome da sua empresa"
                required
                value={contact.businessName}
                onChange={(event) => updateContact("businessName", event.target.value)}
              />
              <Input
                id="cityState"
                label="Cidade/UF"
                placeholder="Vila Velha/ES"
                required
                value={contact.cityState}
                onChange={(event) => updateContact("cityState", event.target.value)}
              />
              <div className="sm:col-span-2">
                <Input
                  id="email"
                  label="E-mail (opcional)"
                  type="email"
                  placeholder="voce@email.com"
                  value={contact.email}
                  onChange={(event) => updateContact("email", event.target.value)}
                />
              </div>
            </div>

            {error ? (
              <p
                role="alert"
                className="mt-5 rounded-xl border border-red-400/20 bg-red-500/8 px-4 py-3 text-sm text-red-300"
              >
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              disabled={!canContinue || isSubmitting}
              aria-busy={isSubmitting}
              className="mt-8 w-full sm:w-auto"
            >
              {isSubmitting ? "Enviando..." : "Ver minha recomendação"}
            </Button>
          </form>
        ) : null}

        {step > 0 && step < 6 ? (
          <div className="mt-8 flex justify-end border-t border-[var(--sor-border-main)] pt-6">
            <Button type="button" disabled={!canContinue} onClick={goNext} className="w-full sm:w-auto">
              Continuar
            </Button>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
