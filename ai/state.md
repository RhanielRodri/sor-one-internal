---
project: SOR ONE (sor-one-internal)
updated_at: 2026-07-19
review_at: 2026-07-23
status: active
current_phase: null
source: adoção por descoberta somente leitura do repositório
source_of_truth: .
---

# Estado do projeto

## Git observado

- Branch `main`, upstream `origin/main`.
- `HEAD` em `42356578ccd2ae61c4d74b584b015804367bc63f`.
- Remoto `origin` em `github.com/RhanielRodri/sor-one-internal`.
- Consulta remota ao vivo retornou `42356578` para `refs/heads/main`.
- Divergência `0/0`.
- Sincronização Git: **sincronizado**, com evidência remota atual.

## Working tree

Classificação observada:

- `Código/configuração alterados`: nenhum.
- `Documentação ai/ alterada`: nenhum antes desta adoção.
- Arquivos não rastreados: `.claude/`.

O diretório `.claude/` contém um único arquivo, `launch.json`. É configuração
local de ferramenta de desenvolvimento, não código de aplicação e não mudança de
produto. Permanece não rastreado e não foi alterado nem removido.

Ignorados pelo `.gitignore` e portanto fora de qualquer classificação de
mudança: `.env.local`, `.next/`, `.vercel/`, `next-env.d.ts`, `node_modules/`.
Os diretórios `.agents/` e `.codex/` existem vazios no disco e por isso não
aparecem no Git.

## Último resultado confirmado

O commit `4235657`, `feat: reformula experiência pública como empresa de
implantação`, é o topo de `main` e está publicado no remoto. Ele fecha uma
sequência de reposicionamento iniciada em `b9b4017`.

Confirmado apenas como estado versionado e sincronizado. Nenhuma validação
funcional, build, teste ou verificação de produção foi executada nesta adoção.

## Em andamento

Nenhum trabalho em andamento confirmado. A working tree não tem alteração de
código pendente.

## Bloqueios

Nenhum bloqueio técnico confirmado.

Risco aberto, não classificado como bloqueio: o rodapé publica link externo para
`instagram.com/soroneoficial`, enquanto o registro global do SOR OS ainda lista
"confirmar Instagram antes de linkar" como pendência. O link já está no ar; a
existência da conta não foi verificada.

## Próxima ação

Criar a página do produto Atendimento Inteligente no site público.

Evidência: a busca por `Atendimento Inteligente` em `src` não retorna nenhuma
ocorrência, e `projetos/registro.md` lista essa página como pendência do SOR ONE.
A ausência é verificável no código, e não inferida.

Essa é a única pendência do registro global que a inspeção confirma como
genuinamente aberta. Ela não altera o foco global vigente e não constitui
autorização para implementá-la.

## Divergências

Entre `README.md` e o código:

- O `README` declara "Next.js 15"; o `package.json` declara `next` 16.2.9.
- O `README` anuncia as rotas `/solucoes` e `/contato`; nenhuma das duas existe
  em `src/app`.
- O `README` documenta `ADMIN_SECRET`; o código referencia `ADMIN_PASSWORD` e
  `ADMIN_SESSION_SECRET`.
- O `README` descreve o projeto como "SOR OS Soluções Digitais — agência de
  desenvolvimento freelancer", enquanto os commits `b9b4017` e `4235657`
  reposicionam o produto como SOR ONE, empresa de implantação. O texto público
  expõe o nome interno, contrariando a invariante de marca.
- O `README` afirma que as rotas públicas e o console usam "middlewares
  distintos"; não existe `middleware.ts` no projeto. A proteção é por rota, com
  cookie `httpOnly`.
- O `README` lista uma página de contato entre as funcionalidades; não existe
  rota `/contato`. O contato acontece por links de WhatsApp e e-mail no rodapé.

Entre `projetos/registro.md` e o código:

- O registro lista "adicionar card Lumière em /projetos" como pendência; o card
  existe em `src/app/(public)/projetos/page.tsx` e na vitrine da home.
- O registro lista "confirmar Instagram @soroneoficial antes de linkar"; o link
  já está publicado no rodapé.
- O registro lista "adicionar página do produto Atendimento Inteligente"; essa
  pendência se confirma.

O registro global não foi corrigido nesta operação. `/sincronizar-projetos` é a
ação possível para tratá-lo.

## Validações confirmadas

- 2026-07-19 — adoção por descoberta somente leitura: Git conferido com
  evidência remota atual, estrutura de rotas e API mapeada, stack confirmada por
  `package.json`, migrations Supabase listadas, nomes de variáveis de ambiente
  coletados sem leitura de valores.

Nenhuma execução de teste, build, lint ou deploy ocorreu. Nenhuma URL de produção
foi acessada. A saúde de produção permanece não confirmada.

## Informações substituídas

- A descrição do `README` deixa de ser fonte confiável de stack, rotas e
  posicionamento; permanece como documento a ser corrigido.
- As pendências do registro global relativas ao card Lumière e ao link do
  Instagram deixam de descrever o estado atual do código.
