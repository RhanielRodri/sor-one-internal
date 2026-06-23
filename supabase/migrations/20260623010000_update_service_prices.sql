-- Atualização de preços e prazos dos serviços
-- Aplicar no painel Supabase > SQL Editor

-- Presença Digital Express: R$ 697, prazo 7 dias
UPDATE servicos
SET preco_inicio = 697, prazo_dias = 7
WHERE LOWER(nome) LIKE '%presença digital%' OR LOWER(nome) LIKE '%express%';

-- Catálogo Digital: R$ 1800, prazo 12-15 dias (usar 15 como referência)
UPDATE servicos
SET preco_inicio = 1800, prazo_dias = 15
WHERE LOWER(nome) LIKE '%catálogo%' OR LOWER(nome) LIKE '%catalogo%';

-- Sistema de Agendamento: R$ 2800, prazo 20-30 dias (usar 30 como referência)
UPDATE servicos
SET preco_inicio = 2800, prazo_dias = 30
WHERE LOWER(nome) LIKE '%agendamento%' OR LOWER(nome) LIKE '%agenda%';
