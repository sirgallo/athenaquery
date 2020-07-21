FROM node:lts

WORKDIR /usr/src/athenaquery

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9022

CMD ["npm", "start"]