export const DIAGNOSTIC_OBJECTIVES = [
  "Vender mais",
  "Receber mais contatos",
  "Organizar atendimentos",
  "Mostrar produtos ou serviços",
  "Melhorar um site existente",
  "Automatizar uma tarefa",
] as const;

export const DIAGNOSTIC_TIMELINES = [
  "Esta semana",
  "Ainda este mês",
  "Só estou pesquisando",
] as const;

export const DIAGNOSTIC_BUDGETS = [
  "Até R$ 700",
  "R$ 700 a R$ 1.500",
  "R$ 1.500 a R$ 3.000",
  "Acima de R$ 3.000",
  "Ainda não sei",
] as const;

export type DiagnosticQuestion = {
  id: string;
  label: string;
  type?: "text" | "url" | "number" | "textarea" | "select";
  options?: string[];
  placeholder?: string;
};

export type DiagnosticService = {
  slug: string;
  name: string;
  minimumInvestment: number;
  finalPlaceholder: string;
  questions: DiagnosticQuestion[];
};

export const DIAGNOSTIC_SERVICES: DiagnosticService[] = [
  {
    slug: "presenca-digital-express",
    name: "Presença Digital Express",
    minimumInvestment: 497,
    finalPlaceholder: "Ex.: referências de páginas, região atendida ou principal diferencial.",
    questions: [
      { id: "possui_site", label: "Você já possui site?", type: "select", options: ["Sim", "Não"] },
      { id: "principal_servico", label: "Qual é o principal serviço do seu negócio?", placeholder: "Ex.: corte e barba, estética facial, confeitaria" },
      { id: "contato_atual", label: "Como os clientes entram em contato hoje?", placeholder: "Ex.: WhatsApp, Instagram, indicação" },
    ],
  },
  {
    slug: "catalogo-digital",
    name: "Catálogo Digital",
    minimumInvestment: 1000,
    finalPlaceholder: "Ex.: categorias, variações, formas de entrega ou referências de catálogo.",
    questions: [
      { id: "o_que_vende", label: "O que você vende?", placeholder: "Descreva os principais produtos ou serviços" },
      { id: "quantidade_produtos", label: "Quantos produtos aproximadamente?", type: "number", placeholder: "Ex.: 30" },
      { id: "pedidos_atuais", label: "Hoje os pedidos chegam por onde?", placeholder: "Ex.: WhatsApp, Instagram, loja física" },
    ],
  },
  {
    slug: "sistema-de-agendamento",
    name: "Sistema de Agendamento",
    minimumInvestment: 1000,
    finalPlaceholder: "Ex.: duração dos serviços, profissionais envolvidos ou regras de horário.",
    questions: [
      { id: "tipo_atendimento", label: "Qual tipo de atendimento você realiza?", placeholder: "Ex.: consultas, cortes, aulas particulares" },
      { id: "atendimentos_semana", label: "Quantos atendimentos por semana, aproximadamente?", type: "number", placeholder: "Ex.: 40" },
      { id: "organizacao_horarios", label: "Como organiza horários hoje?", placeholder: "Ex.: agenda de papel, WhatsApp, planilha" },
    ],
  },
  {
    slug: "ajustes-em-sites",
    name: "Ajustes em Sites",
    minimumInvestment: 150,
    finalPlaceholder: "Ex.: páginas afetadas, erros recentes ou referência do resultado esperado.",
    questions: [
      { id: "link_site", label: "Qual é o link do site, se existir?", type: "url", placeholder: "https://seusite.com.br" },
      { id: "problema_principal", label: "Qual problema principal?", type: "select", options: ["Lentidão", "Mobile", "Visual", "Erro", "Outro"] },
      { id: "ajuste_necessario", label: "Explique o ajuste que precisa.", type: "textarea", placeholder: "Descreva o problema e onde ele acontece" },
    ],
  },
  {
    slug: "manutencao-mensal",
    name: "Manutenção Mensal",
    minimumInvestment: 150,
    finalPlaceholder: "Ex.: frequência de atualizações, problemas recorrentes ou prioridade atual.",
    questions: [
      { id: "possui_site", label: "Você já possui site?", type: "select", options: ["Sim", "Não"] },
      { id: "plataforma", label: "Qual plataforma usa, se souber?", placeholder: "Ex.: WordPress, Shopify, Next.js" },
      { id: "tipo_manutencao", label: "Que tipo de manutenção precisa?", placeholder: "Ex.: conteúdo, correções, segurança, suporte" },
    ],
  },
  {
    slug: "site-institucional",
    name: "Site Institucional",
    minimumInvestment: 800,
    finalPlaceholder: "Ex.: referências visuais, páginas desejadas ou prazo importante.",
    questions: [
      { id: "atividade_empresa", label: "O que sua empresa faz?", placeholder: "Descreva a atividade principal" },
      { id: "servicos_site", label: "Quais serviços devem aparecer no site?", type: "textarea", placeholder: "Liste os serviços mais importantes" },
      { id: "identidade_visual", label: "Já possui identidade visual e logo?", type: "select", options: ["Sim", "Não"] },
    ],
  },
  {
    slug: "projeto-personalizado",
    name: "Projeto Personalizado",
    minimumInvestment: 2000,
    finalPlaceholder: "Ex.: pessoas envolvidas, ferramentas atuais, integrações ou prazo desejado.",
    questions: [
      { id: "processo", label: "Que processo você quer organizar ou automatizar?", type: "textarea", placeholder: "Descreva a rotina ou gargalo principal" },
      { id: "como_funciona_hoje", label: "Hoje como isso é feito?", type: "textarea", placeholder: "Explique o processo atual" },
      { id: "resultado_esperado", label: "Qual resultado espera alcançar?", type: "textarea", placeholder: "Descreva o resultado ideal" },
    ],
  },
];

export function getDiagnosticService(slug?: string | null) {
  return DIAGNOSTIC_SERVICES.find((service) => service.slug === slug) ?? DIAGNOSTIC_SERVICES[0];
}

export function getServiceSlug(name: string) {
  const normalized = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (normalized.includes("catalogo")) return "catalogo-digital";
  if (normalized.includes("agendamento") || normalized.includes("agenda")) return "sistema-de-agendamento";
  if (normalized.includes("ajuste")) return "ajustes-em-sites";
  if (normalized.includes("manutencao")) return "manutencao-mensal";
  if (normalized.includes("institucional")) return "site-institucional";
  return "presenca-digital-express";
}
