# --- Estágio de Build ---
FROM node:20-slim AS build 
WORKDIR /app

# Copia apenas arquivos necessários para instalar dependências
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copia todo o projeto (inclusive o .env)
COPY . .

# Gera o build usando o .env
RUN npm run build

# --- Estágio Final ---
FROM nginx:alpine
# Copia o conteúdo gerado pelo estágio 'build'
COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]