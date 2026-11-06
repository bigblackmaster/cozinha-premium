# 🏠 Lar, doce, lar

E-commerce de comida caseira — *"Sabor de casa na sua mesa"*.

## Stack
- **Frontend:** React 18 + TypeScript + Vite 5 + Tailwind CSS v4 + React Router v6 + Zustand
- **Backend:** Netlify Functions (TypeScript)
- **Banco:** Neon (PostgreSQL) + Drizzle ORM
- **Auth admin:** JWT em cookie httpOnly
- **Deploy:** Netlify

## Estrutura de pastas
```
db/                    schema Drizzle (6 tabelas) e conexão Neon
netlify/functions/     auth, products, combos, orders (+ _utils)
public/                sitemap.xml, robots.txt
src/
  config/site.ts       nome, logo e descrição da loja (troque aqui!)
  types/               interfaces TypeScript
  lib/                 cliente da API e dados mockados
  store/cartStore.ts   carrinho (Zustand + localStorage)
  components/          layout (Header, Footer) e ui (Button, Card, Badge, Input)
  pages/               Home, Products, Combos, NotFound, admin/Login
  index.css            Tailwind v4 + paleta terracota
```

## Como rodar localmente
```bash
npm install
cp .env.example .env   # preencha os valores
npm run dev            # apenas frontend (Vite)
# ou, com as functions:
npx netlify dev
```

## Variáveis de ambiente
| Variável | Descrição |
|---|---|
| `DATABASE_URL` | String de conexão do Neon |
| `JWT_SECRET` | Chave secreta (mín. 32 caracteres) |
| `JWT_EXPIRES_IN` | Validade do token (ex.: `7d`) |
| `ADMIN_EMAIL` | E-mail do administrador |
| `VITE_API_BASE_URL` | Base da API no frontend (padrão `/api`) |

## Banco de dados
```bash
npm run db:push      # aplica o schema no Neon (drizzle-kit push)
npm run db:studio    # interface visual
```
Tabelas: `admins`, `products`, `combos`, `orders`, `shipping_rules`, `site_settings`.

## Deploy no Netlify
1. Conecte o repositório no Netlify (build `npm run build`, publish `dist` — já definidos no `netlify.toml`).
2. Configure as variáveis de ambiente no painel.
3. As rotas `/api/*` são redirecionadas para `/.netlify/functions/*`.

## Personalização
- **Nome/logo:** edite `src/config/site.ts` (`logo` aceita emoji ou caminho de imagem, ex.: `/logo.svg`).
- **Cores:** edite as variáveis `--color-*` em `src/index.css`.

## Notas de desenvolvimento
- Conteúdos marcados com **[Demonstrativo]** usam dados mockados (`src/lib/mockData.ts`) enquanto a API não está configurada.
- O painel `/admin` ainda é um placeholder; o login já chama `/api/auth/login`.
- Admins devem ser criados no banco com senha em hash bcrypt.
