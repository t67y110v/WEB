package server

import (
	"database/sql"
	"log"
	store "webgo/internal/app/store/sqlstore"
)

func Start(config *Config) error {
	db, err := newDB(config.DatabaseURL)
	if err != nil {
		return err
	}
	defer db.Close()
	store := store.New(db)
	server := newServer(store, config)
	return server.router.Listen(config.BindAddr)
}

func newDB(databaseURL string) (*sql.DB, error) {
	log.Printf("Database initialization: %s\n", databaseURL)
	db, err := sql.Open("postgres", databaseURL)
	if err != nil {
		return nil, err
	}
	if err := db.Ping(); err != nil {
		return nil, err
	}
	return db, nil
}
