# BUILD
FROM node:22 AS build

WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN npx nx build frontend-angular

# FE
FROM nginx:1.27-alpine

COPY --from=build /app/dist/apps/frontend-angular/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
