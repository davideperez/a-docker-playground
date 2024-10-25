# A Docker Playground: NodeApp + Mongodb

The goal of this app is to connect to a containerized MongoDB instance.

# Table of Contents

- [A Docker Playground: NodeApp + Mongodb](https://github.com/davideperez/a-docker-playground?tab=readme-ov-file#a-docker-playground-nodeapp--mongodb)
  - [Part 0: Node App](https://github.com/davideperez/a-docker-playground?tab=readme-ov-file#part-0-node-app)  
  - [Part 1: Not automated Docker Container Network creation](https://github.com/davideperez/a-docker-playground?tab=readme-ov-file#----part-1-not-autmated-docker-container-network-creation)
    - [1. Create a docker network for the containers to communicate.](https://github.com/davideperez/a-docker-playground?tab=readme-ov-file#1-create-a-docker-network-for-the-containers-to-communicate)
    - [2. Create the mongo container](https://github.com/davideperez/a-docker-playground?tab=readme-ov-file#2--create-the-mongo-container)
    - [3. Update the connection route we are using to connect to mongo](https://github.com/davideperez/a-docker-playground?tab=readme-ov-file#3-update-the-connection-route-we-are-using-to-connect-to-mongo)
    - [4. Create a custom image with our node app using Dockerfile](https://github.com/davideperez/a-docker-playground?tab=readme-ov-file#4-create-a-custom-image-with-our-node-app-using-dockerfile)
    - [5. Create a container with our node app image](https://github.com/davideperez/a-docker-playground?tab=readme-ov-file#5-create-a-container-with-our-node-app-image)
  - [Part 2: Using Docker Compose](https://github.com/davideperez/a-docker-playground?tab=readme-ov-file#part-2-using-docker-compose)
  - [Part 3: Dockerfile.dev](https://github.com/davideperez/a-docker-playground?tab=readme-ov-file#part-3-dockerfiledev)

## Part 0: Node App

On `index.js` you'll find it:
- Uses express and mongoose. 
- Create the Animal Schema. 
- Create an express server
- Create a mongoose connection
- Create 2 routes one get the animals one creates an animal
- Starts the server.

## Part 1: Not autmated Docker Container Network creation

### 1. Create a docker network for the containers to communicate.
Creates the network
```bash
docker network create myNetwork
```

### 2- Create the mongo container
Create the container indicating:
- Name
- Ports
- Enviroment variables
- Network
- Image tag

Creates the container: 
```bash
docker create -p27017:27017 --name mongoContainer01 --network myNetwork -e MONGO_INITDB_ROOT_USERNAME=david -e MONGO_INITDB_ROOT_PASSWORD=password mongo
```
Starts the container
```bash
docker start mongoContainer01
```

### 3. Update the connection route we are using to connect to mongo


From localhost:
```bash
mongoose.connect('mongodb://david:password@localhost:27017/miapp?authSource=admin')
```


To mongoContainer01:
```bash
mongoose.connect('mongodb://david:password@mongoContainer01:27017/miapp?authSource=admin')
```

### 4. Create a custom image with our node app using Dockerfile
Build the container using the following command in the root folder where the Dockerfile is:
```bash
docker build -t myapp:1 .
```
### 5. Create a cointainer with our node app image
Creates the container:
```bash
docker create -p3000:3000 --name myNodeApp --network myNetwork myapp:1
```
Starts the container:
```bash
docker start myNodeApp
```

## Part 2: Using Docker Compose

- Create the docker-compose.yml file
- A volume is configurated to persist mongo db data.
- Execute the compose file with:
```bash
docker compose up
```

## Part 3: Dockerfile.dev
An extra pair of Dockerfile.dev and docker-compose-dev.yml are created to have a dev enviroment separated from the production one. 

This enviroment can be executed with a variant of the `docker compose` command:
```bash
docker compose -f docker-compose-dev.ylm up
```

