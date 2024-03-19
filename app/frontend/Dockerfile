FROM node:20-alpine3.19 as base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .

FROM base as dev
CMD [ "npm", "run", "dev"]

FROM base as build-prod
RUN npm run build

FROM nginx:1.25 as prod
RUN mkdir /app
COPY --from=build-prod /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
