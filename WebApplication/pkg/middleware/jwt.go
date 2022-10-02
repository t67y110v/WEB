package middleware

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/pkg/errors"
)

type TokenPayload struct {
	ID uint
}

func Generate(payload *TokenPayload) string {

	v, err := time.ParseDuration("15")
	if err != nil {
		panic("invalid time duration")
	}
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"exp": time.Now().Add(v).Unix(),
		"ID":  payload.ID,
	})

	token, err := t.SignedString([]byte("secret"))
	if err != nil {
		panic(err)
	}

	return token

}

func parse(token string) (*jwt.Token, error) {
	return jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signig nethod : %v", t.Header["alg"])
		}

		return []byte("secret"), nil
	})
}

func Verify(token string) (*TokenPayload, error) {
	parsed, err := parse(token)
	if err != nil {
		return nil, err
	}
	claims, ok := parsed.Claims.(jwt.MapClaims)
	if !ok {
		return nil, err
	}
	id, ok := claims["ID"].(float64)
	if !ok {
		return nil, errors.New("Somethink went wrong ")
	}

	return &TokenPayload{
		ID: uint(id),
	}, nil
}
