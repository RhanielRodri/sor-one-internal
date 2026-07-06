"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SOR_WHATSAPP_URL } from "@/lib/whatsapp";

const painPoints = [
  "Clientes não me acham no Google",
  "Tenho produto bom mas ninguém vê online",
  "Mando orçamento no WhatsApp e o cliente some",
  "Meu catálogo é uma foto no story que some em 24h",
  "Não tenho como mostrar meu trabalho de forma profissional",
  "Perco horas respondendo sempre a mesma pergunta",
  "Preciso de agendamento mas é tudo no papel ou no grupo",
  "Tenho site mas está desatualizado e não converte nada",
  "Perco cliente pro concorrente que parece mais profissional",
] as const;

const businessTypes = [
  "Barbearia/Salão",
  "Clínica/Estética",
  "Alimentação/Confeitaria",
  "Loja/Produtos",
  "Prestador de serviço",
  "Outro",
] as const;

const currentSituations = [
  "Não tenho site",
  "Tenho só Instagram/WhatsApp",
  "Tenho site desatualizado",
  "Tenho site e quero evoluir",
] as const;

const priorities = [
  "Ser encontrado",
  "Vitrine profissional",
  "Receber pedidos/agendamentos",
  "Automatizar atendimento no WhatsApp",
] as const;

const investments = [
  "Até R$700",
  "R$700–R$2.800",
  "R$2.800+",
  "Ainda não sei",
] as const;

type RecommendationKey =
  | "presence"
  | "site"
  | "catalog"
  | "scheduling"
  | "automation";

type Recommendation = {
  name: string;
  category: string;
  description: string;
  features: string[];
  price: string;
  prazo: string;
  revisoes: string;
  suporte: string;
};

const recommendations: Record<RecommendationKey, Recommendation> = {
  presence: {
    name: "Presença Digital Express",
    category: "Presença digital",
    description:
      "Uma estrutura enxuta para apresentar seu negócio, gerar confiança e facilitar o primeiro contato.",
    features: [
      "Página profissional responsiva",
      "Contato direto pelo WhatsApp",
      "SEO básico e publicação",
    ],
    price: "A partir de R$ 497",
    prazo: "3–5 dias",
    revisoes: "2 revisões",
    suporte: "15 dias",
  },
  site: {
    name: "Site Institucional",
    category: "Autoridade digital",
    description:
      "Site completo para posicionar sua empresa, explicar seus serviços e transformar visitas em oportunidades.",
    features: [
      "Design personalizado responsivo",
      "Páginas de serviços, sobre e contato",
      "SEO básico e integração com WhatsApp",
    ],
    price: "A partir de R$ 1.500",
    prazo: "5–7 dias",
    revisoes: "2 revisões",
    suporte: "30 dias",
  },
  catalog: {
    name: "Catálogo Digital",
    category: "Vitrine de produtos",
    description:
      "Uma vitrine organizada para seus produtos, com busca, categorias e pedidos sem depender de stories.",
    features: [
      "Produtos organizados por categorias",
      "Busca e detalhes de cada item",
      "Solicitação de pedido pelo WhatsApp",
    ],
    price: "A partir de R$ 3.000",
    prazo: "10–14 dias",
    revisoes: "2 revisões",
    suporte: "60 dias",
  },
  scheduling: {
    name: "Sistema de Agendamento",
    category: "Atendimento organizado",
    description:
      "Agendamento online para reduzir mensagens repetidas, evitar conflitos e organizar a rotina.",
    features: [
      "Página pública de agendamento",
      "Escolha de serviço, profissional e horário",
      "Painel para acompanhar os agendamentos",
    ],
    price: "A partir de R$ 2.500",
    prazo: "10–14 dias",
    revisoes: "2 revisões",
    suporte: "60 dias",
  },
  automation: {
    name: "Automação de Atendimento",
    category: "WhatsApp e processos",
    description:
      "Fluxos automáticos para responder, qualificar e acompanhar contatos sem repetir tarefas manualmente.",
    features: [
      "Respostas e triagem automatizadas",
      "Follow-up de contatos e orçamentos",
      "Integração com as ferramentas do negócio",
    ],
    price: "Sob consulta",
    prazo: "A definir",
    revisoes: "Por projeto",
    suporte: "Incluso",
  },
};

type ContactData = {
  nome: string;
  whatsapp: string;
};

const initialContact: ContactData = {
  nome: "",
  whatsapp: "",
};

