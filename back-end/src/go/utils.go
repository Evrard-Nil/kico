package openapi

import (
	"encoding/json"
	"io"
	"net/http"
	"os"
	"strconv"
	"strings"
)

// ReadFormFileToFileserver reads file data from a request form and writes it to a specified path
func ReadFormFileToFileserver(r *http.Request, key string, path string) (string, error) {
	r.ParseForm()
	formFile, fileHeader, err := r.FormFile(key)
	defer formFile.Close()

	if err != nil {
		return "", err
	}
	ext := "jpeg"
	spl := strings.Split(fileHeader.Filename, ".")
	if len(spl) > 1 {
		ext = spl[1]
	}

	// Create file
	dst, err := os.Create(path + "." + ext)
	defer dst.Close()

	if err != nil {
		print(err)
		return "", err
	}

	// Copy the uploaded file to the created file on the filesystem
	if _, err := io.Copy(dst, formFile); err != nil {
		print(err)
		return "", err
	}

	return ext, nil
}

// EncodeJSONResponse uses the json encoder to write an interface to the http response with an optional status code
func EncodeJSONResponse(i interface{}, status *int, w http.ResponseWriter) error {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if status != nil {
		w.WriteHeader(*status)
	} else {
		w.WriteHeader(http.StatusOK)
	}

	return json.NewEncoder(w).Encode(i)
}

// parseInt64Parameter parses a sting parameter to an int64
func parseInt64Parameter(param string) (int64, error) {
	return strconv.ParseInt(param, 10, 64)
}

// parseInt32Parameter parses a sting parameter to an int32
func parseInt32Parameter(param string) (int32, error) {
	val, err := strconv.ParseInt(param, 10, 32)
	if err != nil {
		return -1, err
	}
	return int32(val), nil
}
