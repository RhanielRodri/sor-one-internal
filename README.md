# SOR ONE

Site público e console operacional da SOR ONE, empresa de implantação de soluções digitais. O site apresenta a oferta, as implantações demonstrativas e o diagnóstico que qualifica o interessado. O console interno acompanha os leads captados.

## Páginas

| | URL |
|---|---|
| **Home** | https://sor-one-internal.vercel.app/ |
| **Implantações** | https://sor-one-internal.vercel.app/projetos |
| **Diagnóstico** | https://sor-one-internal.vercel.app/diagnostico |
| **Privacidade** | https://sor-one-internal.vercel.app/privacidade |
| **Console** | https://sor-one-internal.vercel.app/console |

## Funcionalidades

### Site público

- Home com contraste de problema, categorias de solução, níveis de implantação, metodologia, fluxo operacional e chamada final
- Página de implantações demonstrativas, com demos ao vivo e links para o código
- Diagnóstico em duas fases: a captura registra o contato antes da qualificação completa, de modo que um preenchimento interrompido ainda gera lead
- Página de privacidade
- Contato por WhatsApp, Instagram e e-mail no rodapé
- SEO técnico: metadata por rota, OpenGraph, `robots.txt` e `sitemap.xml` gerados dinamicamente

### Console operacional

- Login protegido por cookie de sessão
- Dashboard com visão geral de leads
- Lista de leads com status, observações e cadastro manual

## Tecnologias

**Frontend**
- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4, com sistema de componentes próprio
- Hospedagem na Vercel

**Backend / Dados**
- Supabase (PostgreSQL gerenciado), com migrations versionadas
- API Routes do Next.js
- Autenticação por cookie de sessão

**SEO**
- Metadata API do Next.js por rota
- `robots.ts` e `sitemap.ts` gerados dinamicamente
- OpenGraph para compartilhamento em redes sociais

## Screenshots

### Home — desktop
![Home desktop](docs/screenshots/home-desktop.png)

### Home — mobile
![Home mobile](docs/screenshots/home-mobile.png)

### Implantações
![Implantações](docs/screenshots/projetos-desktop.png)

### Diagnóstico
![Diagnóstico](docs/screenshots/diagnostico-desktop.png)

### Console — leads
![Console](docs/screenshots/console-desktop.png)

## Como rodar localmente

```bash
git clone https://github.com/RhanielRodri/sor-one-internal.git
cd sor-one-internal
npm install
```

Crie um `.env.local` com estas variáveis. O arquivo não é versionado e os valores ficam apenas no ambiente local ou no painel da Vercel.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

```bash
npm run dev
```

Abre em `http://localhost:3000`.

## O que este projeto demonstra

- **SEO técnico via Metadata API**: cada rota tem title, description e OpenGraph próprios; `sitemap.ts` e `robots.ts` gerados dinamicamente
- **App Router com route groups**: rotas públicas em `(public)` e console em `console/`, separados na estrutura
- **Captura de leads em duas fases**: o diagnóstico persiste o contato antes da qualificação completa, usando API Routes e Supabase, sem backend dedicado
- **Autenticação com cookie httpOnly**: console protegido por verificação em cada rota administrativa, sem biblioteca de auth
- **Acesso ao banco endurecido por migration**: RPC com `security definer`, grants de papel administrativo e revogação do insert anônimo em leads
- **TypeScript com `strict` ativo**: tipos definidos para serviços, leads e métricas

## Autor

Desenvolvido por Rhaniel Rodrigues.

GitHub: https://github.com/RhanielRodri
