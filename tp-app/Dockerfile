# Build step #1: build the React front end
FROM node:16-alpine as build-step

# switch working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH


COPY package.json package-lock.json ./

COPY ./src ./src

COPY ./public ./public

RUN yarn install

# exposing the 3000 port to support external connections
EXPOSE 3000

# start app
CMD ["yarn", "start"]
