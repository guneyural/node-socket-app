FROM node:16.20.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4000

EXPOSE 4000

CMD ["node", "src/index.js"]