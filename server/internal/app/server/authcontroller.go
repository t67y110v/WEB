package server

import (
	//"html/template"

	"bytes"
	//"fmt"
	"strconv"

	"encoding/json"

	//	"log"

	"time"
	"webgo/internal/app/model"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func (s *server) RegisterHandler(c *fiber.Ctx) error {
	var data map[string]string

	err := c.BodyParser(&data)
	if err != nil {
		return err

	}
	u := &model.User{
		Email:       data["email"],
		Password:    data["password"],
		Name:        data["name"],
		SeccondName: data["seccondname"],
	}
	if err = s.store.Everythink().Create(u); err != nil {
		return err
	}

	u.Sanitize()

	return c.JSON(u)

}

func (s *server) FiberLogin(c *fiber.Ctx) error {
	type request struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	req := &request{}
	reader := bytes.NewReader(c.Body())
	if err := json.NewDecoder(reader).Decode(req); err != nil {
		s.logger.Warningf("handle login, status :%d, error :%e", fiber.StatusBadRequest, err)

	}
	u, err := s.store.Everythink().FindByEmail(req.Email)
	if err != nil {
		return err
	}
	if u.ID == 0 {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "user not found",
		})
	}
	secret := "secret"
	minutesCount, _ := strconv.Atoi("15")
	claims := jwt.MapClaims{}
	claims["exp"] = time.Now().Add(time.Minute * time.Duration(minutesCount)).Unix()
	claims["id"] = u.ID
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	t, err := token.SignedString([]byte(secret))
	if err != nil {
		return err
	}

	return c.JSON(fiber.Map{
		"token": t,
		"name":  u.Name,
		"email": u.Email,
	})

}

func (s *server) Login(c *fiber.Ctx) error {

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	//u := &model.User{}
	u, err := s.store.Everythink().FindByEmail(data["email"])
	if err != nil {
		return err
	}
	if u.ID == 0 {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "user not found",
		})
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.RegisteredClaims{
		Issuer:    strconv.Itoa(int(u.ID)),
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24)),
	})
	token, err := claims.SignedString([]byte("secret"))

	//fmt.Println(token)

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "could not login",
			"token":   token,
		})
	}
	cookie := fiber.Cookie{
		Name:        "jwt",
		Value:       token,
		Expires:     time.Now().Add(time.Hour * 24),
		HTTPOnly:    true,
		SessionOnly: true,
	}
	c.Cookie(&cookie)
	return c.JSON(u)
}

func (s *server) User(c *fiber.Ctx) error {

	type request struct {
		Cookie string `json:"token"`
	}
	req := &request{}
	reader := bytes.NewReader(c.Body())
	if err := json.NewDecoder(reader).Decode(req); err != nil {
		s.logger.Warningf("handle user,  error :%e", err)

	}
	cookie := req.Cookie
	//_, id, err := middleware.ExtractTokenMetaData(cookie)
	tokenString := cookie
	claims := jwt.MapClaims{}
	_, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte("secret"), nil
	})
	//expries := int64(claims["exp"].(float64))
	if claims["id"] == nil {
		s.logger.Warningf("handle user,  error :%e", err)
		return c.JSON(fiber.Map{
			"message": "token id is nil",
		})
	}
	id := float64(claims["id"].(float64))
	u, err := s.store.Everythink().FindByID(strconv.Itoa(int(id)))
	if err != nil {
		return err
	}

	return c.JSON(u)

}

func (s *server) Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "success",
	})
}
