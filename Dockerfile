FROM node:18-alpine3.15

WORKDIR /app
COPY . .
RUN npm install
RUN npm i -g pm2
EXPOSE 80
CMD ["node", "/app/src/index.js"]

