FROM node:16.17.0-alpine

WORKDIR /usr/src/web

COPY package*.json /usr/src/web

RUN npm install --include=dev

COPY . /usr/src/web

RUN npm run build

RUN npm install -g serve

EXPOSE 4000

CMD [ "serve", "-s", "dist", "-l", "4000" ]