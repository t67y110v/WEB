package server

import (
	//"html/template"
	"net/http"
	"webgo/internal/app/logging"
	"webgo/internal/app/store"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html"
)

type server struct {
	router *fiber.App
	logger logging.Logger
	store  store.AllStore
	config *Config
}

func newServer(store store.AllStore, config *Config) *server {
	engine := html.New("templates", ".html")
	s := &server{
		router: fiber.New(fiber.Config{
			Views:        engine,
			ServerHeader: "Курсовая работа",
			AppName:      "Test App v1.0.1",
		}),
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
	s.router.Get("/", s.mainPageHandler)
}

func (s *server) mainPageHandler(c *fiber.Ctx) error {
	return c.Render("mainpage", fiber.Map{
		"Name": "bob",
	})
}
