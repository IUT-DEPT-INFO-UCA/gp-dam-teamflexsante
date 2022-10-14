FROM node:16.17.0-alpine

WORKDIR /usr/src/back

COPY package.json /usr/src/back

RUN npm install

COPY . /usr/src/back

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]