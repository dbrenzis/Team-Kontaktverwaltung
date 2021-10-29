FROM node:latest as stage
WORKDIR /app
COPY /client/package.json /client/yarn.lock ./
RUN yarn
COPY /client .
RUN yarn build

FROM nginx:latest
COPY --from=stage /app/build /usr/share/nginx/html
COPY /web /etc/nginx/template