"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DIAGNOSTIC_BUDGETS,
  DIAGNOSTIC_OBJECTIVES,
  DIAGNOSTIC_SERVICES,
  DIAGNOSTIC_TIMELINES,
  getDiagnosticService,
  type DiagnosticQuestion,
} from "@/lib/diagnostic-config";
import { SOR_WHATSAPP_URL } from "@/lib/whatsapp";
import { useTranslations } from "next-intl";

type DiagnosticFormProps = {
  initialServiceSlug?: string;
};

type ContactData = {
  nome: string;
  empresa: string;
  whatsapp: string;
  email: string;
};

const initialContact: ContactData = {
  nome: "",
  empresa: "",
  whatsapp: "",
  email: "",
};

function ChoiceGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-bold text-foreground">{label}</legend>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className={`min-h-14 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
              value === option
                ? "border-accent bg-accent-light text-foreground shadow-[0_0_24px_rgba(37,99,235,0.1)]"
                : "border-[rgba(148,163,184,0.16)] bg-[var(--sor-bg-soft)] text-muted hover:border-accent/35 hover:text-foreground"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function SmartQuestion({
  question,
  value,
  onChange,
}: {
  question: DiagnosticQuestion;
  value: string;
  onChange: (value: string) => void;
}) {
  if (question.type === "select") {
    return (
      <ChoiceGroup
        label={question.label}
        options={question.options ?? []}
        value={value}
        onChange={onChange}
      />
    );
  }

  if (question.type === "textarea") {
    return (
      <Textarea
        id={question.id}
        label={question.label}
        placeholder={question.placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  return (
    <Input
      id={question.id}
      label={question.label}
      type={question.type ?? "text"}
      placeholder={question.placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export function DiagnosticForm({ initialServiceSlug }: DiagnosticFormProps) {
  const t = useTranslations("diagnostic");
  const initialService = getDiagnosticService(initialServiceSlug);
  const [step, setStep] = useState(1);
  const [serviceSlug, setServiceSlug] = useState(initialService.slug);
  const [objective, setObjective] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");
  const [contact, setContact] = useState<ContactData>(initialContact);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const service = getDiagnosticService(serviceSlug);
  const progress = `${step * 25}%`;

  function updateContact(field: keyof ContactData, value: string) {
    setContact((current) => ({ ...current, [field]: value }));
  }

  function updateAnswer(id: string, value: string) {
    setAnswers((current) => ({ ...current, [id]: value }));
  }

  function validateStep() {
    if (step === 1 && !objective) return t("error_objective");
    if (step === 2) {
      const missingAnswer = service.questions.some(
        (question) => question.id !== "link_site" && !answers[question.id]?.trim(),
      );
      if (missingAnswer) return t("error_questions");
    }
    if (step === 3 && (!timeline || !budget)) return t("error_timeline_budget");
    return "";
  }

  function goNext() {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setStep((current) => Math.min(current + 1, 4));
  }

  function changeService(nextSlug: string) {
    setServiceSlug(nextSlug);
    setAnswers({});
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!contact.nome.trim() || !contact.whatsapp.trim()) {
      setError(t("error_required"));
      return;
    }

    setIsSubmitting(true);
    setError("");

    const diagnosticAnswers = service.questions
      .map((question) => `${question.label}: ${answers[question.id]?.trim() || "Não informado"}`)
      .join("\n");

    const problem = [
      `SOLUÇÃO:\n${service.name}`,
      `OBJETIVO:\n${objective}`,
      `PRAZO:\n${timeline}`,
      `INVESTIMENTO:\n${budget}`,
      `RESPOSTAS DO DIAGNÓSTICO:\n${diagnosticAnswers}`,
      `CONTEXTO ADICIONAL:\n${additionalContext.trim() || "Não informado"}`,
    ].join("\n\n");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          segmento: service.name,
          problema: problem,
          urgencia: timeline,
          orcamento: budget,
          origem: "site",
        }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || t("error_generic"));
      }

      setSuccess(true);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : t("error_generic"),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (success) {
    return (
      <Card className="glass-panel grid min-h-[32rem] place-items-center overflow-hidden rounded-[2rem] p-7 text-center sm:p-10">
        <div className="max-w-md">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-green-400/20 bg-green-500/8 text-2xl text-green-400">✓</span>
          <h2 className="mt-6 text-3xl font-black tracking-[-0.04em]">{t("success_title")}</h2>
          <p className="mt-4 leading-7 text-muted">{t("success_desc")}</p>
          <Button href="/" className="mt-7">{t("success_btn")}</Button>
          <a
            href={SOR_WHATSAPP_URL}
            className="mt-5 block text-sm font-semibold text-soft underline-offset-4 hover:text-blue-300 hover:underline"
          >
            {t("success_urgent")}
          </a>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-panel min-w-0 overflow-hidden rounded-[2rem] p-0">
      <div className="os-window-bar px-5 py-5 sm:px-8">
        <div className="flex min-w-0 items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[var(--sor-champagne)]">
              {t("form_for")} {service.name}
            </p>
            <h2 className="mt-2 text-xl font-extrabold">{t("form_headline")}</h2>
          </div>
          <span className="shrink-0 rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-xs font-bold text-accent">
            {step}/4
          </span>
        </div>
        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/6">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,var(--sor-blue),var(--sor-petrol))] transition-[width] duration-300"
            style={{ width: progress }}
          />
        </div>
      </div>

      <form className="grid min-w-0 gap-6 p-5 sm:p-8" onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-medium text-foreground">
          {t("form_solution_label")}
          <select
            value={serviceSlug}
            onChange={(event) => changeService(event.target.value)}
            className="min-h-12 min-w-0 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[var(--sor-bg-soft)] px-4 text-base text-[var(--sor-text)] outline-none focus:border-[rgba(14,165,164,0.45)]"
          >
            {DIAGNOSTIC_SERVICES.map((item) => (
              <option key={item.slug} value={item.slug}>{item.name}</option>
            ))}
          </select>
        </label>

        {step === 1 ? (
          <ChoiceGroup
            label={t("form_objective_label")}
            options={DIAGNOSTIC_OBJECTIVES}
            value={objective}
            onChange={setObjective}
          />
        ) : null}

        {step === 2 ? (
          <div className="grid gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">{t("form_questions_label")}</p>
              <h3 className="mt-2 text-2xl font-black">{service.name}</h3>
            </div>
            {service.questions.map((question) => (
              <SmartQuestion
                key={question.id}
                question={question}
                value={answers[question.id] ?? ""}
                onChange={(value) => updateAnswer(question.id, value)}
              />
            ))}
          </div>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-7">
            <ChoiceGroup
              label={t("form_when_label")}
              options={DIAGNOSTIC_TIMELINES}
              value={timeline}
              onChange={setTimeline}
            />
            <ChoiceGroup
              label={t("form_budget_label")}
              options={DIAGNOSTIC_BUDGETS}
              value={budget}
              onChange={setBudget}
            />
            <Textarea
              id="contexto_adicional"
              label={t("form_context_label")}
              placeholder={service.finalPlaceholder}
              value={additionalContext}
              onChange={(event) => setAdditionalContext(event.target.value)}
            />
          </div>
        ) : null}

        {step === 4 ? (
          <div className="grid gap-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input id="nome" label={t("form_name_label")} placeholder={t("form_name_placeholder")} required value={contact.nome} onChange={(event) => updateContact("nome", event.target.value)} />
              <Input id="whatsapp" label={t("form_whatsapp_label")} placeholder={t("form_whatsapp_placeholder")} inputMode="tel" required value={contact.whatsapp} onChange={(event) => updateContact("whatsapp", event.target.value)} />
              <Input id="empresa" label={t("form_company_label")} placeholder={t("form_company_placeholder")} value={contact.empresa} onChange={(event) => updateContact("empresa", event.target.value)} />
              <Input id="email" type="email" label={t("form_email_label")} placeholder={t("form_email_placeholder")} value={contact.email} onChange={(event) => updateContact("email", event.target.value)} />
            </div>

            <div className="rounded-2xl border border-blue-400/14 bg-[#080d18] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">{t("summary_label")}</p>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  [t("summary_solution"), service.name],
                  [t("summary_objective"), objective],
                  [t("summary_timeline"), timeline],
                  [t("summary_budget"), budget],
                ].map(([label, value]) => (
                  <div key={label} className="min-w-0">
                    <dt className="text-xs text-soft">{label}</dt>
                    <dd className="mt-1 break-words text-sm font-bold text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        ) : null}

        {error ? (
          <p role="alert" className="rounded-xl border border-red-400/20 bg-red-500/8 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-between">
          {step > 1 ? (
            <Button type="button" variant="secondary" onClick={() => { setError(""); setStep((current) => current - 1); }}>
              {t("btn_back")}
            </Button>
          ) : <span />}
          {step < 4 ? (
            <Button type="button" onClick={goNext}>{t("btn_continue")}</Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("btn_submitting") : t("btn_submit")}
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
