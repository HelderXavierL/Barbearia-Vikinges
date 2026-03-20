# 🪓 Barbearia Vikings — Backend API

API REST completa para sistema de agendamento e gestão de barbearia.

## Stack

- **Node.js 20+** + **Express** + **TypeScript**
- **Prisma** ORM + **PostgreSQL** 15+
- **JWT** (access + refresh tokens) + **bcrypt**
- **Zod** para validação de dados
- **Docker** + **Docker Compose**

---

## Início Rápido

### 1. Pré-requisitos

- Node.js 20+
- Docker Desktop (para PostgreSQL)
- npm 10+

### 2. Configurar variáveis de ambiente

```bash
# Na raiz do monorepo
cp .env.example .env
```

Edite o `.env` conforme necessário (credenciais do banco, JWT secrets, etc.)

### 3. Subir o PostgreSQL

```bash
docker-compose up -d
```

### 4. Instalar dependências

```bash
# Na raiz do monorepo
npm install
```

### 5. Gerar o Prisma Client + rodar migration

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

### 6. Rodar o seed (dados iniciais)

```bash
npx tsx prisma/seed.ts
```

> Cria: 1 admin, 3 barbeiros, 5 serviços, disponibilidade semanal, 2 clientes, 3 produtos.

### 7. Iniciar o servidor

```bash
npm run dev
# ou da raiz: npm run dev:backend
```

> 🪓 API disponível em `http://localhost:3333`

---

## Estrutura de Pastas

```
backend/
├── prisma/
│   ├── schema.prisma       ← 10 entidades, enums, índices
│   └── seed.ts             ← Dados iniciais
│
├── src/
│   ├── server.ts           ← Entrypoint
│   ├── app.ts              ← Express + middlewares + rotas
│   │
│   ├── config/
│   │   ├── env.ts          ← Variáveis com validação Zod
│   │   └── database.ts     ← PrismaClient singleton
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts    ← JWT verify + role guard
│   │   ├── errorHandler.ts      ← Error handler global
│   │   ├── rateLimiter.ts       ← Rate limiting (geral + auth)
│   │   └── validateRequest.ts   ← Validação Zod (body + query)
│   │
│   ├── utils/
│   │   ├── apiResponse.ts  ← Helpers de resposta padronizada
│   │   └── timeSlots.ts    ← Gerador de slots de 35 min
│   │
│   └── modules/
│       ├── auth/            ← Login, refresh, /me
│       ├── barber/          ← CRUD barbeiros + associação serviços
│       ├── service/         ← CRUD catálogo de serviços
│       ├── availability/    ← Grade semanal + exceções + cálculo de slots
│       ├── booking/         ← Agendamento com bloqueio transacional
│       ├── client/          ← Clientes + busca + recorrência
│       ├── product/         ← Produtos + movimentação de estoque
│       └── notification/    ← Preparação WhatsApp (Strategy pattern)
│
├── Dockerfile
├── tsconfig.json
└── package.json
```

---

## Endpoints da API

### 🔓 Autenticação (`/api/auth`)
| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| POST | `/api/auth/login` | Login (retorna JWT) | Público |
| POST | `/api/auth/refresh` | Refresh token | Público |
| GET | `/api/auth/me` | Dados do logado | Auth |

### 🔧 Serviços (`/api/services`)
| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| GET | `/api/services` | Lista serviços | Público |
| GET | `/api/services/:id` | Detalhe | Público |
| POST | `/api/services` | Criar | Admin |
| PUT | `/api/services/:id` | Atualizar | Admin |
| DELETE | `/api/services/:id` | Desativar | Admin |

### 💈 Barbeiros (`/api/barbers`)
| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| GET | `/api/barbers` | Lista (filtro ?serviceId) | Público |
| GET | `/api/barbers/:id` | Detalhe | Público |
| POST | `/api/barbers` | Cadastrar | Admin |
| PUT | `/api/barbers/:id` | Atualizar | Admin/Barbeiro |
| DELETE | `/api/barbers/:id` | Desativar | Admin |

### 📅 Disponibilidade (`/api/availability`)
| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| GET | `/:barberId` | Grade semanal | Público |
| GET | `/:barberId/slots?date=YYYY-MM-DD` | Slots livres | Público |
| PUT | `/:barberId` | Atualizar grade | Auth |
| GET | `/:barberId/exceptions` | Exceções | Auth |
| POST | `/:barberId/exceptions` | Criar exceção | Auth |
| DELETE | `/exceptions/:id` | Remover exceção | Auth |

### 📋 Agendamentos (`/api/bookings`)
| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| POST | `/api/bookings` | Agendar | Público |
| GET | `/api/bookings` | Listar (filtros) | Auth |
| GET | `/api/bookings/:id` | Detalhe | Auth |
| PATCH | `/api/bookings/:id/status` | Alterar status | Auth |
| GET | `/api/bookings/barber/:barberId` | Agenda do dia | Auth |

### 👥 Clientes (`/api/clients`)
| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| GET | `/api/clients` | Listar (busca + filtros) | Auth |
| GET | `/api/clients/search?phone=x` | Buscar por telefone | Auth |
| GET | `/api/clients/:id` | Detalhe + histórico | Auth |
| PUT | `/api/clients/:id` | Atualizar | Admin |

### 📦 Produtos (`/api/products`)
| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| GET | `/api/products` | Listar | Admin |
| GET | `/api/products/low-stock` | Estoque baixo | Admin |
| GET | `/api/products/:id` | Detalhe | Admin |
| POST | `/api/products` | Criar | Admin |
| PUT | `/api/products/:id` | Atualizar | Admin |
| DELETE | `/api/products/:id` | Desativar | Admin |
| POST | `/api/products/:id/stock` | Movimentação | Admin |
| GET | `/api/products/:id/stock` | Histórico | Admin |

### 🔔 Notificações (`/api/notifications`)
| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| GET | `/api/notifications` | Listar | Admin |
| POST | `/api/notifications/process` | Processar pendentes | Admin |
| POST | `/api/notifications/webhook` | Webhook WhatsApp | Sistema |

---

## Regras de Negócio

- ⏱️ Duração padrão: **35 minutos** por atendimento
- 🔒 Bloqueio transacional de horários (sem conflitos)
- ❌ Cancelamento permitido até **2h antes** do horário
- 🔁 Cliente marcado como **recorrente** após 3+ visitas concluídas
- 📦 Estoque controlado por **movimentações** (nunca edição direta)
- 🔔 Notificações preparadas para **WhatsApp** via Strategy pattern

---

## Credenciais do Seed

| Usuário | Email | Senha | Role |
|---------|-------|-------|------|
| Admin Vikings | admin@vikinges.com | admin123 | ADMIN |
| Carlos Ragnar | carlos@vikinges.com | barber123 | BARBER |
| Thiago Bjorn | thiago@vikinges.com | barber123 | BARBER |
| Rafael Leif | rafael@vikinges.com | barber123 | BARBER |
