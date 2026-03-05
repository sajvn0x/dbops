package database

import "database/sql"

// Connector defines methods that every database driver must provide.
type Connector interface {
	// Open establishes a connection based on the provided DSN
	Open(dsn string) (*sql.DB, error)
	// Close can be used for cleanup if needed (optional).
	Close() error
	// Type returns the database type (e.g., "oracle", "postgres").
	Type() string
}
