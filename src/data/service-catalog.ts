import type { PublicService } from "@/lib/services";

export type ServiceShowcaseItem = {
  icon: string;
  category: string;
  name: string;
  description: string;
  price: string;
  prazo: string;
  revisoes: string;
  suporte: string;
  includes: string[];
};

type CatalogEntry = {
  match: string[];
  icon: string;
  category: string;
  description: string;
  price: string;
  prazo: string;
  revisoes: string;
  suporte: string;
  includes: string[];
};

const catalog: CatalogEntry[] = [
  {
    match: ["institucional", "site", "presença"],
    icon: "↗",
    category: "Presença digital",
    description:
      "Site completo para apresentar seu negócio, gerar confiança e facilitar o contato.",
    price: "R$ 1.500",
    prazo: "5–7 dias",
    revisoes: "2 revisões",
    suporte: "30 dias",
    includes: [
      "Design personalizado responsivo",
      "Seções Hero, Serviços, Sobre e Contato",
      "Integração WhatsApp e Google Maps",
      "SEO básico com meta tags",
      "Deploy em domínio próprio ou Vercel",
    ],
  },
  {
    match: ["landing"],
    icon: "⚡",
    category: "Conversão",
    description:
      "Página única focada em converter visitante em contato ou venda direta.",
    price: "R$ 1.200",
    prazo: "3–5 dias",
    revisoes: "2 revisões",
    suporte: "15 dias",
    includes: [
      "Hero com CTA direto",
      "Seção de benefícios e prova social",
      "Formulário ou botão de conversão",
      "Velocidade pensada para tráfego pago",
      "Pixel Meta ou Google Tag Manager",
    ],
  },
  {
    match: ["catálogo", "catalogo"],
    icon: "◇",
    category: "Catálogo B2B/B2C",
    description:
      "Catálogo digital com busca, filtros e solicitação de orçamento pelo cliente.",
    price: "R$ 3.000",
    prazo: "10–14 dias",
    revisoes: "2 revisões",
    suporte: "60 dias",
    includes: [
      "Busca, filtros e categorias",
      "Modal de detalhes do produto",
      "Carrinho e solicitação de orçamento",
      "Integração WhatsApp para pedidos",
      "Painel admin de produtos",
      "API REST + PostgreSQL",
    ],
  },
  {
    match: ["agendamento", "agenda"],
    icon: "◎",
    category: "Agendamento",
    description:
      "Sistema de agendamento online com prevenção de conflitos e painel administrativo.",
    price: "R$ 2.500",
    prazo: "10–14 dias",
    revisoes: "2 revisões",
    suporte: "60 dias",
    includes: [
      "Página pública de agendamento",
      "Seleção de serviço, profissional e horário",
      "Prevenção de conflito de horário",
      "Confirmação e lembrete por WhatsApp",
      "Painel admin com métricas",
      "API REST + PostgreSQL",
    ],
  },
  {
    match: ["dashboard", "painel", "administrativo"],
    icon: "▦",
    category: "Sistema interno",
    description:
      "Painel administrativo com métricas, gráficos e gestão dos dados da operação.",
    price: "R$ 3.000",
    prazo: "14–21 dias",
    revisoes: "2 revisões",
    suporte: "60 dias",
    includes: [
      "Painel com métricas e KPIs",
      "Gráficos de tendência",
      "Listagem e filtro de registros",
      "Autenticação com acesso protegido",
      "Integração com dados da operação",
      "API REST + PostgreSQL",
    ],
  },
  {
    match: ["tráfego", "trafego", "ads"],
    icon: "▲",
    category: "Marketing",
    description:
      "Campanhas de Meta e Google Ads gerenciadas para trazer cliente todo mês, com relatório mensal e regras claras de quando pausar ou escalar.",
    price: "Sob consulta",
    prazo: "Recorrente mensal",
    revisoes: "Otimização contínua",
    suporte: "Incluso",
    includes: [
      "Configuração de campanhas Meta e Google Ads",
      "Segmentação local e por intenção de busca",
      "Relatório mensal com resultado em linguagem simples",
      "Regras definidas de pausar e escalar anúncios",
      "Acompanhamento de custo por lead",
    ],
  },
  {
    match: ["automaç", "automacao", "ia"],
    icon: "⟳",
    category: "Automação com IA",
    description:
      "Fluxos automáticos para captura, qualificação e atendimento sem trabalho manual.",
    price: "Sob consulta",
    prazo: "A definir",
    revisoes: "Por projeto",
    suporte: "Incluso",
    includes: [
      "Resposta automática a leads no WhatsApp",
      "Follow-up sequencial por email ou mensagem",
      "Notificação de novos pedidos ou agendamentos",
      "Qualificação de lead com perguntas automáticas",
      "Integração n8n, Make ou Zapier",
    ],
  },
];

const fallbackEntry: Omit<CatalogEntry, "match"> = {
  icon: "▦",
  category: "Sob medida",
  description:
    "Solução desenvolvida sob medida para o problema específico do seu negócio.",
  price: "Sob consulta",
  prazo: "A definir",
  revisoes: "Por projeto",
  suporte: "Incluso",
  includes: [
    "Escopo definido a partir do diagnóstico",
    "Desenvolvimento sob medida",
    "Deploy e suporte inicial",
  ],
};

function findEntry(name: string): Omit<CatalogEntry, "match"> {
  const normalized = name.toLowerCase();
  const entry = catalog.find((item) =>
    item.match.some((token) => normalized.includes(token)),
  );
  return entry ?? fallbackEntry;
}

function formatPrice(value: number | null): string {
  if (value === null) return "Sob consulta";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function toShowcaseFromServices(
  services: PublicService[],
): ServiceShowcaseItem[] {
  return services.map((service) => {
    const entry = findEntry(service.nome);
    return {
      icon: entry.icon,
      category: entry.category,
      name: service.nome,
      description: service.descricao || entry.description,
      price: formatPrice(service.preco_inicio),
      prazo: service.prazo_dias
        ? `${service.prazo_dias} dias`
        : entry.prazo,
      revisoes: entry.revisoes,
      suporte: entry.suporte,
      includes: entry.includes,
    };
  });
}

export const staticServiceShowcase: ServiceShowcaseItem[] = [
  "Site Institucional",
  "Landing Page",
  "Catálogo Digital B2B/B2C",
  "Agendamento Online",
  "Dashboard Administrativo",
  "Gestão de Tráfego Pago",
  "Automações com IA",
].map((name) => {
  const entry = findEntry(name);
  return {
    icon: entry.icon,
    category: entry.category,
    name,
    description: entry.description,
    price: entry.price,
    prazo: entry.prazo,
    revisoes: entry.revisoes,
    suporte: entry.suporte,
    includes: entry.includes,
  };
});
