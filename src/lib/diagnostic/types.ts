export type SolutionKey =
  | "agendafacil"
  | "mesaflow"
  | "catalogpro"
  | "sor_presenca";

export type MaturityLevel = "inicial" | "organizacao" | "evolucao";

export type DiagnosticAnswers = {
  primaryGoal: string;
  businessType: string;
  currentChannels: string[];
  bottleneck: string;
  leadVolume: string;
  desiredOutcome: string;
};

export type DiagnosticContact = {
  name: string;
  businessName: string;
  phone: string;
  cityState: string;
  email: string;
};

export type DiagnosticSubmission = DiagnosticAnswers &
  DiagnosticContact & {
    consent: boolean;
  };

export type RecommendationNextStep = {
  solution: SolutionKey;
  solutionName: string;
  reason: string;
};

export type Recommendation = {
  solution: SolutionKey;
  solutionName: string;
  modules: string[];
  maturity: MaturityLevel;
  nextStep: RecommendationNextStep | null;
  summary: string;
  evolutionNote: string;
};

export const MATURITY_LABELS: Record<MaturityLevel, string> = {
  inicial: "Inicial",
  organizacao: "Em organização",
  evolucao: "Em evolução",
};