function getRecommendation(
  priority: string,
  investment: string,
): Recommendation {
  if (priority === "Receber pedidos/agendamentos") {
    return investment === "Até R$700"
      ? recommendations.presence
      : recommendations.scheduling;
  }

  if (priority === "Automatizar atendimento no WhatsApp") {
    return investment === "Até R$700"
      ? recommendations.presence
      : recommendations.automation;
  }

  if (priority === "Vitrine profissional") {
    if (investment === "R$2.800+") return recommendations.catalog;
    if (investment === "Até R$700") return recommendations.presence;
    return recommendations.site;
  }

  return investment === "Até R$700"
    ? recommendations.presence
    : recommendations.site;
}

function buildProblemText(params: {
  pains: string[];
  businessType?: string;
  currentSituation?: string;
  priority?: string;
  investment?: string;
  recommendationName?: string;
}) {
  const sections = [`DORES IDENTIFICADAS:\n${params.pains.join("\n")}`];

  if (params.businessType) {
    sections.push(`TIPO DE NEGÓCIO:\n${params.businessType}`);
  }
  if (params.currentSituation) {
    sections.push(`SITUAÇÃO ATUAL:\n${params.currentSituation}`);
  }
  if (params.priority) {
    sections.push(`PRIORIDADE:\n${params.priority}`);
  }
  if (params.investment) {
    sections.push(`INVESTIMENTO:\n${params.investment}`);
  }
  if (params.recommendationName) {
    sections.push(`RECOMENDAÇÃO:\n${params.recommendationName}`);
  }

  return sections.join("\n\n");
}

