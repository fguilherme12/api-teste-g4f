# Stage 1: Dependencies
FROM node:22-alpine AS deps
WORKDIR /app

# Copia apenas os arquivos de dependências
COPY package.json package-lock.json ./

# Instala dependências de produção
RUN npm ci --only=production && \
    npm cache clean --force

# Stage 2: Builder
FROM node:22-alpine AS builder
WORKDIR /app

# Copia arquivos de dependências
COPY package.json package-lock.json ./

# Copia o schema do Prisma antes de instalar (necessário para postinstall)
COPY src/database/schema.prisma ./src/database/schema.prisma

# Instala todas as dependências (incluindo devDependencies para build)
# O postinstall vai gerar o Prisma Client
RUN npm ci

# Copia o resto do código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Stage 3: Runner
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Instala apenas runtime necessário
RUN apk add --no-cache libc6-compat

# Cria usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Copia arquivos necessários do builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/src/database/schema.prisma ./src/database/schema.prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Ajusta permissões
RUN chown -R nestjs:nodejs /app

USER nestjs

EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]

