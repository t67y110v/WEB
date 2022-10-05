package middleware

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	jwtMiddleware "github.com/gofiber/jwt/v2"
)

func JWTProtected() func(*fiber.Ctx) error {

	config := jwtMiddleware.Config{
		SigningKey:   []byte("secret"),
		ErrorHandler: jwtError,
	}
	return jwtMiddleware.New(config)

}

func jwtError(c *fiber.Ctx, err error) error {
	if err.Error() == "Missing or malformed JWT" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
		"error": true,
		"msg":   err.Error(),
	})
}

func Auth(c *fiber.Ctx) error {
	h := c.Get("Authorization")

	if h == "" {
		return fiber.ErrUnauthorized
	}
	chunks := strings.Split(h, " ")
	if len(chunks) < 2 {
		return fiber.ErrUnauthorized
	}

	user, err := Verify(chunks[1])
	if err != nil {
		return fiber.ErrUnauthorized
	}
	c.Locals("USER", user.ID)
	return c.Next()
}
