package server

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func registerRoutes(r chi.Router) {
	r.Get("/health", healthHandler)
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	resp := map[string]string{
		"status": "ok",
	}

	json.NewEncoder(w).Encode(resp)
}
