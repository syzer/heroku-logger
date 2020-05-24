FROM node:12

WORKDIR /service
ADD . /service

RUN npm ci

CMD node index.js
