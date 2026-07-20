---
project: SOR ONE (sor-one-internal)
updated_at: 2026-07-19
status: active
product_type: site institucional público + console interno de leads
primary_action: visitante entende a oferta e conclui o diagnóstico, virando lead
target_user: dono de pequeno negócio avaliando implantação; operador interno no console
stack: Next.js 16.2.9 + React 19.2.4 + TypeScript 5 + Tailwind 4 + Supabase
repository: github.com/RhanielRodri/sor-one-internal
production: Vercel — não confirmado por validação atual
source_of_truth: .
---

# Contexto do projeto

## Problema resolvido

Apresentar publicamente a oferta da SOR ONE e converter visitante em lead
qualificado por diagnóstico, com o acompanhamento desses leads em console
próprio.

## Fluxo principal

O visitante chega pela home, percorre a oferta, abre `/diagnostico` e responde
em duas fases: a captura registra o lead antes da qualificação completa, de modo
que um abandono no meio ainda produz lead. O operador acessa `/login`, entra no
`/console` e trabalha a lista com status e observações.

## Stack confirmada

Confirmada por `package.json`: Next.js 16.2.9, React 19.2.4, React DOM 19.2.4,
`@supabase/supabase-js` 2.108.2, TypeScript 5, Tailwind 4 via
`@tailwindcss/postcss`, ESLint 9 com `eslint-config-next`, Puppeteer 25 em
devDependencies. Scripts declarados: `dev`, `build`, `start`, `lint`. Não há
script de teste declarado.

## Arquitetura principal

App Router com route groups separando `(public)` de `console`. Rotas públicas
existentes no código: home, `/diagnostico`, `/projetos`, `/privacidade`. Rotas
de sessão: `/login`, `/console`, `/console/dashboard` e `/console/leads`.

Não existe `middleware.ts` no projeto. A proteção do console é feita por rota,
com cookie de sessão `httpOnly` emitido em `/api/admin/login` e verificado pelos
helpers de `src/lib/auth` (`session.ts`, `password.ts`, `admin-request.ts`).

API Routes em `src/app/api`, divididas entre público e administrativo:
`/api/leads`, `/api/leads/[id]`, `/api/diagnostico`, `/api/diagnostico/capture`,
`/api/diagnostico/complete`, `/api/admin/login`, `/api/admin/logout`,
`/api/admin/leads`, `/api/admin/leads/[id]/status`,
`/api/admin/leads/[id]/observacao`.

Código de apoio em `src/lib` (`auth`, `diagnostic`, `supabase`), componentes em
`src/components` (`admin`, `public`, `seo`, `ui`) e dados estáticos em
`src/data`.

Persistência em Supabase, com sete migrations versionadas em
`supabase/migrations`. As migrations mostram evolução deliberada de segurança:
RPC com `security definer`, grants de papel administrativo e revogação de insert
anônimo em leads. Há um teste SQL em `supabase/tests/diagnostic_two_phase.sql`.

## Ambientes conhecidos

Desenvolvimento local por `next dev`. Deploy pela Vercel, inferido pela presença
de `.vercel/` local e declarado no `README`. O estado de saúde de produção não
foi validado nesta adoção.

## Integrações externas

Supabase, como banco e camada de acesso. Vercel, como hospedagem. Link externo
publicado para `instagram.com/soroneoficial` no rodapé. Link de WhatsApp
publicado via constante interna. Puppeteer é usado por script auxiliar de
captura de imagem, não em runtime de produção.

## Variáveis de ambiente exigidas

Apenas os nomes, coletados por referência no código. Nenhum valor foi lido.

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

Existe um `.env.local` local, ignorado pelo Git. O arquivo não foi aberto e seus
valores não são conhecidos.

## Fontes autoritativas

O repositório é a fonte de verdade. Em ordem: código em `src`, `package.json`,
`supabase/migrations`, e o Git observável. O `README.md` do projeto e o registro
global do SOR OS são fontes secundárias e ambos apresentam divergência atual,
registrada em `ai/state.md`.

## Limites de confiança

Esta adoção foi montada por descoberta somente leitura em 2026-07-19. Não foram
executados teste, build, lint ou deploy, e nenhuma URL de produção foi acessada.

Portanto não estão confirmados: a saúde de produção, a validade das credenciais,
o comportamento em runtime, o estado real do banco Supabase, a existência da
conta `@soroneoficial` já linkada no rodapé, e qualquer resultado funcional que
não seja legível diretamente no código.
