package utils

import (
	"encoding/json"
	"net/http"
)

func WriteJsonResponse(w http.ResponseWriter,status int,data any) error{
	w.Header().Set("Content Type","Application/Json")
	w.WriteHeader(status)
	return json.NewEncoder(w).Encode(data)
}