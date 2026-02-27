package main

import (
	"net/http"

	"arx.io/dbops/internal/logger"
	"arx.io/dbops/internal/server"
)

const (
	DefaultHost = "localhost"
	DefaultPort = ":8080"
)

func main() {
	logger.Init()

	srv := server.New()

	logger.Log.Sugar().Infof("Server started at localhost%s", DefaultPort)

	http.ListenAndServe(DefaultPort, srv)
}
