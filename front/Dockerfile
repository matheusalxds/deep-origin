# Etapa 1: Build
FROM node:alpine as BUILD_IMAGE

WORKDIR /app

# Definir argumentos para build
ARG API_URL
ARG NEXT_PUBLIC_API_URL

# Definir variáveis de ambiente no build
ENV API_URL=${API_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Copiar pacotes
COPY package.json yarn.lock ./

# Instalar dependências
RUN yarn install --frozen-lockfile --ignore-engines

# Copiar o restante do código
COPY . .

# Construir o Next.js
RUN yarn build

# Remover dependências de desenvolvimento
RUN npm prune --production

# Etapa 2: Runtime
FROM node:alpine

WORKDIR /app

# Copiar arquivos necessários do build
COPY --from=BUILD_IMAGE /app/package.json ./package.json
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public

# Definir variáveis para o container final
ENV API_URL=${API_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

EXPOSE 3000

CMD ["yarn", "start"]
