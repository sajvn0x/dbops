package database

import "database/sql"

type DBQueries interface {
	// ------------------------
	// Users
	// ------------------------
	// ListUsers returns all database users
	ListUsers() ([]map[string]any, error)

	// GetUserByName returns details of a single user
	GetUserByName(username string) (map[string]any, error)

	// ------------------------
	// Tables
	// ------------------------
	// ListTables returns all user tables in the current schema
	ListTables() ([]string, error)

	// GetTableColumns returns column metadata for a table
	GetTableColumns(tableName string) ([]ColumnInfo, error)

	// GetTableRowCount returns approximate row count for a table
	GetTableRowCount(tableName string) (int64, error)

	// ------------------------
	// Views
	// ------------------------
	// ListViews returns all views in the current schema
	ListViews() ([]string, error)

	// GetViewDefinition returns the SQL definition of a view
	GetViewDefinition(viewName string) (string, error)

	// ------------------------
	// Indexes
	// ------------------------
	// ListIndexes returns all indexes for a table
	ListIndexes(tableName string) ([]IndexInfo, error)

	// ------------------------
	// Sequences
	// ------------------------
	// ListSequences returns all sequences in the current schema
	ListSequences() ([]string, error)

	// GetSequenceValue returns the current value of a sequence
	GetSequenceValue(seqName string) (int64, error)

	// ------------------------
	// Triggers
	// ------------------------
	// ListTriggers returns all triggers in the current schema
	ListTriggers() ([]string, error)

	// GetTriggerDefinition returns the SQL definition of a trigger
	GetTriggerDefinition(triggerName string) (string, error)

	// ------------------------
	// Query Execution
	// ------------------------
	// ExecuteQuery runs a SELECT query and returns results as rows
	ExecuteQuery(query string, args ...any) ([]map[string]any, error)

	// ExecuteCommand runs INSERT/UPDATE/DELETE and returns affected row count
	ExecuteCommand(query string, args ...any) (int64, error)
}

type ColumnInfo struct {
	Name      string
	DataType  string
	Nullable  bool
	Default   sql.NullString
	Length    sql.NullInt64
	Precision sql.NullInt64
	Scale     sql.NullInt64
	IsPrimary bool
	IsUnique  bool
	Comment   sql.NullString
}

// IndexInfo holds metadata about a table index
type IndexInfo struct {
	Name      string
	Columns   []string
	IsUnique  bool
	IsPrimary bool
}
