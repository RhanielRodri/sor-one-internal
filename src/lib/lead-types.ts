export const LEAD_STATUSES = [
  "prospectado",
  "diagnostico_solicitado",
  "em_analise",
  "contato_iniciado",
  "proposta_enviada",
  "negocio_ganho",
  "em_execucao",
  "entregue",
  "sem_retorno",
  "negocio_perdido",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type Lead = {
  id: string | number;
  nome: string;
  empresa: string | null;
  whatsapp: string;
  email: string | null;
  segmento: string | null;
  problema: string;
  urgencia: string | null;
  orcamento: string | null;
  origem: string | null;
  status: string;
  observacoes: string | null;
  criado_em: string;
  atualizado_em: string | null;
};

export type LeadHistory = {
  id: string | number;
  lead_id: string | number;
  status_anterior: string;
  novo_status: string;
  acao: string;
  motivo_perda: string | null;
  criado_em: string;
};

export const STATUS_LABELS: Record<LeadStatus, string> = {
  prospectado: "Prospectado",
  diagnostico_solicitado: "Diagnóstico solicitado",
  em_analise: "Em análise",
  contato_iniciado: "Contato iniciado",
  proposta_enviada: "Proposta enviada",
  negocio_ganho: "Negócio ganho",
  em_execucao: "Em execução",
  entregue: "Entregue",
  sem_retorno: "Sem retorno",
  negocio_perdido: "Negócio perdido",
};

export const NEXT_ACTION_LABELS: Record<LeadStatus, string> = {
  prospectado: "Iniciar contato",
  diagnostico_solicitado: "Analisar diagnóstico",
  em_analise: "Entrar em contato",
  contato_iniciado: "Enviar proposta",
  proposta_enviada: "Acompanhar decisão",
  negocio_ganho: "Iniciar execução",
  em_execucao: "Finalizar entrega",
  entregue: "Fluxo concluído",
  sem_retorno: "Retomar contato",
  negocio_perdido: "Fluxo encerrado",
};

export const LOSS_REASONS = [
  "Preço",
  "Sem urgência",
  "Escolheu outra solução",
  "Sem resposta",
  "Não era o perfil ideal",
  "Outro",
] as const;
