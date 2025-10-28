# -------- Builder --------
FROM base-build-env:latest AS builder
WORKDIR /project

COPY . .

RUN npx nx build api

# -------- Runtime --------
FROM node:20-alpine AS runtime
WORKDIR /app

COPY --from=builder /project/dist/apps/api ./

RUN npx yarn install --production --frozen-lockfile

EXPOSE 3000
CMD ["node", "main.js"]
