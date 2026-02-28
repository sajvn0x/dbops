package oracle

import (
	"database/sql"

	_ "github.com/godror/godror"
)

func NewConnection(connString string) (*sql.DB, error) {
	db, err := sql.Open("godror", connString)

	if err != nil {
		return nil, err
	}

	return db, nil
}
