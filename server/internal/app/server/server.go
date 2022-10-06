package server

import (
	//"html/template"
	"net/http"
	"webgo/internal/app/logging"
	"webgo/internal/app/store"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
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
	s.router.Post("/session", s.RegisterHandler)
	s.router.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))
	s.router.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})
	api := s.router.Group("/api")
	api.Use(logger.New())
	s.router.Post("/register", s.RegisterHandler)
	s.router.Post("/login", s.Login)
	s.router.Get("/user", s.User)
	s.router.Post("/logout", s.Logout)

	s.router.Use(recover.New())

}
