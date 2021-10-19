FROM 621733431345.dkr.ecr.us-east-1.amazonaws.com/nodeog:latest  as build-step
WORKDIR /app
COPY ./package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
CMD [ "node","app.js" ]
