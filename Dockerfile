FROM node:10

COPY package*.json ./

# Install dependencies

RUN npm install

# Bundle app

COPY . .

EXPOSE 1964

CMD [ "node", "server.js" ]