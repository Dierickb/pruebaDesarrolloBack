FROM node:16

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install pg --save

COPY . .


EXPOSE 4000

CMD ["npm", "start"]


