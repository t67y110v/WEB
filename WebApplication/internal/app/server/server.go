package server

import (
	//"html/template"
	"net/http"
	"webgo/internal/app/logging"
	"webgo/internal/app/model"
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
	s.router.Get("/auth_user", s.authUserHandler)
	s.router.Get("/main", s.mainHandler)
}

func (s *server) mainPageHandler(c *fiber.Ctx) error {
	c.FormValue("login")
	c.FormValue("password")
	return c.Render("mainpage", fiber.Map{
		"Name": c.FormValue("password"),
	})
}

func (s *server) mainHandler(c *fiber.Ctx) error {
	return c.Render("main", fiber.Map{
		"Name": c.FormValue("password"),
	})
}

func (s *server) authUserHandler(c *fiber.Ctx) error {
	c.FormValue("email")
	c.FormValue("password")
	u := &model.User{
		Email:       c.FormValue("email"),
		Password:    c.FormValue("password"),
		Name:        c.FormValue("username"),
		SeccondName: c.FormValue("seccondname"),
	}
	if err := s.store.Everythink().Create(u); err != nil {

		s.logger.Warningf("handle /userCreate, status :%d, error :%e", http.StatusUnprocessableEntity, err)
		c.Redirect("/", 400)
		return err
	}
	u.Sanitize()
	c.Redirect("/main", 301)
	return nil
}
