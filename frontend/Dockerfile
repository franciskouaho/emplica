FROM node:21.4.0 AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --production=false

COPY . .

RUN yarn build

FROM node:21.4.0

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app ./

RUN yarn install --production

EXPOSE 3000

CMD ["yarn", "start"]
