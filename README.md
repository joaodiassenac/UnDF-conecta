# Open Campus

Plataforma web desenvolvida para a **Universidade do Distrito Federal Jorge Amaury (UnDF)**, com o objetivo de melhorar a comunicação entre a instituição e a comunidade acadêmica, promovendo transparência, participação e avaliação institucional.

> O projeto nasceu com o nome **UNDF Conecta** e foi renomeado/reescopado para **Open Campus** a partir de um Plano de Escopo enxuto (originalmente pensado para um hackathon de 3 dias). Esse Plano de Escopo é a referência oficial de funcionalidades — não o briefing original mais amplo.

---

## Índice

- [Status atual do projeto](#status-atual-do-projeto)
- [Módulos](#módulos)
- [Tecnologias](#tecnologias)
- [Pré-requisitos (softwares a instalar)](#pré-requisitos-softwares-a-instalar)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Como rodar o projeto](#como-rodar-o-projeto)
  - [1. Clonar o repositório](#1-clonar-o-repositório)
  - [2. Frontend](#2-frontend)
  - [3. Backend](#3-backend)
  - [4. Banco de dados (Prisma)](#4-banco-de-dados-prisma)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Scripts disponíveis](#scripts-disponíveis)
- [Padrões de código](#padrões-de-código)
- [Branches](#branches)
- [Observações e débito técnico](#observações-e-débito-técnico)
- [Roadmap](#roadmap)

---

## Status atual do projeto

- ✅ **Frontend**: em desenvolvimento ativo. Telas de Home, Fórum e Avaliação Institucional já consomem endpoints reais via Axios. Calendário tem apenas parte da UI implementada.
- ⚠️ **Backend**: existe uma base de código (rotas, controllers, services e schema Prisma) cobrindo Calendário, Fórum, Avaliação e Enquetes, mas o time trata isso como **ainda não validado/estabilizado** — trate como código em desenvolvimento, não como API estável.
- ❌ **Autenticação**: não implementada por decisão deliberada do time. O usuário atual é mockado (ex.: "Ana Silva Santos") diretamente nos componentes. Não implemente login, JWT, sessão ou route guards sem alinhamento prévio.
- ❌ **Gamificação**: removida do escopo oficial (Open Campus). Não reintroduzir XP, níveis, medalhas ou ranking na Avaliação Institucional sem validar com o time.

## Módulos

### 1. Fórum
Espaço onde estudantes publicam sugestões, reclamações e propostas.

- Busca por texto/tags
- Criação de nova publicação
- Filtro por categoria em abas
- Listagem com autor, tempo relativo, título, descrição, tag de categoria, tag de status, curtidas e comentários

> ⚠️ **Divergência conhecida**: as categorias implementadas hoje são *Todas, Infraestrutura, Ensino, RU, Tecnologia, Eventos*. O briefing original previa também *Biblioteca* e *Outros*, e usava "Restaurante Universitário" por extenso em vez de "RU". Ainda não validado com o time — considerar isso ao alterar o schema de categorias.

### 2. Calendário
Permite acompanhar eventos, prazos e datas institucionais.

- Planejado: calendário mensal/semanal/diário, categorias de evento (Acadêmico, Administrativo, Auditórios, Eventos, Palestras), confirmação de presença, filtros por categoria, abas de Editais e Oportunidades.
- Implementado até o momento: grid de calendário (mês/semana/dia), listagem de próximos eventos, formulário de solicitação de auditório, filtro por categoria via checkboxes.

### 3. Avaliação Institucional
Sistema de avaliação de disciplinas/professores.

- Navegação lateral: Avaliações pendentes / Minhas avaliações / Enquetes
- Avaliação por estrelas (1 a 5) + comentário opcional
- Indicador de participação (%) com barra de progresso
- Aviso de transparência: respostas individuais são confidenciais, só médias agregadas são divulgadas
- **Sem gamificação** (ver aviso acima)

---

## Tecnologias

### Frontend
| Tecnologia | Versão (aprox.) | Uso |
|---|---|---|
| Vue 3 | ^3.5 | Framework (Composition API + `<script setup>`, obrigatório) |
| Vite | ^8 | Build tool / dev server |
| TypeScript | ~5.9 | Tipagem estática |
| Vuetify | ^4.0 | Biblioteca de componentes UI (não usar Bootstrap) |
| Vue Router | ^4.6 | Roteamento |
| Axios | ^1.19 | Cliente HTTP (sempre via `src/services/*.ts`) |
| Sass Embedded | ^1.98 | Pré-processador CSS |

> Observação: o `README`/plano cita **Pinia** para gerenciamento de estado, mas nos arquivos atuais o estado de UI compartilhado (ex.: sidebar) está em um módulo simples com `ref()` (`stores/sidebar.ts`), sem Pinia instalado no `package.json`. Ao introduzir Pinia, adicionar a dependência formalmente.

### Backend
| Tecnologia | Versão (aprox.) | Uso |
|---|---|---|
| Node.js + Express | ^5.2 | Servidor HTTP / API REST |
| TypeScript | ^7 (via `tsx`/`ts-node`) | Tipagem estática |
| Prisma | ^7.9 | ORM |
| @prisma/adapter-mariadb | ^7.9 | Driver adapter do Prisma para MariaDB/MySQL |
| cors | ^2.8 | Middleware de CORS |
| dotenv | ^17 | Variáveis de ambiente |

### Banco de dados
- **MySQL / MariaDB** (o `schema.prisma` declara `provider = "mysql"`, mas a aplicação usa o adapter `@prisma/adapter-mariadb`, portanto um servidor **MariaDB** é o cenário testado/recomendado).

### Controle de versão
- Git + GitHub

---

## Pré-requisitos (softwares a instalar)

Antes de clonar o projeto, instale:

1. **Node.js** — versão **20.19+** ou **22.12+** (exigido pelo Vite 8 e pelo `@prisma/client`). Recomenda-se usar a LTS mais recente disponível.
   - Verifique com: `node -v`
2. **npm** — instalado junto com o Node.js. O projeto usa `npm` como gerenciador de pacotes (não usar `yarn` ou `pnpm`, conforme `AGENTS.md`).
   - Verifique com: `npm -v`
3. **MySQL** ou **MariaDB** (servidor local ou em container) — versão 8.x (MySQL) ou 10.x+ (MariaDB) recomendada.
4. **Git**
5. (Opcional, mas recomendado) **Docker** — caso prefira subir o banco de dados via container em vez de instalar localmente.

---

## Estrutura de pastas

```
open-campus/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/        # AppHeader, AppFooter, AppSidebar
│   │   │   ├── home/          # HomeHero, ModuleCard
│   │   │   ├── calendario/
│   │   │   ├── forum/
│   │   │   └── avaliacao/
│   │   ├── layouts/
│   │   │   ├── loginLayout.vue
│   │   │   └── mainLayout.vue
│   │   ├── router/
│   │   ├── services/           # api.ts, agenda.ts, forum.ts, avaliacao.ts
│   │   ├── stores/
│   │   ├── styles/
│   │   ├── views/
│   │   │   ├── home.vue
│   │   │   ├── forum.vue
│   │   │   ├── calendario.vue
│   │   │   └── avaliacao.vue
│   │   ├── plugins/
│   │   │   └── vuetify.ts
│   │   ├── App.vue
│   │   └── main.ts
│   ├── index.html
│   ├── vite.config.mts
│   ├── package.json
│   └── tsconfig*.json
│
├── backend/  (código em desenvolvimento — ver "Observações e débito técnico")
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts     # instância do Prisma Client
│   │   ├── routes/              # só declara URL → controller
│   │   ├── controllers/         # traduz HTTP ↔ aplicação
│   │   ├── services/            # regra de negócio pura
│   │   ├── middlewares/
│   │   │   ├── errorHandler.ts
│   │   │   └── notFoundHandler.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/<org-ou-usuario>/open-campus.git
cd open-campus
git checkout dev
# ou, para trabalhar na branch de desenvolvimento pessoal:
git checkout joao
```

> O time usa as branches **`dev`** (integração) e **`joao`** como base de trabalho atual. Sempre parta de uma dessas ao criar uma nova branch de feature.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Isso sobe o servidor de desenvolvimento do Vite (por padrão em `http://localhost:3000`, conforme configurado em `vite.config.mts`).

Outros comandos úteis:

```bash
npm run type-check   # roda vue-tsc para checagem de tipos
npm run build         # type-check + build de produção (saída em dist/)
npm run preview       # serve o build de produção localmente
```

### 3. Backend

```bash
cd backend
npm install
```

Configure o arquivo `.env` (veja [Variáveis de ambiente](#variáveis-de-ambiente)) antes de continuar.

```bash
npm run dev     # inicia com tsx watch (hot reload) em src/server.ts
```

Por padrão, o servidor sobe na porta definida em `PORT` (ex.: `4000`).

Outros comandos:

```bash
npm run build   # compila TypeScript para dist/
npm start        # roda a versão compilada (node dist/server.js)
```

### 4. Banco de dados (Prisma)

Com o `.env` configurado e um servidor MySQL/MariaDB acessível:

```bash
cd backend

# Gera o Prisma Client a partir do schema
npx prisma generate

# Cria/atualiza as tabelas no banco conforme o schema.prisma
npx prisma migrate dev --name init

# (Opcional) Popula o banco com dados de exemplo
npx prisma db seed
```

O comando de seed está configurado em `package.json`:

```json
"prisma": {
  "seed": "ts-node -P prisma/tsconfig.json prisma/seed.ts"
}
```

O script `prisma/seed.ts` cria dados de exemplo para Calendário, Fórum, Avaliação Institucional e Enquetes — útil para testar o frontend sem precisar cadastrar tudo manualmente.

---

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do `backend/` (existe um `.env.example` como referência):

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/open_campus"
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=usuario
DB_PASSWORD=senha
DB_NAME=open_campus

PORT=4000
```

| Variável | Descrição |
|---|---|
| `DATABASE_URL` | String de conexão usada pelo Prisma |
| `DB_CONNECTION` | Driver do banco (`mysql`) |
| `DB_HOST` / `DB_PORT` | Host e porta do servidor de banco |
| `DB_USER` / `DB_PASSWORD` | Credenciais do banco |
| `DB_NAME` | Nome do schema/banco (`open_campus`) |
| `PORT` | Porta em que a API Express escuta |

> **Nunca** commitar o `.env` real — ele já está listado no `.gitignore`. Use sempre `.env.example` como referência para novos ambientes.

---

## Scripts disponíveis

### Frontend (`frontend/package.json`)
| Script | Descrição |
|---|---|
| `npm run dev` | Sobe o servidor de desenvolvimento (Vite) |
| `npm run build` | Roda type-check e gera build de produção |
| `npm run build-only` | Gera build de produção sem type-check |
| `npm run preview` | Serve o build de produção localmente |
| `npm run type-check` | Roda `vue-tsc --build --force` |

### Backend (`backend/package.json`)
| Script | Descrição |
|---|---|
| `npm run dev` | Sobe o servidor com hot reload (`tsx watch src/server.ts`) |
| `npm run build` | Compila TypeScript para `dist/` |
| `npm start` | Roda a versão compilada |

---

## Padrões de código

Sempre utilizar:

- **Composition API** + `<script setup lang="ts">` (nunca Options API)
- Props tipadas via `interface` + `defineProps<Props>()`
- Componentização — extrair componente quando o template se repete ou passa de ~50 linhas
- CSS sempre em `<style scoped>`, nunca inline solto
- Design responsivo
- **Vuetify** para UI (não misturar com Bootstrap)
- Chamadas HTTP **sempre** através de `src/services/*.ts` — nunca `axios` direto dentro de um componente
- Cores do tema via `rgb(var(--v-theme-*))` — nunca hex hardcoded em componente

No backend:

- **Rotas** só declaram `URL → controller`, sem lógica de negócio
- **Controllers** traduzem HTTP ↔ aplicação (parseiam `req`, chamam o service, formatam `res`)
- **Services** contêm a regra de negócio pura, sem conhecer `req`/`res`
- Erros tratados de forma centralizada em `middlewares/errorHandler.ts`

---

## Branches

- **`dev`** — branch de integração principal
- **`joao`** — branch de desenvolvimento em uso atual pelo time

Ao abrir uma branch de feature, parta de `dev` (ou de `joao`, se for uma continuação direta de trabalho em andamento) e abra PR de volta para `dev`.

---

## Observações e débito técnico

- **Dois "backends" coexistem no histórico do repositório**: um scaffold gerado por `express-generator` (Jade + `app.js` + `routes/index.js`/`users.js`, sem relação com o domínio do projeto) e a implementação real do domínio (`app.ts`/`server.ts` + `src/routes|controllers|services` + Prisma). **Confirme com o time qual estrutura deve permanecer** antes de continuar desenvolvendo — o scaffold do express-generator provavelmente é resíduo de setup inicial e candidato à remoção.
- **Headers inconsistentes**: existem hoje 3 padrões de header diferentes entre telas (`AppHeader.vue` na Home, um padrão "Open Campus | \<Módulo\>" usado no Fórum e na Avaliação ainda não extraído em componente, e um cabeçalho específico no Calendário). Decisão do time: manter como está por ora, mas revisitar antes de escalar o design system.
- **Categorias do Fórum**: ver divergência descrita na seção [Módulos](#módulos) — decidir com o time antes de fixar o schema definitivo de categorias.
- **Pinia**: citado no plano de arquitetura, mas ainda não presente como dependência formal do frontend.
- **Autenticação**: propositalmente adiada. Usuário atual é mockado nos componentes (ex.: `"Ana Silva Santos"` em `AppHeader.vue`).

---

## Roadmap

- [ ] Validar e estabilizar os endpoints do backend (Calendário, Fórum, Avaliação, Enquetes)
- [ ] Resolver divergência de categorias do Fórum
- [ ] Concluir a tela de Calendário (abas de Editais/Oportunidades, confirmação de presença)
- [ ] Unificar o padrão de header entre módulos
- [ ] Introduzir autenticação (login, sessão/JWT, guards de rota) — **somente após alinhamento com o time**
- [ ] Avaliar necessidade real de Pinia ou manter estado local simples

---

**Universidade do Distrito Federal (UnDF)** — Projeto desenvolvido por três estudantes para o Hackathon de 2026.
