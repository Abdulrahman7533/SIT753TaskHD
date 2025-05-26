FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Set default command
CMD ["node", "index.js"]
