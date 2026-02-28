package database

import "database/sql"

const (
	DriverOracleName = "oracle"
)

type DriverFactory func(dsn string) (*sql.DB, error)

var registry = map[string]DriverFactory{}

func RegisterDriver(name string, factory DriverFactory) {
	registry[name] = factory
}

func GetDriver(name string) (DriverFactory, bool) {
	d, ok := registry[name]
	return d, ok
}
