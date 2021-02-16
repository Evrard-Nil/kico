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
	"net/http"
)

// DefaultAPIRouter defines the required methods for binding the api requests to a responses for the DefaultApi
// The DefaultAPIRouter implementation should parse necessary information from the http request,
// pass the data to a DefaultApiServicer to perform the required actions, then write the service results to the http response.
type DefaultAPIRouter interface {
	AddImageToVideo(http.ResponseWriter, *http.Request)
	AddVideo(http.ResponseWriter, *http.Request)
	DeleteImage(http.ResponseWriter, *http.Request)
	DeleteVideo(http.ResponseWriter, *http.Request)
	GetImage(http.ResponseWriter, *http.Request)
	GetImagesFromVideo(http.ResponseWriter, *http.Request)
	GetVideo(http.ResponseWriter, *http.Request)
	GetVideos(http.ResponseWriter, *http.Request)
	UpdateImage(http.ResponseWriter, *http.Request)
	UpdateVideo(http.ResponseWriter, *http.Request)
}

// DefaultAPIServicer defines the api actions for the DefaultApi service
// This interface intended to stay up to date with the openapi yaml used to generate it,
// while the service implementation can ignored with the .openapi-generator-ignore file
// and updated with the logic required for the API.
type DefaultAPIServicer interface {
	AddImageToVideo(context context.Context, id string, name string, secteurID string, time string, pid string, ext string) (interface{}, *APIError)
	AddVideo(context context.Context, title string, vid string, ext string) (interface{}, *APIError)
	DeleteImage(context.Context, string, string) (interface{}, *APIError)
	DeleteVideo(context.Context, string, string) (interface{}, *APIError)
	GetImage(context.Context, string) (interface{}, *APIError)
	GetImagesFromVideo(context.Context, string) (interface{}, *APIError)
	GetVideo(context.Context, string) (interface{}, *APIError)
	GetVideos(context.Context) (interface{}, *APIError)
	UpdateImage(context.Context, string, Image) (interface{}, *APIError)
	UpdateVideo(context.Context, string, Video) (interface{}, *APIError)
}
