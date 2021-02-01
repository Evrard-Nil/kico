/*
 * Kico API
 *
 * This file describe the business logic of the kico api
 *
 * API version: 0.0.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/imdario/mergo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// APIService is a service that implents the logic for the DefaultApiServicer
// This service should implement the business logic for every endpoint for the DefaultApi API.
// Include any external packages or services that will be required by this service.
type APIService struct {
	dbClient mongo.Client
}

// NewAPIService creates a default api service
func NewAPIService(client mongo.Client) DefaultAPIServicer {
	return &APIService{dbClient: client}
}

// AddImageToVideo - Upload an image linked to a video
func (s *APIService) AddImageToVideo(ctx context.Context, videoID string, name string, secteurID string, time string, imageID string, ext string) (interface{}, error) {
	log.Print("AddImageToVideo")
	err := isValidUUID(videoID, "Video ID")
	if err != nil {
		return nil, err
	}
	err = isValidUUID(imageID, "Image ID")
	if err != nil {
		return nil, err
	}
	url := "/images/" + imageID + "." + ext

	image := Image{
		ID:        imageID,
		Name:      name,
		Time:      time,
		SecteurID: secteurID,
		URL:       url,
		VideoID:   videoID,
	}

	collection := s.dbClient.Database("ico").Collection("images")
	insertResult, err := collection.InsertOne(ctx, image)

	if err != nil {
		fmt.Print(err)
		return "Insertion error", err
	}
	fmt.Println("Inserted post with ID:", insertResult.InsertedID)

	return image, nil
}

// AddVideo - Add a  video
func (s *APIService) AddVideo(ctx context.Context, title string, videoID string, ext string) (interface{}, error) {
	log.Printf("AddVideo")
	err := isValidUUID(videoID, "Video ID")
	if err != nil {
		return nil, err
	}

	url := "/videos/" + videoID + "." + ext

	video := Video{
		ID:    videoID,
		State: IMPORTED,
		Date:  time.Now(),
		Title: title,
		URL:   url,
	}

	collection := s.dbClient.Database("ico").Collection("videos")
	insertResult, err := collection.InsertOne(ctx, video)

	if err != nil {
		print(err)
		return "Insertion error", err
	}
	fmt.Println("Inserted post with ID:", insertResult.InsertedID)

	return video, nil
}

// DeleteImage - Deletes an image
func (s *APIService) DeleteImage(ctx context.Context, imageID string, dataFolder string) (interface{}, error) {
	log.Printf("DeleteImage")
	err := isValidUUID(imageID, "Image ID")
	if err != nil {
		return nil, err
	}

	collection := s.dbClient.Database("ico").Collection("images")
	result, err := collection.DeleteOne(ctx, bson.M{"_id": imageID})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("DeleteOne removed %v document(s)\n", result.DeletedCount)

	files, err := ioutil.ReadDir(dataFolder + "/images/")
	if err != nil {
		log.Fatal(err)
	}
	for _, f := range files {
		// if a filename
		if strings.Split(f.Name(), ".")[0] == imageID {
			pathToRemove := dataFolder + "/images/" + f.Name()
			fmt.Printf("Removing at: %s\n", pathToRemove)
			err = os.Remove(pathToRemove)
			if err != nil {
				log.Fatal(err)
			}
			break
		}
	}

	return "OK", nil
}

// DeleteVideo - delete a video
func (s *APIService) DeleteVideo(ctx context.Context, videoID string, dataFolder string) (interface{}, error) {
	log.Printf("DeleteVideo")
	err := isValidUUID(videoID, "video ID")
	if err != nil {
		return nil, err
	}

	collection := s.dbClient.Database("ico").Collection("videos")
	result, err := collection.DeleteOne(ctx, bson.M{"_id": videoID})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("DeleteOne removed %v document(s)\n", result.DeletedCount)

	files, err := ioutil.ReadDir(dataFolder + "/videos/")
	if err != nil {
		log.Fatal(err)
	}
	for _, f := range files {
		// if a filename
		if strings.Split(f.Name(), ".")[0] == videoID {
			pathToRemove := dataFolder + "/videos/" + f.Name()
			fmt.Printf("Removing at: %s\n", pathToRemove)
			err = os.Remove(pathToRemove)
			if err != nil {
				log.Fatal(err)
			}
			break
		}
	}

	return "OK", nil
}

// GetImage - Retrieve an image
func (s *APIService) GetImage(ctx context.Context, imageID string) (interface{}, error) {
	log.Printf("GetImage")
	err := isValidUUID(imageID, "imageID")
	if err != nil {
		return nil, err
	}

	result := *s.dbClient.Database("ico").Collection("images").FindOne(ctx, bson.M{"_id": imageID})
	err = result.Err()
	if err != nil {
		fmt.Print(err)
		return "", err
	}
	image := &Image{}
	err = result.Decode(image)
	if err != nil {
		fmt.Print(err)
		return nil, err
	}

	return *image, nil
}

// GetImagesFromVideo - Retrieve all images linked to a video
func (s *APIService) GetImagesFromVideo(ctx context.Context, videoID string) (interface{}, error) {
	log.Printf("GetImagesFromVideo")
	result, err := s.dbClient.Database("ico").Collection("images").Find(ctx, bson.M{"video_id": videoID})
	if err != nil {
		fmt.Print(err)
		return nil, err
	}
	defer result.Close(context.Background())
	images := []Image{}
	for result.Next(context.Background()) {
		i := &Image{}

		err := result.Decode(i)
		if err != nil {
			fmt.Print(err)
			return nil, err
		}
		images = append(images, *i)

	}

	return images, nil
}

// GetVideo - Retrieve a single video
func (s *APIService) GetVideo(ctx context.Context, videoID string) (interface{}, error) {
	log.Printf("GetVideo")
	result := *s.dbClient.Database("ico").Collection("videos").FindOne(ctx, bson.M{"_id": videoID})
	err := result.Err()
	if err != nil {
		fmt.Print(err)
		return "", err
	}
	video := &Video{}
	err = result.Decode(video)
	if err != nil {
		fmt.Print(err)
		return nil, err
	}

	return video, nil
}

// GetVideos - Retrieve all videos
func (s *APIService) GetVideos(ctx context.Context) (interface{}, error) {
	log.Printf("GetVideos")
	result, err := s.dbClient.Database("ico").Collection("videos").Find(ctx, bson.M{})

	if err != nil {
		fmt.Print(err)
		return nil, err
	}
	defer result.Close(context.Background())
	videos := []Video{}
	for result.Next(context.Background()) {
		i := &Video{}

		err := result.Decode(i)
		if err != nil {
			fmt.Print(err)
			return nil, err
		}
		videos = append(videos, *i)

	}
	return videos, nil
}

// UpdateImage - update an image
func (s *APIService) UpdateImage(ctx context.Context, imageID string, image Image) (interface{}, error) {
	log.Printf("UpdateImage")
	currentData, err := s.GetImage(ctx, imageID)
	if err != nil {
		fmt.Print(err)
		return nil, err
	}
	currentImage := currentData.(Image)
	if err := mergo.Merge(&currentImage, image, mergo.WithOverride); err != nil {
		fmt.Print(err)
		return nil, err
	}

	result, err := s.dbClient.Database("ico").Collection("images").ReplaceOne(ctx, bson.M{"_id": imageID}, image)
	if err != nil {
		fmt.Print(err)
		return nil, err
	}
	fmt.Printf("Updated %v Documents!\n", result.ModifiedCount)
	return "OK", nil
}

// UpdateVideo - Update a video
func (s *APIService) UpdateVideo(ctx context.Context, videoID string, video Video) (interface{}, error) {
	log.Printf("UpdateVideo")
	result, err := s.dbClient.Database("ico").Collection("videos").ReplaceOne(ctx, bson.M{"_id": videoID}, video)
	if err != nil {
		fmt.Print(err)
		return nil, err
	}
	fmt.Printf("Updated %v Documents!\n", result.ModifiedCount)
	return "OK", nil
}

// isValidUUID - Check if id is a valid uuid
func isValidUUID(id string, parameterName string) error {
	_, err := uuid.Parse(id)
	if err != nil {
		fmt.Printf("%s should be of UUID form. Found: %s", parameterName, id)
		return err
	}
	return nil
}
