# Barbearia Vikings — Frontend

Interface premium do sistema Barbearia Vikings, construída com React + Vite + TailwindCSS.

## Stack

| Tecnologia | Uso |
|------------|-----|
| React 19 | UI components |
| Vite 8 | Bundler |
| TypeScript | Tipagem |
| TailwindCSS 3 | Estilização |
| React Router 7 | Navegação |
| React Query | Cache & fetch (preparado) |
| Axios | HTTP client (preparado) |
| Lucide React | Ícones |
| date-fns | Manipulação de datas |

## Estrutura de Pastas

```
src/
├── assets/           Logo e imagens
├── components/
│   ├── ui/           Componentes base (Button, Input, Card, Modal, Badge, Spinner)
│   ├── layout/       Navbar, Footer, Section, Container
│   ├── booking/      StepIndicator (fluxo de agendamento)
│   └── common/       SectionTitle
├── config/           Axios API client
├── data/             Dados mockados (services, barbers, products, faq, navigation)
├── hooks/            useScrollTo, useInView
├── pages/
│   ├── HomePage.tsx   Landing page completa
│   ├── BookingPage.tsx Fluxo de agendamento (4 passos)
│   ├── LoginPage.tsx   Login admin/barbeiro
│   └── admin/         Dashboard, Agenda, Serviços, Produtos
├── sections/         Hero, Services, Barbers, Benefits, Products, FAQ, Contact
├── services/         Camada de serviços API (auth, booking, barber, service)
└── styles/           globals.css (design system)
```

## Rotas

| Rota | Página | Acesso |
|------|--------|--------|
| `/` | Landing page | Público |
| `/agendar` | Agendamento (4 steps) | Público |
| `/login` | Login admin | Público |
| `/admin` | Dashboard | Admin |
| `/admin/agenda` | Agenda do dia | Admin |
| `/admin/servicos` | Gerenciar serviços | Admin |
| `/admin/produtos` | Gerenciar produtos | Admin |

## Paleta de Cores

| Token | Hex | Uso |
|-------|-----|-----|
| `brand-500` | `#C9A96E` | CTA, destaques, títulos |
| `brand-600` | `#A67C52` | Hover |
| `dark` | `#0A0A0F` | Background principal |
| `panel` | `#121218` | Cards e painéis |
| `elevated` | `#1A1A24` | Modais, hover |

## Tipografia

- **Cinzel** (serif) → headings, títulos de seção, preços
- **Outfit** (sans) → corpo, labels, buttons

## Comandos

```bash
# Instalar dependências
npm install

# Iniciar desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview da build
npm run preview
```

## Integração com API

A camada de serviços em `src/services/` está preparada para consumir o backend quando integrado.
Atualmente, os dados são mockados em `src/data/`.

Para conectar ao backend, configure o proxy no `vite.config.ts`:

```ts
server: {
  proxy: {
    '/api': 'http://localhost:3000',
  },
}
```

## Credenciais de Teste (backend)

| Campo | Valor |
|-------|-------|
| Email | `admin@vikinges.com` |
| Senha | `admin123` |
