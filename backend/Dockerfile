FROM  node:14.16.0-alpine  as build-step
WORKDIR /app
COPY ./package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
CMD [ "node","app.js" ]
