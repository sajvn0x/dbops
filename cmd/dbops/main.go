package main

import (
	"net/http"

	"arx.io/dbops/internal/app"
	"arx.io/dbops/internal/driver/oracle"
	"arx.io/dbops/internal/logger"
	"arx.io/dbops/internal/server"
)

const (
	DefaultHost = "localhost"
	DefaultPort = ":8080"
)

func main() {
	logger.Init()

	config, err := app.LoadConfig("config/config.yaml")
	if err != nil {
		panic(err)
	}

	// initialize app
	a := app.NewApp(config)

	// register drivers
	a.RegisterDriver("oracle", &oracle.OracleConnector{})

	srv := server.New()

	logger.Log.Sugar().Infof("Server started at localhost%s", DefaultPort)

	http.ListenAndServe(DefaultPort, srv)
}
