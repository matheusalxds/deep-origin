# --- Stage 1: Build Dependencies ---
FROM node:23-alpine AS deps

WORKDIR /app

# Instala dependências e ferramentas de build
COPY package*.json ./
RUN npm install --production=false

# --- Stage 2: Build Application ---
FROM node:23-alpine AS builder

WORKDIR /app

# Copia as dependências instaladas na Stage 1
COPY --from=deps /app/node_modules ./node_modules
COPY . .

## Copia o arquivo .env
#COPY .env ./.env

# Compila o projeto NestJS
RUN npm run build

# --- Stage 3: Production Image ---
FROM node:23-alpine AS production

WORKDIR /app

# Copia os arquivos necessários da Stage 2
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
#COPY --from=builder /app/.env ./.env

# Expõe a porta que sua aplicação NestJS utiliza
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["node", "dist/src/main.js"]
