package main

import (
	"arx.io/dbops/internal/logger"
)

func main() {
	logger.Init()

	logger.Log.Info("DBOps")
}
