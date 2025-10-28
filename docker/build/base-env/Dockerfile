# -------- Builder --------
FROM node:20-alpine AS base-build-env
WORKDIR /project

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile && yarn cache clean

CMD ["npx", "nx", "help"]
