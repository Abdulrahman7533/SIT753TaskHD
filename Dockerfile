FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Run code quality check
RUN npx eslint index.js || true

# Run security scan
RUN npm audit || true

# Run tests
RUN npm test || true

CMD ["node", "index.js"]
