FROM node:16-alpine as builder

RUN apk --no-cache add git build-base python3
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install


FROM node:16-alpine
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . .

RUN npm uninstall sqlite3
RUN npm install sqlite3

CMD ["npm", "start"]
