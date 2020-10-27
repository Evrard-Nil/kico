# Kico API

This folder contains sources for Kico API. The server is written in Golang and uses OpenAPI 3.0 specification and code generation.

## Overview

API version: `0.0.0`

Build date: `2020-10-27T11:20:56.015814+01:00[Europe/Paris]`

### Specifications

Specifications of the API are in located in `api/openapi.yaml` file.

#### Generate server code

To update the generated code with latest specifications:

```bash
java -jar back-end/api/openapi-generator-cli.jar generate -i back-end/api/openapi.yaml -o back-end/src -g go-server
```

#### Edit specifications

To view and edit specifications in openapi editor:

```bash
docker run -d -p 80:8080 -e URL=/specs/openapi.yaml -v $(pwd)/back-end/api:/usr/share/nginx/html/specs swaggerapi/swagger-editor
```

Then open `localhost` in your browser.
Alternativelky you could open specifications on [swaggerhub](https://app.swaggerhub.com/apis/Evrard-Nil/kicoapi/0.0.0#/). **Make sure to sync** git and swaggerhub when you are done.

### Running the server

To run the server, follow these simple steps:

```
go run main.go
```

To run the server in a docker container

```
docker build --network=host -t openapi .
```

Once image is built use

```
docker run --rm -it openapi
```
