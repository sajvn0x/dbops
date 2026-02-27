// Package server handles commands, and the web as well
package server

import (
	"io/fs"
	"net/http"
	"strings"

	"arx.io/dbops"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func New() http.Handler {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Logger)
	// TODO: we are also serving the web
	// this is not convenient to add this middleware
	// r.Use(JSONMiddleware)

	registerRoutes(r)

	webServe(r)

	return r
}

func webServe(r chi.Router) {
	distFS, err := fs.Sub(dbops.WebFiles, "dist")
	if err != nil {
		panic(err)
	}

	fileServer := http.FileServer(http.FS(distFS))

	r.Get("/*", func(w http.ResponseWriter, r *http.Request) {

		// cache vite assets
		if strings.HasPrefix(r.URL.Path, "/assets/") {
			w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		}

		// try to serve file
		_, err := distFS.Open(strings.TrimPrefix(r.URL.Path, "/"))
		if err == nil {
			fileServer.ServeHTTP(w, r)
			return
		}

		// fallback for SPA routing
		http.ServeFileFS(w, r, distFS, "index.html")
	})
}
