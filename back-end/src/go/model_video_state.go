/*
 * Kico API
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * API version: 0.0.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi
// VideoState : State of a video
type VideoState string

// List of VideoState
const (
	IMPORTED VideoState = "imported"
	SEGMENTED VideoState = "segmented"
	ANNOTATED VideoState = "annotated"
)
