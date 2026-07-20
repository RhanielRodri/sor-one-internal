---
updated_at: 2026-07-19
status: active
---

# Escopo

## Dentro do escopo

- Site público institucional da SOR ONE, como vitrine da oferta de implantação.
- Diagnóstico em duas fases, com captura de lead antes da qualificação completa.
- Console interno de leads, com login por sessão, listagem, status e observação.
- Persistência e regras de acesso em Supabase, por migrations versionadas.
- SEO técnico por rota, com metadata, `robots` e `sitemap` gerados.

## Funcionalidades existentes

Confirmadas por leitura do código, não por execução.

- Home pública, `/projetos`, `/diagnostico` e `/privacidade`.
- Fluxo de diagnóstico em duas fases, com endpoints `capture` e `complete`
  separados, sustentado pela migration `diagnostic_two_phase`.
- Autenticação administrativa por `/api/admin/login` e `/api/admin/logout`, com
  cookie `httpOnly` e as variáveis `ADMIN_PASSWORD` e `ADMIN_SESSION_SECRET`.
- Console com rotas `/console`, `/console/dashboard` e `/console/leads`, com
  leitura de leads e mutação de status e observação por lead.
- Cadastro manual de lead pelo console, via `manual-lead-modal`.
- Cartão da demo Lumière presente em `/projetos` e na vitrine de implantações
  da home.
- Endurecimento de acesso no banco: RPC `security definer`, grants de papel
  administrativo e revogação do insert anônimo em leads.

## Fora do escopo

- Página do produto Atendimento Inteligente. Não existe no código.
- Rotas `/solucoes` e `/contato`. O `README` as anuncia, mas elas não existem.
- Site multilíngue. O `next-intl` foi removido deliberadamente; o site é PT-only.
- Qualquer entrega de cliente. Este repositório é vitrine e console próprios,
  nunca entregável contratado.
- Teste automatizado de aplicação. Não há script `test` nem suíte JS; existe
  apenas um teste SQL de banco.

## Limites de produto

- A marca pública é SOR ONE. Nomes internos, técnicos ou históricos não devem
  aparecer para visitante. O `README` viola esse limite hoje e a violação está
  registrada como divergência em `ai/state.md`.
- A oferta comunicada é implantação configurada para escopo definido em
  diagnóstico, nunca promessa de sistema sob medida ilimitado.
- O console é interno e não é produto vendável.

## Decisões que não devem ser reabertas sem evidência

- Remoção do `next-intl` e site PT-only, decidida em `7b9d522`.
- Diagnóstico com captura antes da qualificação, decidido em `1dfdc30` e
  consolidado em `34bd22b`.
- Revogação do insert anônimo em leads, decidida na migration
  `20260706150000_revoke_anon_insert_leads`.
- Posicionamento como empresa de implantação, decidido em `b9b4017` e `4235657`.

## Pendências abertas

Pendência não é escopo concluído. Continuam abertas:

- Página do produto Atendimento Inteligente, ausente no código.
- Confirmação da conta `@soroneoficial`, já linkada publicamente no rodapé.
- Alinhamento do `README` com o código e com a marca pública.

## Critérios de aceite

Não confirmado. Não há critério de aceite declarado no repositório, e inventá-lo
aqui seria criar escopo sem evidência.
