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

func (a *App) SetConnection(name string, dbType string, dsn string) error {
	a.connsMu.Lock()
	defer a.connsMu.Unlock()

	val, ok := a.conns[name]
	if ok {
		// checking the connection, if it is still active or not
		if err := val.Ping(); err == nil {
			return nil
		}
	}

	driver, exists := a.drivers[dbType]
	if !exists {
		return fmt.Errorf("no driver registered for database type %q", dbType)
	}

	db, err := driver.Open(dsn)
	if err != nil {
		return err
	}

	a.conns[name] = db

	return nil
}

func (a *App) GetConnection(name string) (*sql.DB, error) {
	a.connsMu.RLock()
	db, ok := a.conns[name]
	a.connsMu.RUnlock()

	if ok {
		return db, nil
	}

	return nil, fmt.Errorf("connection not configured: %s", name)
}

func (a *App) Connect(name string, dbType string, dsn string) (*sql.DB, error) {
	err := a.SetConnection(name, dbType, dsn)
	if err != nil {
		return nil, err
	}

	return a.GetConnection(name)
}

func (a *App) Disconnect(name string) error {
	db, err := a.GetConnection(name)
	if err != nil {
		return err
	}
	err = db.Close()

	delete(a.conns, name)
	return err
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
