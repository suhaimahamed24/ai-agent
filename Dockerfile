FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --production

COPY . .

ENV OLLAMA_URL=http://ollama:11434/api/generate
ENV OLLAMA_MODEL=gemma3:1b

EXPOSE 3000

CMD ["node", "server.js"]
