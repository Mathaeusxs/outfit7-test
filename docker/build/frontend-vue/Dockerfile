# -------- Builder --------
FROM base-build-env:latest AS builder
WORKDIR /project

COPY . .

RUN npx nx build frontend-vue

# -------- Runtime --------
FROM nginx:alpine AS runtime

COPY --from=builder /project/dist/apps/frontend-vue /usr/share/nginx/html
COPY README.md /usr/share/nginx/html/README.md

COPY docker/build/frontend-vue/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
