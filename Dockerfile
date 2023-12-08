FROM node:alpine

WORKDIR /usr/src/app

RUN npm install -g typescript

RUN npm install -g nodemon

RUN npm install -g ts-node

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "start"]