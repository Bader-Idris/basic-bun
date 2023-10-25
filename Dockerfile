FROM oven/bun:latest

WORKDIR /app

COPY package.json .
COPY ./bun.lockb ./

RUN bun install

COPY . .

ENV PORT 3000
EXPOSE $PORT

CMD ["bun", "run", "start"]
