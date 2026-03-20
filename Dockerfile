# syntax=docker/dockerfile:1

FROM node:20-alpine

WORKDIR /app

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Vite padrão
EXPOSE 5173

# Acessível para o Traefik (fora do container)
CMD ["pnpm", "server"]

