# Teste G4F Backend

API desenvolvida em NestJS para gerenciar notícias (CRUD) e autenticação de usuários, utilizando PostgreSQL como banco de dados.

## Descrição

Backend RESTful desenvolvido com NestJS que oferece:
- Gerenciamento de notícias (CRUD completo)
- Autenticação de usuários (login e registro)
- Gerenciamento de usuários (CRUD)
- Documentação interativa com Swagger
- Integração com PostgreSQL via Prisma ORM

## Stack Tecnológica

- **NestJS 10** - Framework Node.js
- **TypeScript** - Linguagem de programação
- **PostgreSQL 15** - Banco de dados relacional
- **Prisma** - ORM para TypeScript
- **JWT** - Autenticação baseada em tokens
- **Swagger** - Documentação da API
- **Jest** - Framework de testes
- **Docker** - Containerização

## Pré-requisitos

- **Node.js** 22 ou superior
- **NPM** ou **Yarn**
- **Docker** e **Docker Compose** (para execução via container)
- **PostgreSQL** (opcional, se não usar Docker)

## Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd teste-g4f
```

2. Instale as dependências:
```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```bash
DATABASE_URL=postgresql://testeg4f:testeg4f@localhost:5434/testeg4f
JWT_SECRET=your-secret-key-change-in-production
```

**Variáveis de ambiente:**
- `DATABASE_URL` - URL de conexão com PostgreSQL
- `JWT_SECRET` - Chave secreta para assinatura de tokens JWT

## Execução Local

### 1. Subir o Banco de Dados

Execute o PostgreSQL com Docker Compose:

```bash
docker compose up -d database
```

### 2. Configurar o Banco de Dados

Execute as migrações do Prisma:

```bash
npm run db:push
```

Ou execute as migrações:

```bash
npm run prisma:deploy
```

### 3. Executar a Aplicação

**Desenvolvimento:**
```bash
npm run start:dev
```

**Produção:**
```bash
npm run build
npm run start:prod
```

A API estará disponível em: **http://localhost:3000**

**Documentação Swagger:** http://localhost:3000/api/docs

## Execução com Docker

```bash
docker compose up -d
```

A API estará disponível em: **http://localhost:3000**

**Documentação Swagger:** http://localhost:3000/api/docs

Para parar os containers:
```bash
docker compose down
```

## Testes

### Testes Unitários

```bash
npm run test
```

### Testes com Watch Mode

```bash
npm run test:watch
```

### Testes com Coverage

```bash
npm run test:cov
```

### Testes End-to-End (E2E)

```bash
npm run test:e2e
```

Os testes E2E estão localizados em: `test/`

## Estrutura de Pastas

```
teste-g4f/
├── src/
│   ├── common/                    # Recursos compartilhados
│   │   ├── configs/               # Configurações (CORS, Swagger)
│   │   ├── core/                  # Base repositories, DTOs
│   │   │   ├── dtos/              # DTOs base (pagination, etc)
│   │   │   └── repositories/       # Interfaces e implementações base
│   │   ├── filters/               # Exception filters
│   │   ├── guards/                # Auth guards (JWT)
│   │   └── strategy/              # Passport strategies (JWT)
│   │
│   ├── database/                  # Configuração do Prisma
│   │   ├── core/                  # PrismaService
│   │   └── schema.prisma          # Schema do banco de dados
│   │
│   ├── modules/                   # Módulos de negócio
│   │   ├── auth/                   # Módulo de autenticação
│   │   │   ├── controllers/       # AuthController
│   │   │   ├── dtos/              # DTOs de autenticação
│   │   │   └── services/          # Serviços (login, get-current-user)
│   │   │       └── auth/
│   │   │           ├── login/
│   │   │           └── get-current-user/
│   │   │
│   │   ├── user/                   # Módulo de usuários
│   │   │   ├── controllers/      # UserController
│   │   │   ├── dtos/              # DTOs de usuário
│   │   │   ├── repositories/      # UserRepository
│   │   │   ├── services/          # Serviços (CRUD)
│   │   │   │   └── user/
│   │   │   │       ├── register/
│   │   │   │       ├── list/
│   │   │   │       ├── get-by-id/
│   │   │   │       ├── update/
│   │   │   │       └── delete/
│   │   │   └── types/             # Tipos TypeScript
│   │   │
│   │   └── news/                   # Módulo de notícias
│   │       ├── controllers/       # NewsController
│   │       ├── dtos/              # DTOs de notícias
│   │       ├── repositories/      # NewsRepository
│   │       ├── services/          # Serviços (CRUD)
│   │       │   └── news/
│   │       │       ├── create/
│   │       │       ├── list/
│   │       │       ├── get-by-id/
│   │       │       ├── update/
│   │       │       └── delete/
│   │       └── types/             # Tipos TypeScript
│   │
│   ├── app.module.ts               # Módulo principal
│   └── main.ts                     # Bootstrap da aplicação
│
├── test/                           # Testes E2E
│   └── *.e2e-spec.ts
│
├── Dockerfile                      # Dockerfile multi-stage
├── docker-compose.yml              # Orquestração Docker
└── .dockerignore                   # Arquivos ignorados no build
```

### Justificativa da Estrutura

**Organização Modular:**
- Cada módulo (`auth`, `user`, `news`) é isolado e independente
- Facilita manutenção, testes e escalabilidade
- Permite adicionar novos módulos sem impacto nos existentes

