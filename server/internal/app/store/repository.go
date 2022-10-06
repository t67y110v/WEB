package store

import "webgo/internal/app/model"

type AllStoreRepository interface {
	Create(*model.User) error
	FindByEmail(string) (*model.User, error)
	FindByID(string) (*model.User, error)
}
