package server

import (
	//"html/template"
	"errors"
	//	"log"
	"net/http"

	"time"
	"webgo/internal/app/model"
	"webgo/pkg/middleware"

	"github.com/gofiber/fiber/v2"
)

func (s *server) authUserHandler(c *fiber.Ctx) error {
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
	//c.Get("Authorization")

	return c.Next()
}

func (s *server) createSessionHandler(c *fiber.Ctx) error {
	var err error

	u := &model.User{
		Email:    c.FormValue("email"),
		Password: c.FormValue("password"),
	}
	if u, err = s.store.Everythink().FindByEmail(c.FormValue("email")); err != nil {
		s.logger.Warningf("handlde /session, status :%d, error:%e", http.StatusUnprocessableEntity, err)
		c.Redirect("/", 400)
		return err
	}
	if err != nil || !u.ComparePassword(c.FormValue("password")) {
		s.logger.Warningf("handlde /session, status :%d, error:%e", http.StatusUnauthorized, errors.New("incorrect email or password"))
		c.Redirect("/", 400)
		return err
	}
	t, _ := middleware.GenerateNewAccessToken(u.Name)
	//c.Set("Authorization", "Beaver "+t)
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    t,
		Expires:  time.Now().Add(time.Hour * 1),
		HTTPOnly: true,
		Secure:   true,
	}

	c.Cookie(&cookie)
	//c.Get("Authorization")
	c.Locals("Authorization", "Beaver "+t)
	return c.Next()
}

func (s *server) NotFound(c *fiber.Ctx) error {
	return c.Status(404).SendFile("./wwwroot/private/404.html")
}
