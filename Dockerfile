FROM node:19

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app/

CMD ["yarn", "start"]
