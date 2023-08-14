FROM node:16-alpine3.18

WORKDIR /app

COPY package*.json .

RUN yarn install

COPY . .

RUN yarn prisma generate

CMD [ "yarn", "dev" ]