//go:build oracle
// +build oracle

package oracle

import (
	"database/sql"

	"arx.io/dbops/internal/database"

	_ "github.com/godror/godror"
)

func init() {
	database.RegisterDriver(database.DriverOracleName, func(dsn string) (*sql.DB, error) {
		return sql.Open("godror", dsn)
	})
}
