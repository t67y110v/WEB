package server

import (
	//"html/template"
	"net/http"
	"webgo/internal/app/logging"
	"webgo/internal/app/store"
	"webgo/pkg/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/gofiber/fiber/v2/middleware/recover"
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
		router: fiber.New(fiber.Config{Views: engine, ServerHeader: "Курсовая работа", AppName: "Test App v1.0.1"}),
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
	//private := s.router.Group("/private")
	//private.Use(middleware.JWTProtected())
	//s.router.Get("/", s.registrationPageHandler)
	//s.router.Get("/auth", s.authPageHandler)

	auth := s.router.Group("/auth")
	auth.Get("/signup", s.registrationPageHandler)
	auth.Get("/login", s.authPageHandler)

	private := s.router.Group("/private").Use(middleware.Auth)
	private.Get("/main", s.mainHandler)
	private.Get("/dashboard", monitor.New())
	private.Get("/token/new", middleware.GetNewAccesToken)

	s.router.Post("/session", s.createSessionHandler, s.mainHandler)
	s.router.Get("/auth_user", s.authUserHandler, s.mainHandler)
	s.router.Use(logger.New())
	s.router.Use(recover.New())

}

func (s *server) registrationPageHandler(c *fiber.Ctx) error {
	return c.Render("registration", fiber.Map{
		"Name": c.FormValue("password"),
	})
}

func (s *server) authPageHandler(c *fiber.Ctx) error {
	return c.Render("auth", fiber.Map{
		"Name": c.FormValue("password"),
	})
}

func (s *server) mainHandler(c *fiber.Ctx) error {
	s.logger.Warningf("Auth is : %s", c.Get("Authorization"))
	s.logger.Warningf("User is : %s", c.Get("USER"))
	/*now := time.Now()
	var err error
	claims, err := middleware.ExtractTokenMetaData(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	expires := claims.Expires
	if now.Unix() > expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": true,
			"msg":   "unauthorized, check expiration time of your token",
		})
	} */
	return c.Render("main", fiber.Map{
		"Name": c.FormValue("password"),
	})
}
