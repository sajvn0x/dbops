// Package app provides the central application state container.
//
// The App struct holds shared dependencies used across the
// application, such as database connections, configuration,
// logging, and other runtime services.
package app

import (
	"database/sql"
	"fmt"
	"sync"

	"arx.io/dbops/internal/database"
)

type App struct {
	config *AppConfig

	drivers map[string]database.Connector

	conns   map[string]*sql.DB
	connsMu sync.RWMutex
}

func NewApp(cfg *AppConfig) *App {
	return &App{
		config:  cfg,
		drivers: make(map[string]database.Connector),
		conns:   make(map[string]*sql.DB),
	}
}

func (a *App) GetConnection(name string, dsn string) (*sql.DB, error) {
	a.connsMu.RLock()
	db, ok := a.conns[name]
	a.connsMu.RUnlock()

	if ok {
		return db, nil
	}

	a.connsMu.Lock()
	defer a.connsMu.Unlock()

	// Double-check after acquiring lock
	if db, ok := a.conns[name]; ok {
		return db, nil
	}

	driver, exists := a.drivers["oracle"]
	if !exists {
		return nil, fmt.Errorf("no driver registered for database type %q", "oracle")
	}

	db, err := driver.Open(dsn)
	if err != nil {
		return nil, fmt.Errorf("failed to open connection")
	}

	a.conns[name] = db
	return db, nil
}

func (a *App) CloseAll() error {
	a.connsMu.Lock()
	defer a.connsMu.Unlock()

	var firstErr error
	for name, db := range a.conns {
		if err := db.Close(); err != nil {
			if firstErr == nil {
				firstErr = fmt.Errorf("closing %s: %w", name, err)
			}
		}
		delete(a.conns, name)
	}
	return firstErr
}

func (a *App) RegisterDriver(driver string, connector database.Connector) {
	a.drivers[driver] = connector
}