**Separação de Responsabilidades:**
- **Controllers**: Apenas recebem requisições HTTP e delegam para services
- **Services**: Contêm a lógica de negócio
- **Repositories**: Abstraem acesso ao banco de dados
- **DTOs**: Validam e tipam dados de entrada/saída

**Padrão por Funcionalidade (Feature-based):**
- Cada serviço está em sua própria pasta (ex: `create/`, `update/`)
- Cada serviço tem sua interface e implementação separadas
- Facilita localização e manutenção de código

**Common Module:**
- Recursos compartilhados (guards, filters, configs)
- Evita duplicação de código
- Facilita reutilização

**Database Module:**
- Centraliza configuração do Prisma
- Facilita migrações e gerenciamento do schema

### Preparação para Escalar

**Arquitetura Modular:**
- Módulos independentes permitem escalar funcionalidades separadamente
- Fácil adicionar novos módulos sem refatoração

**Repository Pattern:**
- Abstração do banco de dados facilita migração para outros SGBDs
- Permite implementar cache, múltiplos bancos, etc.

**Service Layer:**
- Lógica de negócio isolada facilita testes unitários
- Permite reutilização em diferentes contextos (API, CLI, etc.)

**DTOs e Validação:**
- Validação centralizada com class-validator
- Tipagem forte com TypeScript
- Facilita evolução da API sem quebrar compatibilidade

**Estrutura de Testes:**
- Testes E2E organizados por módulo
- Facilita adicionar testes para novos recursos

**Docker e Containerização:**
- Facilita deploy em diferentes ambientes
- Permite escalar horizontalmente com orquestradores (Kubernetes)

## Padrões de Código

### ESLint

O projeto utiliza **ESLint** com configuração customizada:

```bash
npm run lint
```

**Configuração:**
- Base: `@typescript-eslint/parser` e `@typescript-eslint/eslint-plugin`
- Integração com Prettier
- Regras específicas para NestJS

### Prettier

Formatação automática de código:

```bash
npm run format
```

**Configuração:**
- 2 espaços para indentação
- Aspas simples
- Ponto e vírgula obrigatório
- Quebra de linha automática

### TypeScript

- **Strict mode** habilitado
- Tipagem forte em todos os arquivos
- Interfaces e types definidos em cada módulo
- Sem `any` explícito

### Convenções de Nomenclatura

- **Controllers**: PascalCase com sufixo `Controller` (`AuthController`)
- **Services**: PascalCase com sufixo `Service` (`LoginService`)
- **Repositories**: PascalCase com sufixo `Repository` (`UserRepository`)
- **DTOs**: PascalCase com sufixo `Dto` (`LoginRequestDto`)
- **Interfaces**: PascalCase com prefixo `I` ou sufixo `Interface` (`LoginInterface`)
- **Módulos**: PascalCase com sufixo `Module` (`AuthModule`)
- **Arquivos**: kebab-case (`login.service.ts`, `auth.controller.ts`)

### Estrutura de Services

Cada serviço segue o padrão:

```
service-name/
├── service-name.interface.ts    # Interface do serviço
└── service-name.service.ts      # Implementação
```

## Endpoints Disponíveis

### Autenticação (`/auth`)

- `POST /auth/login` - Login de usuário
  - Body: `{ email: string, password: string }`
  - Retorna: JWT token

- `GET /auth/me` - Obter usuário atual (requer autenticação)
  - Headers: `Authorization: Bearer {token}`

### Usuários (`/users`)

- `POST /users` - Criar usuário
- `GET /users` - Listar usuários
- `GET /users/:id` - Buscar usuário por ID
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

### Notícias (`/news`)

- `POST /news` - Criar notícia
- `GET /news` - Listar todas as notícias
- `GET /news/:id` - Buscar notícia por ID
- `PUT /news/:id` - Atualizar notícia
- `DELETE /news/:id` - Deletar notícia

## Documentação da API

A documentação interativa está disponível via Swagger:

**URL:** http://localhost:3000/api/docs

- Teste endpoints diretamente no navegador
- Veja schemas de request/response
- Autenticação JWT integrada

## Scripts Disponíveis

```bash
npm run build              # Build de produção
npm run start              # Iniciar em modo produção
npm run start:dev          # Iniciar em modo desenvolvimento (watch)
npm run start:debug        # Iniciar em modo debug
npm run start:prod         # Iniciar build de produção
npm run lint               # Executar ESLint
npm run format             # Formatar código com Prettier
npm run test               # Executar testes unitários
npm run test:watch         # Executar testes em watch mode
npm run test:cov           # Executar testes com coverage
npm run test:e2e           # Executar testes E2E
npm run prisma:migrate     # Criar nova migração
npm run prisma:deploy      # Aplicar migrações
npm run db:push            # Sincronizar schema com banco
npm run generate           # Gerar Prisma Client
```

## Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `DATABASE_URL` | URL de conexão PostgreSQL | - |
| `JWT_SECRET` | Chave secreta para JWT | - |
| `NODE_ENV` | Ambiente (development/production) | `production` |
| `PORT` | Porta da aplicação | `3000` |

## Troubleshooting

### Erro de conexão com banco de dados
- Verifique se o PostgreSQL está rodando: `docker compose ps`
- Confirme a `DATABASE_URL` no `.env`

### Porta 3000 já em uso
- Altere a porta no `docker-compose.yml`: `3001:3000`
