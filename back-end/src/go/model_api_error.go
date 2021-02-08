package openapi

import "fmt"

// APIError describes an error produced by the APIService
type APIError struct {
	code    int
	message string
}

func (e *APIError) Error() string {
	return fmt.Sprintf("%d - %s", e.code, e.message)
}
