FROM node:16

WORKDIR /usr/src/app


COPY package*.json ./
COPY . .

RUN npm install pg --save

EXPOSE 3001

CMD ["npm", "run","dev"]


