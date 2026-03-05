//go:build oracle
// +build oracle

// Package oracle provides utilities for connecting to and interacting with
// Oracle databases.
//
// It implements the database driver integration used by the application's
// database abstraction layer. The package is responsible for:
//
//   - Establishing connections to Oracle databases
//   - Executing SQL queries and commands
//   - Retrieving metadata such as tables and columns
//   - Providing a consistent interface for the query engine
//
// This package is part of the database driver system that enables the
// application to support multiple database backends.
package oracle

import (
	"database/sql"

	"arx.io/dbops/internal/database"

	_ "github.com/godror/godror"
)

type OracleConnector struct{}

func (o *OracleConnector) Type() string {
	return "oracle"
}

func (o *OracleConnector) Open(dsn string) (*sql.DB, error) {
	db, err := sql.Open("godror", dsn)
	if err != nil {
		return nil, err
	}

	if err = db.Ping(); err != nil {
		db.Close()
		return nil, err
	}

	return db, nil
}

func (o *OracleConnector) Close() error {
	return nil
}
