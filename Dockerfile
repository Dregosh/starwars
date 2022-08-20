FROM node:16.13.2 as builder

WORKDIR /deps
COPY ./package.json .
RUN npm install

FROM node:16.13.2 as compiler
WORKDIR /app
COPY --from=builder /deps/node_modules/ ./node_modules/
COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=compiler /app/dist/* /usr/share/nginx/html

EXPOSE 80
