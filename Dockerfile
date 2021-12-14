FROM node:12.16.1

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install --target-arch=x64 --ignore-scripts && npm cache clean --force

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
