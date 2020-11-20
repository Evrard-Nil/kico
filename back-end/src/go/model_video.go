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
	"time"
)

// Video - A video stored
type Video struct {

	Id string `json:"id,omitempty"`

	State VideoState `json:"state,omitempty"`

	AnnotatedBy string `json:"annotated_by,omitempty"`

	Date time.Time `json:"date,omitempty"`

	ScorePci float32 `json:"score_pci,omitempty"`

	Url string `json:"url,omitempty"`

	Title string `json:"title,omitempty"`
}
