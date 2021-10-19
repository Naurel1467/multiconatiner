mongo mongodb://root:example@localhost:27017/PortfolioDoctor?authSource=admin
docker rm -f $(docker ps -a -q)
docker rmi -f $(sudo docker images -a -q)

#####
#
######
change localhost to ip address of EC2 where tasks/container are running in 
--> backend/app.js 
-->portfolio-doctor/src/environments/environment.ts
