// Package dbops used to serve the web
package dbops

import "embed"

//go:embed dist/*
var WebFiles embed.FS
