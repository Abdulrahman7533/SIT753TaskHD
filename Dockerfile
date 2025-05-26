FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx eslint index.js || true
RUN npm audit --audit-level=low || true
RUN npm test --ci || true

EXPOSE 3000

CMD ["node", "index.js"]
