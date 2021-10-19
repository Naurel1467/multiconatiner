FROM 551450855787.dkr.ecr.ap-south-1.amazonaws.com/node-alpine-14.16:latest as build-step
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

# Step 2
FROM 551450855787.dkr.ecr.ap-south-1.amazonaws.com/nginx-1.21.3-alpine:latest 
COPY --from=build-step app/dist/portfolio-doctor /usr/share/nginx/html
EXPOSE 4200

# Periodically check if the application is running. If not, shutdown the
# container.
HEALTHCHECK --interval=2m --timeout=5s --start-period=2m \
CMD nc -z -w5 127.0.0.1 5080 || exit 1

# Wait 5 seconds for the MongoDB connection
#CMD echo "Warming up" && sleep 5 && npm start
