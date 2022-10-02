package server

import (
	"database/sql"
	"log"
	"os"
	"os/signal"
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
	StartServerWithGracefulShutdown(server, config.BindAddr)
	return nil
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

func StartServerWithGracefulShutdown(s *server, addr string) {
	idleConnsClosed := make(chan struct{})
	go func() {
		sigint := make(chan os.Signal, 1)
		signal.Notify(sigint, os.Interrupt)
		<-sigint

		if err := s.router.Shutdown(); err != nil {
			s.logger.Warningf("Server is not shutting down! reason: %v", err)
		}
		close(idleConnsClosed)
	}()
	if err := s.router.Listen(addr); err != nil {
		s.logger.Warningf("Server is not running! reason: %v", err)
	}
	<-idleConnsClosed

}
