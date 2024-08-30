# syntax=docker/dockerfile:1

FROM node:20-alpine

COPY . .
RUN npm install
CMD ["node", "server.js"]
EXPOSE 3000