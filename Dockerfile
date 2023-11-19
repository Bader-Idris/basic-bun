FROM oven/bun:latest

WORKDIR /app

COPY package.json .
# COPY ./bun.lockb ./
ARG BUN_ENV
RUN if [ "$BUN_ENV" = "development" ]; \
  then bun install; \
  else bun install --only=production; \
fi

COPY . .

ENV PORT 3000
EXPOSE $PORT

CMD ["bun", "run", "start"]
