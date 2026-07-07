import {
  EVOLUTION_NOTE,
  SOLUTION_MODULES,
  SOLUTION_NAMES,
} from "@/lib/diagnostic/options";
import type {
  DiagnosticAnswers,
  MaturityLevel,
  Recommendation,
  RecommendationNextStep,
  SolutionKey,
} from "@/lib/diagnostic/types";

type Scores = Record<SolutionKey, number>;

const VERTICAL_SOLUTIONS: SolutionKey[] = [
  "agendafacil",
  "mesaflow",
  "catalogpro",
];

function emptyScores(): Scores {
  return { agendafacil: 0, mesaflow: 0, catalogpro: 0, sor_presenca: 0 };
}

function scoreBusinessType(type: string, scores: Scores) {
  if (type === "Barbearia, salão ou estética") scores.agendafacil += 3;
  else if (type === "Restaurante, lanchonete ou delivery") scores.mesaflow += 3;
  else if (type === "Loja, distribuidora ou fornecedor") scores.catalogpro += 3;
  else if (type === "Clínica, consultório ou profissional autônomo")
    scores.agendafacil += 2;
  else if (type === "Prestador de serviços") {
    scores.sor_presenca += 1;
    scores.agendafacil += 1;
  } else scores.sor_presenca += 1;
}

function scoreGoal(goal: string, scores: Scores) {
  if (goal === "Ser encontrado por novos clientes") scores.sor_presenca += 3;
  else if (goal === "Responder WhatsApp mais rápido") scores.sor_presenca += 1;
  else if (goal === "Organizar orçamentos e contatos") scores.catalogpro += 2;
  else if (goal === "Reduzir faltas e organizar agendamentos")
    scores.agendafacil += 3;
  else if (goal === "Receber mais pedidos") {
    scores.mesaflow += 2;
    scores.catalogpro += 1;
  } else if (goal === "Mostrar serviços, produtos ou catálogo com mais clareza")
    scores.catalogpro += 2;
}

function scoreBottleneck(bottleneck: string, scores: Scores) {
  if (bottleneck === "Clientes não confirmam horário") scores.agendafacil += 3;
  else if (bottleneck === "Pedidos se perdem em conversas") scores.mesaflow += 3;
  else if (bottleneck === "Orçamentos esquecidos") scores.catalogpro += 3;
  else if (bottleneck === "Falta de presença no Google e internet")
    scores.sor_presenca += 3;
  else if (bottleneck === "Equipe não sabe em que etapa cada contato está")
    scores.catalogpro += 2;
  else if (bottleneck === "Demora para responder") scores.sor_presenca += 1;
}

function scoreOutcome(outcome: string, scores: Scores) {
  if (outcome === "Mais agendamentos confirmados") scores.agendafacil += 2;
  else if (outcome === "Mais pedidos e orçamentos") {
    scores.mesaflow += 1;
    scores.catalogpro += 1;
  } else if (outcome === "Melhor presença digital") scores.sor_presenca += 2;
  else if (outcome === "Mais organização comercial") scores.catalogpro += 1;
}

function scoreChannels(channels: string[], scores: Scores) {
  if (
    channels.includes("Temos site, mas ele quase não gera contato") ||
    channels.includes("Não temos processo organizado")
  ) {
    scores.sor_presenca += 1;
  }
}

function resolveMaturity(answers: DiagnosticAnswers): MaturityLevel {
  let initial = 0;
  let evolution = 0;

  if (answers.currentChannels.includes("Não temos processo organizado"))
    initial += 2;
  if (answers.currentChannels.includes("Usamos agenda, planilha ou caderno"))
    initial += 1;
  if (answers.bottleneck === "Falta de presença no Google e internet")
    initial += 2;
  if (
    answers.leadVolume === "Até 10" &&
    answers.primaryGoal === "Ser encontrado por novos clientes"
  )
    initial += 1;

  if (answers.leadVolume === "De 31 a 80" || answers.leadVolume === "Mais de 80")
    evolution += 2;
  if (answers.desiredOutcome === "Menos tempo respondendo as mesmas perguntas")
    evolution += 2;
  if (answers.bottleneck === "Muitas perguntas repetidas") evolution += 1;

  if (evolution >= 2 && evolution > initial) return "evolucao";
  if (initial >= 2 && initial >= evolution) return "inicial";
  return "organizacao";
}

function topByScore(scores: Scores, keys: SolutionKey[]): SolutionKey {
  return keys.reduce((best, key) =>
    scores[key] > scores[best] ? key : best,
  );
}

function buildSummary(
  answers: DiagnosticAnswers,
  maturity: MaturityLevel,
): string {
  const channelText = answers.currentChannels.length
    ? answers.currentChannels.join(", ").toLowerCase()
    : "canais dispersos";

  if (maturity === "inicial") {
    return `Hoje seu negócio depende de ${channelText} e ainda não tem um processo comercial estruturado. Antes de sistemas mais avançados, o foco é organizar a presença e a captação para parar de perder contatos.`;
  }
  if (maturity === "evolucao") {
    return `Seu negócio já recebe um bom volume de contatos por ${channelText}, então o ganho agora está em reduzir trabalho repetitivo e otimizar o fluxo que já funciona.`;
  }
  return `Seu negócio já recebe contatos por ${channelText}, mas pode perder oportunidades por falta de acompanhamento. O foco é organizar o processo comercial para não deixar contato no caminho.`;
}

export function recommend(answers: DiagnosticAnswers): Recommendation {
  const scores = emptyScores();
  scoreBusinessType(answers.businessType, scores);
  scoreGoal(answers.primaryGoal, scores);
  scoreBottleneck(answers.bottleneck, scores);
  scoreOutcome(answers.desiredOutcome, scores);
  scoreChannels(answers.currentChannels, scores);

  const maturity = resolveMaturity(answers);
  const topVertical = topByScore(scores, VERTICAL_SOLUTIONS);
  const overallTop = topByScore(scores, [...VERTICAL_SOLUTIONS, "sor_presenca"]);

  let solution: SolutionKey;
  let nextStep: RecommendationNextStep | null = null;

  const verticalHasSignal = scores[topVertical] >= 3;

  if (maturity === "inicial" && verticalHasSignal) {
    solution = "sor_presenca";
    nextStep = {
      solution: topVertical,
      solutionName: SOLUTION_NAMES[topVertical],
      reason: `Depois da presença organizada, ${SOLUTION_NAMES[topVertical]} entra para estruturar a próxima etapa do seu processo.`,
    };
  } else {
    solution =
      scores.sor_presenca > scores[topVertical] && !verticalHasSignal
        ? "sor_presenca"
        : overallTop;

    if (
      maturity === "evolucao" &&
      solution !== "sor_presenca" &&
      scores.sor_presenca === 0
    ) {
      nextStep = null;
    }
  }

  return {
    solution,
    solutionName: SOLUTION_NAMES[solution],
    modules: [...SOLUTION_MODULES[solution]],
    maturity,
    nextStep,
    summary: buildSummary(answers, maturity),
    evolutionNote: EVOLUTION_NOTE,
  };
}
