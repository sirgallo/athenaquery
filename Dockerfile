FROM node:lts

WORKDIR /usr/src/athenaquery

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8099

CMD ["npm", "start"]