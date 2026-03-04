package app

import (
	"os"

	"gopkg.in/yaml.v3"

	"arx.io/dbops/internal/auth"
)

type AppConfig struct {
	App   map[string]any `yaml:"app"`
	Users []auth.User    `yaml:"users"`
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
