package db

import (
	"database/sql"
	"fmt"
)

type UserRepository interface {
	Create() error
}

type UserRepositoryImpl struct {
	db *sql.DB
}

func (u *UserRepositoryImpl) Create() error {
	fmt.Println("Creating user in user repository")
	return nil
}
func NewUserRepository(_db *sql.DB) UserRepository {
	return &UserRepositoryImpl{
		db: _db,
	}
}