function ChoiceGrid({
  label,
  options,
  value,
  onChange,
  columns = "sm:grid-cols-2",
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  columns?: string;
}) {
  return (
    <fieldset>
      <legend className="text-2xl font-black tracking-[-0.03em]">{label}</legend>
      <div className={`mt-6 grid gap-3 ${columns}`}>
        {options.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option)}
              className={`flex min-h-16 items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sor-champagne)] ${
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
                {selected ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#08090b]" />
                ) : null}
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
  const [selectedPains, setSelectedPains] = useState<string[]>([]);
  const [contact, setContact] = useState<ContactData>(initialContact);
  const [leadId, setLeadId] = useState<string | number | null>(null);
  const [businessType, setBusinessType] = useState("");
  const [currentSituation, setCurrentSituation] = useState("");
  const [priority, setPriority] = useState("");
  const [investment, setInvestment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const qualificationValues = [businessType, currentSituation, priority, investment];
  const hasQualificationAnswers = qualificationValues.some(Boolean);

  const canContinue =
    step === 0
      ? selectedPains.length > 0
      : step === 1
        ? Boolean(contact.nome.trim() && contact.whatsapp.trim())
        : step >= 2 && step <= 5
          ? Boolean(qualificationValues[step - 2])
          : true;

  function togglePain(pain: string) {
    setSelectedPains((current) =>
      current.includes(pain)
        ? current.filter((item) => item !== pain)
        : [...current, pain],
    );
  }

  function updateContact(field: keyof ContactData, value: string) {
    setContact((current) => ({ ...current, [field]: value }));
  }

  async function captureLead() {
    setIsSubmitting(true);
    setError("");

    try {
      if (leadId) {
        const response = await fetch(`/api/leads/${leadId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: contact.nome,
            whatsapp: contact.whatsapp,
          }),
        });

        if (!response.ok) {
          const result = (await response.json()) as { error?: string };
          throw new Error(result.error || "Não foi possível atualizar seus dados.");
        }
      } else {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: contact.nome,
            whatsapp: contact.whatsapp,
            problema: buildProblemText({ pains: selectedPains }),
            origem: "site",
          }),
        });
        const result = (await response.json()) as { id?: string; error?: string };

        if (!response.ok || !result.id) {
          throw new Error(result.error || "Não foi possível salvar seus dados.");
        }

        setLeadId(result.id);
      }

      setStep(2);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Não foi possível salvar seus dados.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function finishDiagnostic() {
    setError("");

    if (!hasQualificationAnswers || !leadId) {
      setSuccess(true);
      return;
    }

    setIsFinishing(true);

    const recommendationName =
      priority && investment ? getRecommendation(priority, investment).name : undefined;

    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          segmento: recommendationName,
          problema: buildProblemText({
            pains: selectedPains,
            businessType,
            currentSituation,
            priority,
            investment,
            recommendationName,
          }),
          urgencia: priority,
          orcamento: investment,
        }),
      });

      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        console.error(result.error || "Não foi possível atualizar o diagnóstico.");
      }
    } catch (caughtError) {
      console.error(
        caughtError instanceof Error
          ? caughtError.message
          : "Falha ao atualizar diagnóstico",
      );
    } finally {
      setIsFinishing(false);
      setSuccess(true);
    }
  }

  function goNext() {
    if (!canContinue) return;

    if (step === 1) {
      captureLead();
      return;
    }

    setError("");
    setStep((current) => Math.min(current + 1, 6));
  }

  function goBack() {
    setError("");
    setStep((current) => Math.max(current - 1, 0));
  }

  async function handleFinishSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await finishDiagnostic();
  }

  if (success) {
    return (
      <Card className="glass-panel grid min-h-[32rem] place-items-center overflow-hidden rounded-[2rem] p-7 text-center sm:p-10">
        <div className="max-w-md">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-green-400/20 bg-green-500/8 text-2xl text-green-400">
            ✓
          </span>
          <h2 className="mt-6 text-3xl font-black tracking-[-0.04em]">
            Diagnóstico solicitado
          </h2>
          <p className="mt-4 leading-7 text-muted">
            Recebi suas respostas e entrarei em contato para analisar o próximo
            passo mais simples para o seu negócio.
          </p>
          <Button href="/" className="mt-7">
            Voltar ao início
          </Button>
          <a
            href={SOR_WHATSAPP_URL}
            className="mt-5 block text-sm font-semibold text-soft underline-offset-4 hover:text-blue-300 hover:underline"
          >
            Precisa falar agora? Chamar no WhatsApp
          </a>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-panel min-w-0 overflow-hidden rounded-[2rem] p-0">
      {step >= 1 && step <= 5 ? (
        <div className="border-b border-[var(--sor-border-main)] px-5 py-5 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={goBack}
              className="rounded-lg px-2 py-1 text-sm font-bold text-muted transition hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sor-champagne)]"
            >
              ← Voltar
            </button>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--sor-champagne)]">
              Etapa {step}/5
            </span>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/6">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,var(--sor-blue),var(--sor-champagne))] transition-[width] duration-300"
              style={{ width: `${step * 20}%` }}
            />
          </div>
        </div>
      ) : null}

      <div className="p-5 sm:p-8 lg:p-10">
        {step === 0 ? (
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sor-champagne)]">
              Diagnóstico gratuito
            </p>
            <h1 className="mt-3 text-balance text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Qual dessas situações você reconhece no seu negócio?
            </h1>
            <p className="mt-3 text-muted">Selecione todas que se aplicam.</p>
            <div className="mt-8 grid grid-cols-1 gap-[10px] sm:grid-cols-2">
              {painPoints.map((pain) => {
                const selected = selectedPains.includes(pain);
                return (
                  <button
                    key={pain}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => togglePain(pain)}
                    className={`relative w-full rounded-[1.35rem] px-4 py-2.5 text-left text-[0.9rem] font-semibold leading-5 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sor-champagne)] ${
                      selected
                        ? "border-[1.5px] border-[#C9A84C] bg-[rgba(201,168,76,0.1)] text-[#C9A84C] shadow-[0_0_30px_rgba(201,168,76,0.08)]"
                        : "border border-[rgba(255,255,255,0.5)] bg-[var(--sor-bg-soft)] text-[#e5e5e5] hover:border-white hover:text-white"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-[-6px] left-7 h-3 w-3 rotate-45 border-b border-r ${
                        selected
                          ? "border-[#C9A84C] bg-[#1a1710]"
                          : "border-[rgba(255,255,255,0.5)] bg-[var(--sor-bg-soft)]"
                      }`}
                    />
                    <span className="flex items-center justify-between gap-3">
                      {pain}
                      {selected ? (
                        <span className="text-[var(--sor-champagne)]">✓</span>
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </div>
            <Button
              type="button"
              disabled={!canContinue}
              onClick={goNext}
              className="mt-8 w-full sm:w-auto"
            >
              Continuar
            </Button>
          </div>
        ) : null}

        {step === 1 ? (
          <div>
            <h2 className="text-2xl font-black tracking-[-0.03em]">
              Como posso falar com você?
            </h2>
            <p className="mt-2 text-sm text-muted">
              Só preciso do seu nome e WhatsApp pra te enviar a análise.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Input
                id="nome"
                label="Nome"
                placeholder="Seu nome"
                required
                value={contact.nome}
                onChange={(event) => updateContact("nome", event.target.value)}
              />
              <Input
                id="whatsapp"
                label="WhatsApp"
                placeholder="(27) 99999-9999"
                inputMode="tel"
                required
                value={contact.whatsapp}
                onChange={(event) =>
                  updateContact("whatsapp", event.target.value)
                }
              />
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
              type="button"
              disabled={!canContinue || isSubmitting}
              onClick={goNext}
              className="mt-8 w-full sm:w-auto"
            >
              {isSubmitting ? "Enviando..." : "Continuar"}
            </Button>
          </div>
        ) : null}

        {step === 2 ? (
          <div>
            <p className="text-sm font-semibold text-[var(--sor-champagne)]">
              Quer que eu já chegue com uma ideia? Responda mais 4 perguntas
              rápidas (30s).
            </p>
            <div className="mt-5">
              <ChoiceGrid
                label="Qual é o seu tipo de negócio?"
                options={businessTypes}
                value={businessType}
                onChange={setBusinessType}
              />
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <ChoiceGrid
            label="Qual é a sua situação atual?"
            options={currentSituations}
            value={currentSituation}
            onChange={setCurrentSituation}
            columns="grid-cols-1"
          />
        ) : null}

        {step === 4 ? (
          <ChoiceGrid
            label="Qual é a sua prioridade agora?"
            options={priorities}
            value={priority}
            onChange={setPriority}
          />
        ) : null}

        {step === 5 ? (
          <ChoiceGrid
            label="Quanto pretende investir neste momento?"
            options={investments}
            value={investment}
            onChange={setInvestment}
            columns="grid-cols-1"
          />
        ) : null}

        {step >= 2 && step <= 5 ? (
          <div className="mt-8 flex flex-col gap-4 border-t border-[var(--sor-border-main)] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={finishDiagnostic}
              disabled={isFinishing}
              className="text-left text-sm font-bold text-muted underline-offset-4 transition hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sor-champagne)]"
            >
              {isFinishing ? "Finalizando..." : "Pular perguntas e finalizar agora"}
            </button>
            <Button type="button" disabled={!canContinue} onClick={goNext}>
              {step === 5 ? "Ver recomendação" : "Continuar"}
            </Button>
          </div>
        ) : null}

        {step === 6 ? (
          <form onSubmit={handleFinishSubmit} aria-live="polite">
            <button
              type="button"
              onClick={goBack}
              className="rounded-lg px-2 py-1 text-sm font-bold text-muted transition hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sor-champagne)]"
            >
              ← Voltar
            </button>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-[var(--sor-champagne)]">
              Solução recomendada
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              {getRecommendation(priority, investment).name}
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted">
              {getRecommendation(priority, investment).description}
            </p>

            <div className="mt-7 rounded-[1.5rem] border border-[var(--sor-border-champagne)] bg-[var(--sor-bg-soft)] p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full border border-[var(--sor-border-main)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-soft">
                  {getRecommendation(priority, investment).category}
                </span>
                <strong className="text-[var(--sor-champagne)]">
                  {getRecommendation(priority, investment).price}
                </strong>
              </div>
              <ul className="mt-6 grid gap-3 text-sm text-muted">
                {getRecommendation(priority, investment).features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="text-[var(--sor-champagne)]">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl border border-[var(--sor-border-main)] bg-black/10 p-3 text-center">
                {[
                  ["Prazo", getRecommendation(priority, investment).prazo],
                  ["Revisões", getRecommendation(priority, investment).revisoes],
                  ["Suporte", getRecommendation(priority, investment).suporte],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-soft">
                      {label}
                    </p>
                    <p className="mt-1 text-xs font-extrabold">{value}</p>
                  </div>
                ))}
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

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button type="submit" disabled={isFinishing}>
                {isFinishing ? "Finalizando..." : "Concluir diagnóstico"}
              </Button>
              <Link
                href="/#solucoes"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--sor-border-main)] px-5 py-3 text-sm font-bold text-muted transition hover:border-[var(--sor-border-champagne)] hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sor-champagne)]"
              >
                Ver todas as soluções →
              </Link>
            </div>
          </form>
        ) : null}
      </div>
    </Card>
  );
}
