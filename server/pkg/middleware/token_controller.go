package middleware

import "github.com/gofiber/fiber/v2"

func GetNewAccesToken(c *fiber.Ctx) error {
	token, err := GenerateNewAccessToken(c.FormValue("email"))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"error":        false,
		"msg":          nil,
		"access_token": token,
	})

}
