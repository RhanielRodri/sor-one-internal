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
  const [businessType, setBusinessType] = useState("");
  const [currentSituation, setCurrentSituation] = useState("");
  const [priority, setPriority] = useState("");
  const [investment, setInvestment] = useState("");
  const [showContact, setShowContact] = useState(false);
  const [contact, setContact] = useState<ContactData>(initialContact);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const recommendation = getRecommendation(priority, investment);
  const stepSelections = [businessType, currentSituation, priority, investment];
  const canContinue =
    step === 0 ? selectedPains.length > 0 : Boolean(stepSelections[step - 1]);

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

  function goNext() {
    if (!canContinue) return;
    setError("");
    setStep((current) => Math.min(current + 1, 5));
  }

  function goBack() {
    setError("");
    setShowContact(false);
    setStep((current) => Math.max(current - 1, 0));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!contact.nome.trim() || !contact.whatsapp.trim()) {
      setError("Informe seu nome e WhatsApp para solicitar o diagnóstico.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const problem = [
      `DORES IDENTIFICADAS:\n${selectedPains.join("\n")}`,
      `TIPO DE NEGÓCIO:\n${businessType}`,
      `SITUAÇÃO ATUAL:\n${currentSituation}`,
      `PRIORIDADE:\n${priority}`,
      `INVESTIMENTO:\n${investment}`,
      `RECOMENDAÇÃO:\n${recommendation.name}`,
    ].join("\n\n");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          segmento: recommendation.name,
          problema: problem,
          urgencia: priority,
          orcamento: investment,
          origem: "site",
        }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Não foi possível enviar o diagnóstico.");
      }

      setSuccess(true);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Não foi possível enviar o diagnóstico.",
      );
    } finally {
      setIsSubmitting(false);
    }
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
      {step >= 1 && step <= 4 ? (
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
              Etapa {step}/4
            </span>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/6">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,var(--sor-blue),var(--sor-champagne))] transition-[width] duration-300"
              style={{ width: `${step * 25}%` }}
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
          <ChoiceGrid
            label="Qual é o seu tipo de negócio?"
            options={businessTypes}
            value={businessType}
            onChange={setBusinessType}
          />
        ) : null}

        {step === 2 ? (
          <ChoiceGrid
            label="Qual é a sua situação atual?"
            options={currentSituations}
            value={currentSituation}
            onChange={setCurrentSituation}
            columns="grid-cols-1"
          />
        ) : null}

        {step === 3 ? (
          <ChoiceGrid
            label="Qual é a sua prioridade agora?"
            options={priorities}
            value={priority}
            onChange={setPriority}
          />
        ) : null}

        {step === 4 ? (
          <ChoiceGrid
            label="Quanto pretende investir neste momento?"
            options={investments}
            value={investment}
            onChange={setInvestment}
            columns="grid-cols-1"
          />
        ) : null}

        {step >= 1 && step <= 4 ? (
          <div className="mt-8 flex justify-end border-t border-[var(--sor-border-main)] pt-5">
            <Button type="button" disabled={!canContinue} onClick={goNext}>
              {step === 4 ? "Ver recomendação" : "Continuar"}
            </Button>
          </div>
        ) : null}

        {step === 5 ? (
          <div aria-live="polite">
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
              {recommendation.name}
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted">
              {recommendation.description}
            </p>

            <div className="mt-7 rounded-[1.5rem] border border-[var(--sor-border-champagne)] bg-[var(--sor-bg-soft)] p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full border border-[var(--sor-border-main)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-soft">
                  {recommendation.category}
                </span>
                <strong className="text-[var(--sor-champagne)]">
                  {recommendation.price}
                </strong>
              </div>
              <ul className="mt-6 grid gap-3 text-sm text-muted">
                {recommendation.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="text-[var(--sor-champagne)]">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl border border-[var(--sor-border-main)] bg-black/10 p-3 text-center">
                {[
                  ["Prazo", recommendation.prazo],
                  ["Revisões", recommendation.revisoes],
                  ["Suporte", recommendation.suporte],
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

            {!showContact ? (
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button type="button" onClick={() => setShowContact(true)}>
                  Solicitar diagnóstico gratuito
                </Button>
                <Link
                  href="/solucoes"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--sor-border-main)] px-5 py-3 text-sm font-bold text-muted transition hover:border-[var(--sor-border-champagne)] hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sor-champagne)]"
                >
                  Ver todas as soluções →
                </Link>
              </div>
            ) : (
              <form
                className="mt-8 grid gap-5 border-t border-[var(--sor-border-main)] pt-7"
                onSubmit={handleSubmit}
              >
                <div>
                  <h3 className="text-xl font-black">Como posso falar com você?</h3>
                  <p className="mt-2 text-sm text-muted">
                    Envie seus dados para receber uma análise sem compromisso.
                  </p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
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
                  <Input
                    id="empresa"
                    label="Empresa"
                    placeholder="Nome do negócio"
                    value={contact.empresa}
                    onChange={(event) =>
                      updateContact("empresa", event.target.value)
                    }
                  />
                  <Input
                    id="email"
                    type="email"
                    label="E-mail"
                    placeholder="voce@email.com"
                    value={contact.email}
                    onChange={(event) => updateContact("email", event.target.value)}
                  />
                </div>
                {error ? (
                  <p
                    role="alert"
                    className="rounded-xl border border-red-400/20 bg-red-500/8 px-4 py-3 text-sm text-red-300"
                  >
                    {error}
                  </p>
                ) : null}
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-fit">
                  {isSubmitting ? "Enviando..." : "Enviar diagnóstico gratuito"}
                </Button>
              </form>
            )}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
