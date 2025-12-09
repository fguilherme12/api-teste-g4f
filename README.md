# Teste G4F

Backend em NestJS com PostgreSQL.

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```bash
DATABASE_URL=postgresql://testeg4f:testeg4f@localhost:5434/testeg4f
JWT_SECRET=your-secret-key
```

## Banco de Dados

Suba o PostgreSQL com Docker:

```bash
docker-compose up -d
```

Execute a sincronização do banco:

```bash
npm run db:push
```

## Executar

```bash
npm run start:dev
```

## API Documentation

Acesse a documentação Swagger em: http://localhost:3000/api/docs

## Endpoints

### Users

- `POST /users` - Criar usuário
- `GET /users` - Listar usuários
- `GET /users/:id` - Buscar usuário por ID
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

## Estrutura

```
src/
├── common/           # Recursos compartilhados
│   ├── configs/      # Configurações
│   ├── core/         # Base repositories, DTOs
│   ├── filters/      # Exception filters
│   ├── guards/       # Auth guards
│   └── strategy/     # JWT strategy
├── database/         # Prisma configuration
├── modules/          # Módulos de negócio
│   └── user/         # Módulo de usuário
│       ├── controllers/
│       ├── dtos/
│       ├── repositories/
│       ├── services/
│       └── types/
├── app.module.ts     # Módulo principal
└── main.ts           # Bootstrap
```

