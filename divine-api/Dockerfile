FROM node:18-alpine

EXPOSE 1234

WORKDIR /app

COPY package*.json .

RUN yarn install

COPY . .

RUN yarn prisma generate

CMD [ "yarn", "dev" ]