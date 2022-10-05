package middleware

import (
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

func GenerateNewAccessToken(name string) (string, error) {
	secret := "secret"
	minutesCount, _ := strconv.Atoi("15")
	claims := jwt.MapClaims{}
	claims["exp"] = time.Now().Add(time.Minute * time.Duration(minutesCount)).Unix()
	claims["username"] = name
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	t, err := token.SignedString([]byte(secret))
	if err != nil {
		return "", nil
	}

	return t, nil

}
