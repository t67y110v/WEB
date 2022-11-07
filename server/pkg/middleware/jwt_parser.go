package middleware

import (
	//"fmt"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

type TokenMetadata struct {
	Expires int64
	Id      float64
}

func ExtractTokenMetaData(t string) (int64, float64, error) {
	token, err := verifyToken(t)
	if err != nil {
		//fmt.Println("verify error")
		return 0, 0, err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		expries := int64(claims["exp"].(float64))
		id := float64(claims["id"].(float64))
		return expries, id, nil
	}
	//fmt.Println("exctract error")
	return 0, 0, err
}

func extractToken(c *fiber.Ctx) string {

	bearToken := c.Get("jwt")
	onlyToken := strings.Split(bearToken, " ")
	if len(onlyToken) == 2 {
		return onlyToken[1]
	}

	return ""
}

func verifyToken(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, jwtKeyFunc)
	if err != nil {
		return nil, err
	}
	return token, nil
}

func jwtKeyFunc(token *jwt.Token) (interface{}, error) {
	return []byte("secret"), nil
}
