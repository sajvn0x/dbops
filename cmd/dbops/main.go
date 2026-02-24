package main

import (
	"net/http"

	"arx.io/dbops/internal/logger"
	"arx.io/dbops/internal/server"
)

const (
	DEFAULT_HOST = "localhost"
	DEFAULT_PORT = ":8080"
)

func main() {
	logger.Init()

	srv := server.New()

	logger.Log.Sugar().Infof("Server started at localhost%s", DEFAULT_PORT)

	http.ListenAndServe(DEFAULT_PORT, srv)
}
