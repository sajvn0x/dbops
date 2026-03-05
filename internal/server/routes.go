package server

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func registerRoutes(r chi.Router) {
	// api
	apiRouter := chi.NewRouter()

	apiRouter.Group(func(r chi.Router) {
		r.Use(JSONMiddleware)
		r.Get("/health", healthHandler)
	})

	r.Mount("/api", apiRouter)
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	resp := map[string]string{
		"status": "ok",
	}

	json.NewEncoder(w).Encode(resp)
}
