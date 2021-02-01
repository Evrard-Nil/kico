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
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

// A DefaultAPIController binds http requests to an api service and writes the service results to the http response
type DefaultAPIController struct {
	service    DefaultAPIServicer
	dataFolder string
}

// NewDefaultAPIController creates a default api controller
func NewDefaultAPIController(s DefaultAPIServicer, df string) Router {
	return &DefaultAPIController{service: s, dataFolder: df}
}

// Routes returns all of the api route for the DefaultApiController
func (c *DefaultAPIController) Routes() Routes {
	return Routes{
		{
			"AddImageToVideo",
			strings.ToUpper("Post"),
			"/api/v1/video/{id}/images",
			c.AddImageToVideo,
		},
		{
			"AddVideo",
			strings.ToUpper("Post"),
			"/api/v1/video",
			c.AddVideo,
		},
		{
			"DeleteImage",
			strings.ToUpper("Delete"),
			"/api/v1/images/{id}",
			c.DeleteImage,
		},
		{
			"DeleteVideo",
			strings.ToUpper("Delete"),
			"/api/v1/video/{id}",
			c.DeleteVideo,
		},
		{
			"GetImage",
			strings.ToUpper("Get"),
			"/api/v1/images/{id}",
			c.GetImage,
		},
		{
			"GetImagesFromVideo",
			strings.ToUpper("Get"),
			"/api/v1/video/{id}/images",
			c.GetImagesFromVideo,
		},
		{
			"GetVideo",
			strings.ToUpper("Get"),
			"/api/v1/video/{id}",
			c.GetVideo,
		},
		{
			"GetVideos",
			strings.ToUpper("Get"),
			"/api/v1/videos",
			c.GetVideos,
		},
		{
			"UpdateImage",
			strings.ToUpper("Put"),
			"/api/v1/images/{id}",
			c.UpdateImage,
		},
		{
			"UpdateVideo",
			strings.ToUpper("Put"),
			"/api/v1/video/{id}",
			c.UpdateVideo,
		},
	}
}

// AddImageToVideo - Upload an image linked to a video
func (c *DefaultAPIController) AddImageToVideo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	r.ParseMultipartForm(5 << 20)
	err := r.ParseForm()
	if err != nil {
		fmt.Print(err)
		w.WriteHeader(500)
		return
	}

	params := mux.Vars(r)
	id := params["id"]
	if err != nil {
		fmt.Print(err)
		w.WriteHeader(500)
		return
	}

	time := r.FormValue("time")
	name := r.FormValue("name")
	secteurID := r.FormValue("secteurId")

	pid := uuid.New().String()
	filepath := c.dataFolder + "/images/" + pid

	ext, err := ReadFormFileToFileserver(r, "fileName", filepath)
	if err != nil {

		fmt.Print(err)
		w.WriteHeader(500)
		return
	}

	result, err := c.service.AddImageToVideo(r.Context(), id, name, secteurID, time, pid, ext)
	if err != nil {
		fmt.Print(err)
		w.WriteHeader(500)
		return
	}

	EncodeJSONResponse(result, nil, w)
}

// AddVideo - Add a  video
func (c *DefaultAPIController) AddVideo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	r.ParseMultipartForm(500 << 20)
	err := r.ParseForm()
	if err != nil {
		print(err)
		w.WriteHeader(500)
		return
	}
	title := r.FormValue("title")

	vid := uuid.New().String()
	filepath := c.dataFolder + "/videos/" + vid
	ext, err := ReadFormFileToFileserver(r, "fileName", filepath)
	if err != nil {
		print(err)
		w.WriteHeader(500)
		return
	}

	result, err := c.service.AddVideo(r.Context(), title, vid, ext)
	if err != nil {
		print(err)
		w.WriteHeader(500)
		return
	}

	EncodeJSONResponse(result, nil, w)
}

// DeleteImage - Deletes an image
func (c *DefaultAPIController) DeleteImage(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)
	id := params["id"]

	result, err := c.service.DeleteImage(r.Context(), id, c.dataFolder)
	if err != nil {
		w.WriteHeader(500)
		return
	}

	EncodeJSONResponse(result, nil, w)
}

// DeleteVideo - delete a video
func (c *DefaultAPIController) DeleteVideo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)
	id := params["id"]

	result, err := c.service.DeleteVideo(r.Context(), id, c.dataFolder)
	if err != nil {
		w.WriteHeader(500)
		return
	}

	EncodeJSONResponse(result, nil, w)
}

// GetImage - Retrieve an image
func (c *DefaultAPIController) GetImage(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)
	id := params["id"]

	result, err := c.service.GetImage(r.Context(), id)
	if err != nil {
		w.WriteHeader(500)
		return
	}

	EncodeJSONResponse(result, nil, w)
}

// GetImagesFromVideo - Retrieve all images linked to a video
func (c *DefaultAPIController) GetImagesFromVideo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)
	id := params["id"]

	result, err := c.service.GetImagesFromVideo(r.Context(), id)
	if err != nil {
		w.WriteHeader(500)
		return
	}

	EncodeJSONResponse(result, nil, w)
}

// GetVideo - Retrieve a single video
func (c *DefaultAPIController) GetVideo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)
	id := params["id"]

	result, err := c.service.GetVideo(r.Context(), id)
	if err != nil {
		w.WriteHeader(500)
		return
	}

	EncodeJSONResponse(result, nil, w)
}

// GetVideos - Retrieve all videos
func (c *DefaultAPIController) GetVideos(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	result, err := c.service.GetVideos(r.Context())
	if err != nil {
		w.WriteHeader(500)
		return
	}

	EncodeJSONResponse(result, nil, w)
}

// UpdateImage - update an image
func (c *DefaultAPIController) UpdateImage(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)
	id := params["id"]

	image := &Image{}
	if err := json.NewDecoder(r.Body).Decode(&image); err != nil {
		w.WriteHeader(500)
		return
	}

	result, err := c.service.UpdateImage(r.Context(), id, *image)
	if err != nil {
		w.WriteHeader(500)
		return
	}

	EncodeJSONResponse(result, nil, w)
}

// UpdateVideo - Update a video
func (c *DefaultAPIController) UpdateVideo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)
	id := params["id"]

	video := &Video{}
	if err := json.NewDecoder(r.Body).Decode(&video); err != nil {
		w.WriteHeader(500)
		return
	}

	result, err := c.service.UpdateVideo(r.Context(), id, *video)
	if err != nil {
		w.WriteHeader(500)
		return
	}

	EncodeJSONResponse(result, nil, w)
}
