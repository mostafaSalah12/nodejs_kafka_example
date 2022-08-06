# nodejs docker file
FROM node:16

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
# RUN node ./preducer.js

COPY . .

EXPOSE 3001

CMD ["node", "./preducer.js"]
