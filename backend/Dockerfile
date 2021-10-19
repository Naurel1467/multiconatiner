FROM 551450855787.dkr.ecr.ap-south-1.amazonaws.com/node-alpine-14.16:latest as build-step
WORKDIR /app
COPY ./package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
CMD [ "node","app.js" ]
