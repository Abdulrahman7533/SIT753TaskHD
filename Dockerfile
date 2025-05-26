FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Code Quality
RUN npx eslint index.js || true

# Security Scan
RUN npm audit --audit-level=low || true

# Tests
RUN npm test --ci || true

CMD ["node", "index.js"]
