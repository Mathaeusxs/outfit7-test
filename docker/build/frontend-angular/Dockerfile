# -------- Builder --------
FROM base-build-env:latest AS builder
WORKDIR /project

COPY . .

RUN npx nx build frontend-angular

# -------- Runtime --------
FROM nginx:alpine AS runtime

COPY --from=builder /project/dist/apps/frontend-angular/browser /usr/share/nginx/html

COPY docker/build/frontend-angular/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
