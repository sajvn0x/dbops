package app

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v3"

	"arx.io/dbops/internal/auth"
)

type AppConfig struct {
	App       map[string]any   `yaml:"app"`
	Databases []DatabaseConfig `yaml:"databases"`
	Users     []auth.User      `yaml:"users"`
}

type DatabaseConfig struct {
	Name     string `yaml:"name"`
	Type     string `yaml:"type"`
	Host     string `yaml:"host"`
	Port     int    `yaml:"port"`
	User     string `yaml:"user"`
	Password string `yaml:"password"`
	// oracle
	ServiceName string `yaml:"service_name,omitempty"`
	// postgresql / mysql
	DatabaseName string `yaml:"database,omitempty"`
}

func (c *DatabaseConfig) DSN() (string, error) {
	switch c.Type {
	case "oracle":
		if c.ServiceName == "" {
			return "", fmt.Errorf("service_name required for Oracle")
		}
		return fmt.Sprintf(`user="%s" password="%s" connectString="%s:%d/%s" timezone="Asia/Colombo"`,
			c.User, c.Password, c.Host, c.Port, c.ServiceName), nil

	case "postgres":
		if c.DatabaseName == "" {
			return "", fmt.Errorf("database required for PostgreSQL")
		}
		// postgres://user:pass@host:port/dbname?sslmode=disable
		return fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
			c.Host, c.Port, c.User, c.Password, c.DatabaseName), nil

	case "mysql":
		if c.DatabaseName == "" {
			return "", fmt.Errorf("database required for MySQL")
		}

		// user:pass@tcp(host:port)/dbname
		return fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=true",
			c.User, c.Password, c.Host, c.Port, c.DatabaseName), nil

	default:
		return "", fmt.Errorf("unsupported database type: %s", c.Type)
	}
}

func LoadConfig(path string) (*AppConfig, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var cfg AppConfig
	err = yaml.Unmarshal(data, &cfg)

	if err != nil {
		return nil, err
	}
	return &cfg, nil
}
