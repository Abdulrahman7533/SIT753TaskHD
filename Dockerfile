FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Run code quality check
RUN npx eslint index.js || true

# Run security scan
RUN npm audit --audit-level=low || true

# Run tests
RUN npm test --ci || true

CMD ["node", "index.js"]
