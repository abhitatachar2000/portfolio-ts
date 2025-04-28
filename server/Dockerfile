FROM node:22.7.0 AS builder

WORKDIR /server

COPY package.json package-lock.json ./
COPY tsconfig.json ./

RUN npm install
RUN npm install -D @types/winston winston typescript ts-node

COPY ./ ./

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]