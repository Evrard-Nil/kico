# KICO

## Build this app

To build all the containers run

```bash
docker-compose build
```

## Run this app

You can run this app locally by running:

```bash
docker-compose up
```

`ctrl^c` to stop.
 
## Dev environnement

### Set up a front dev env

First make sure you built the containers with:

```bash
docker-compose build api mongo mongo-express
```

Then you will be able to start the api and database with:

```bash
docker-compose up api mongo mongo-express
```

`ctrl^c` to stop.

Visit <http://localhost:8081/> for Mongo-Express, a web-based client for MongoDB management. This will allow you to easily add documents and collections for dev purpose.

Data are locally stored under `./data/dbfile`

Kico api is accessible at <localhost:8080/api/v1/>.
