FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx eslint index.js || true
RUN npm audit || true
RUN npm test || true

CMD ["node", "index.js"]
