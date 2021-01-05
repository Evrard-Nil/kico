/*
 * Kico API
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * API version: 0.0.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi

import (
	"context"
	"errors"
	"os"
)

// DefaultApiService is a service that implents the logic for the DefaultApiServicer
// This service should implement the business logic for every endpoint for the DefaultApi API. 
// Include any external packages or services that will be required by this service.
type DefaultApiService struct {
}

// NewDefaultApiService creates a default api service
func NewDefaultApiService() DefaultApiServicer {
	return &DefaultApiService{}
}

// AddImageToVideo - Upload an image linked to a video
func (s *DefaultApiService) AddImageToVideo(ctx context.Context, id int32, image Image) (interface{}, error) {
	// TODO - update AddImageToVideo with the required logic for this service method.
	// Add api_default_service.go to the .openapi-generator-ignore to avoid overwriting this service implementation when updating open api generation.
	return nil, errors.New("service method 'AddImageToVideo' not implemented")
}

// AddVideo - Add a  video
func (s *DefaultApiService) AddVideo(ctx context.Context, title string, fileName *os.File) (interface{}, error) {
	// TODO - update AddVideo with the required logic for this service method.
	// Add api_default_service.go to the .openapi-generator-ignore to avoid overwriting this service implementation when updating open api generation.
	return nil, errors.New("service method 'AddVideo' not implemented")
}

// DeleteImage - Deletes an image
func (s *DefaultApiService) DeleteImage(ctx context.Context, id int32) (interface{}, error) {
	// TODO - update DeleteImage with the required logic for this service method.
	// Add api_default_service.go to the .openapi-generator-ignore to avoid overwriting this service implementation when updating open api generation.
	return nil, errors.New("service method 'DeleteImage' not implemented")
}

// DeleteVideo - delete a video
func (s *DefaultApiService) DeleteVideo(ctx context.Context, id int32) (interface{}, error) {
	// TODO - update DeleteVideo with the required logic for this service method.
	// Add api_default_service.go to the .openapi-generator-ignore to avoid overwriting this service implementation when updating open api generation.
	return nil, errors.New("service method 'DeleteVideo' not implemented")
}

// GetImage - Retrieve an image
func (s *DefaultApiService) GetImage(ctx context.Context, id int32) (interface{}, error) {
	// TODO - update GetImage with the required logic for this service method.
	// Add api_default_service.go to the .openapi-generator-ignore to avoid overwriting this service implementation when updating open api generation.
	return nil, errors.New("service method 'GetImage' not implemented")
}

// GetImagesFromVideo - Retrieve all images linked to a video
func (s *DefaultApiService) GetImagesFromVideo(ctx context.Context, id int32) (interface{}, error) {
	// TODO - update GetImagesFromVideo with the required logic for this service method.
	// Add api_default_service.go to the .openapi-generator-ignore to avoid overwriting this service implementation when updating open api generation.
	return nil, errors.New("service method 'GetImagesFromVideo' not implemented")
}

// GetVideo - Retrieve a single video
func (s *DefaultApiService) GetVideo(ctx context.Context, id int32) (interface{}, error) {
	// TODO - update GetVideo with the required logic for this service method.
	// Add api_default_service.go to the .openapi-generator-ignore to avoid overwriting this service implementation when updating open api generation.
	return nil, errors.New("service method 'GetVideo' not implemented")
}

// GetVideos - Retrieve all videos
func (s *DefaultApiService) GetVideos(ctx context.Context) (interface{}, error) {
	// TODO - update GetVideos with the required logic for this service method.
	// Add api_default_service.go to the .openapi-generator-ignore to avoid overwriting this service implementation when updating open api generation.
	return nil, errors.New("service method 'GetVideos' not implemented")
}

// UpdateImage - update an image
func (s *DefaultApiService) UpdateImage(ctx context.Context, id int32, image Image) (interface{}, error) {
	// TODO - update UpdateImage with the required logic for this service method.
	// Add api_default_service.go to the .openapi-generator-ignore to avoid overwriting this service implementation when updating open api generation.
	return nil, errors.New("service method 'UpdateImage' not implemented")
}

// UpdateVideo - Update a video
func (s *DefaultApiService) UpdateVideo(ctx context.Context, id int32, video Video) (interface{}, error) {
	// TODO - update UpdateVideo with the required logic for this service method.
	// Add api_default_service.go to the .openapi-generator-ignore to avoid overwriting this service implementation when updating open api generation.
	return nil, errors.New("service method 'UpdateVideo' not implemented")
}
