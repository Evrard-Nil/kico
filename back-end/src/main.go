/*
 * Kico API
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * API version: 0.0.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/rs/cors"

	openapi "github.com/evrard-nil/kico/back-end/src/go"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	// IcoDataFolderEnv represents the name of the environnement variable defining
	// where images and videos should be stored
	IcoDataFolderEnv = "ICO_DATA_STORAGE"
	// MondoDB adress (localhost for dev)
	dbAdress = "mongo"
	// MondoDB port (27100 for dev)
	dbPort = "27017"
	// MongoDB user
	dbUser = "mongoadmin"
	// MongoDB password
	dbPassword = "secret"
	// Port defines the listening port number
	port = "8080"
)

func main() {
	log.Printf("Server started")
	uri := "mongodb://" + dbUser + ":" + dbPassword + "@" + dbAdress + ":" + dbPort
	client, err := mongo.NewClient(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Mongo connection: OK")

	// Release resources at last
	defer cancel()
	defer client.Disconnect(ctx)

	dataFolder := os.Getenv(IcoDataFolderEnv)
	if dataFolder == "" {
		log.Fatalf("Data folder is not set up in environement variables. Check %s variable to set it up.", IcoDataFolderEnv)
	}

	APIService := openapi.NewAPIService(*client)
	APIController := openapi.NewDefaultAPIController(APIService, dataFolder)

	router := openapi.NewRouter(APIController)
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"X-Requested-With","Content-Type"},
		
	})

	handler := c.Handler(router)
	log.Printf("Starting to listen on %s.", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
