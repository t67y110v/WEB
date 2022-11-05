package server

import (
	//"html/template"
	"net/http"
	"webgo/internal/app/logging"
	"webgo/internal/app/store"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"github.com/gofiber/fiber/v2/middleware/logger"
)

type server struct {
	router *fiber.App
	logger logging.Logger
	store  store.AllStore
	config *Config
}

func newServer(store store.AllStore, config *Config) *server {
	s := &server{
		router: fiber.New(fiber.Config{ServerHeader: "Курсовая работа", AppName: "Test App v1.0.1"}),
		logger: logging.GetLogger(),
		store:  store,
		config: config,
	}
	s.configureRouter()
	return s
}

func (s *server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
}

func (s *server) configureRouter() {
	s.router.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowHeaders:     "Origin, Content-Type, Accept",
	}))
	//api := s.router.Group("/api")
	//api.Use(logger.New())
	s.router.Post("/api/register", s.RegisterHandler, logger.New())
	s.router.Post("/api/login", s.FiberLogin, logger.New())
	s.router.Post("/api/user", s.User, logger.New())
	s.router.Post("/api/logout", s.Logout, logger.New())

}
