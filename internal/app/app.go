// Package app provides the central application state container.
//
// The App struct holds shared dependencies used across the
// application, such as database connections, configuration,
// logging, and other runtime services.
package app

import (
	"arx.io/dbops/internal/database"
	"arx.io/dbops/internal/driver/oracle"
)

var Connection *oracle.OracleDB

func init() {
	d, ok := database.GetDriver(database.DriverOracleName)

	if !ok {
		panic("Oracle driver not initialized")
	}

	db, err := d(`user="scott" password="tiger" connectString="localhost:1521/XEPDB1" timezone="UTC"`)
	if err != nil {
		panic(err)
	}

	Connection = oracle.NewOracleDatabase(db)
}
