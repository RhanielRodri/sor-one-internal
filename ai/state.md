---
project: SOR ONE (sor-one-internal)
updated_at: 2026-07-19
review_at: 2026-07-23
status: active
current_phase: null
technical_baseline:
  commit: 4235657
  validation_status: unvalidated
  validated_at: não confirmado
  validated: []
  not_validated:
    - build atual
    - runtime local
    - produção
    - autenticação administrativa
    - persistência do diagnóstico
    - fluxos públicos principais
  evidence:
    - último commit de código identificado pelo Git
    - nenhuma validação funcional executada durante a adoção
source: descoberta somente leitura, reconciliada após correção do README
source_of_truth: .
---

# Estado do projeto

## Baseline técnica

`4235657` — `feat: reformula experiência pública como empresa de implantação`.

É o último commit que alterou código, confirmado pelos arquivos que ele toca:
`src/app`, `src/components` e `src/app/globals.css`. Tudo publicado depois dele
é exclusivamente documental e **não** move esta baseline.

Ressalva de confiança: a baseline é o último commit de código, não um commit
com validação funcional registrada. Nenhum teste, build ou verificação de
produção foi executado sobre ela nesta trilha de trabalho.

Daí `validation_status: unvalidated`. O commit está identificado com precisão —
`unvalidated` descreve a ausência de evidência funcional, não desconhecimento do
código. Existir, ter sido publicado no passado ou ter o README corrigido não
sustenta `partial`; só evidência exercitada agora sustentaria.

## Snapshot Git

Observação histórica, congelada no instante em que foi feita. Não precisa
continuar igual ao `HEAD`.

- `observed_at`: 2026-07-20
- branch observada: `main`, upstream `origin/main`
- `head_at_observation`: `b3fdbbc0363d5522ff70a10c97f77bdffbd8488d`
- sincronização observada: sincronizado, com consulta remota ao vivo,
  divergência `0/0`
- classificação da working tree: limpa, com `.claude/` não rastreado

Este snapshot ficará anterior ao `HEAD` assim que o commit que o registra for
criado. **Isso é o comportamento correto e não exige novo checkpoint.** O Git
atual é consultado ao vivo por `/continue`, `/status`, `/overview` e
`/sync-registry`, nunca lido daqui.

## Commits documentais

Posteriores à baseline técnica, todos sem uma linha de código:

- `5c66057` — adoção ao padrão `ai/`; toca só `ai/context.md`, `ai/scope.md` e
  `ai/state.md`.
- `a17690a` — correção da documentação pública; toca só `README.md`.
- `b3fdbbc` — reconciliação do estado; toca só `ai/state.md`.
- `3b863f6` — normalização de baseline e snapshot; toca só `ai/state.md`.

Classificação confirmada pelo Git, arquivo a arquivo, e não pela mensagem dos
commits.

## Working tree

- `Código/configuração alterados`: nenhum.
- `Documentação ai/ alterada`: nenhum pendente.
- Arquivos não rastreados: `.claude/`, contendo só `launch.json`.

O diretório `.claude/` contém um único arquivo, `launch.json`. É configuração
local de ferramenta de desenvolvimento, não código de aplicação e não mudança de
produto. Permanece não rastreado e não foi alterado nem removido.

Ignorados pelo `.gitignore` e portanto fora de qualquer classificação de
mudança: `.env.local`, `.next/`, `.vercel/`, `next-env.d.ts`, `node_modules/`.
Os diretórios `.agents/` e `.codex/` existem vazios no disco e por isso não
aparecem no Git.

## Último resultado confirmado

A documentação pública foi corrigida e publicada. O commit `a17690a`,
`docs: atualiza documentação pública do SOR ONE`, alinhou o `README` ao código
observável: identidade exclusivamente SOR ONE, Next.js 16, rotas reais,
`ADMIN_PASSWORD` e `ADMIN_SESSION_SECRET`, sem alegação de middleware e sem
badge de produção saudável. O commit `5c66057` registrou a adoção ao padrão
`ai/`.

A classificação desses commits está na seção **Commits documentais**; a baseline
técnica permanece `4235657`.

Nenhuma validação funcional, build, teste ou verificação de produção foi
executada. A saúde de produção permanece **não confirmada**.

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

Entre `README.md` e o código: **resolvidas em `a17690a`**.

Ficam como histórico do que foi corrigido, não como divergência aberta: versão
do Next declarada, rotas `/solucoes` e `/contato` inexistentes, variável
`ADMIN_SECRET` obsoleta, identidade com nome interno e posicionamento antigo,
alegação de middleware inexistente e página de contato sem rota. A busca atual
no `README` por cada um desses termos retorna zero ocorrências.

Entre `projetos/registro.md` e o código:

- O registro lista "adicionar card Lumière em /projetos" como pendência; o card
  existe em `src/app/(public)/projetos/page.tsx` e na vitrine da home.
- O registro lista "confirmar Instagram @soroneoficial antes de linkar"; o link
  já está publicado no rodapé.
- O registro lista "adicionar página do produto Atendimento Inteligente"; essa
  pendência se confirma.

O registro global vive no SOR OS e não é alterado a partir daqui. Corrigi-lo é
operação separada, do lado do SOR OS.

## Validações confirmadas

- 2026-07-19 — adoção por descoberta somente leitura: Git conferido com
  evidência remota atual, estrutura de rotas e API mapeada, stack confirmada por
  `package.json`, migrations Supabase listadas, nomes de variáveis de ambiente
  coletados sem leitura de valores.
- 2026-07-19 — reconciliação documental, commits `5c66057` e `a17690a`
  publicados: ausência de `middleware.ts` confirmada por índice do Git e por
  varredura do sistema de arquivos; `README` conferido termo a termo, com zero
  ocorrências de `SOR OS`, `freelancer`, `ADMIN_SECRET`, `Next.js 15`,
  `/solucoes`, `/contato` e `middleware`; ausência de `Atendimento Inteligente`
  em `src` reconfirmada; `HEAD` igual ao remoto por consulta ao vivo.

Nenhuma execução de teste, build, lint ou deploy ocorreu. Nenhuma URL de produção
foi acessada. A saúde de produção permanece não confirmada.

## Informações substituídas

- O `README` volta a ser fonte confiável de stack, rotas e posicionamento a
  partir de `a17690a`. A ressalva anterior, que o tratava como documento a
  corrigir, deixa de valer.
- As pendências do registro global relativas ao card Lumière e ao link do
  Instagram deixam de descrever o estado atual do código.
