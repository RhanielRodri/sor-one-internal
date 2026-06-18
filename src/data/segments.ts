import type { SelectOption } from "@/lib/types";

export const segmentOptions: SelectOption[] = [
  { value: "salao-barbearia", label: "Salão ou barbearia" },
  { value: "clinica-estetica", label: "Clínica ou estética" },
  { value: "restaurante-cafe", label: "Restaurante ou café" },
  { value: "loja-fisica", label: "Loja física" },
  { value: "prestador-servico", label: "Prestador de serviço" },
  { value: "confeitaria", label: "Confeitaria" },
  { value: "outro", label: "Outro" },
];

export const urgencyOptions: SelectOption[] = [
  { value: "agora", label: "Quero resolver agora" },
  { value: "30-dias", label: "Nos próximos 30 dias" },
  { value: "planejando", label: "Estou planejando" },
];

export const budgetOptions: SelectOption[] = [
  { value: "ate-500", label: "Até R$ 500" },
  { value: "500-1500", label: "R$ 500 a R$ 1.500" },
  { value: "1500-3000", label: "R$ 1.500 a R$ 3.000" },
  { value: "acima-3000", label: "Acima de R$ 3.000" },
  { value: "nao-sei", label: "Ainda não sei" },
];

export const sourceOptions: SelectOption[] = [
  { value: "site", label: "Site" },
  { value: "instagram", label: "Instagram" },
  { value: "indicacao", label: "Indicação" },
  { value: "upwork", label: "Upwork" },
  { value: "workana", label: "Workana" },
  { value: "outro", label: "Outro" },
];
