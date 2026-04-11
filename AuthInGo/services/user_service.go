package services

import (
	db "AuthInGo/db/repositories"
	"AuthInGo/models"
	"AuthInGo/utils"
	"fmt"
)

type UserService interface {
	GetUserById(id string) (*models.User, error)
	CreateUser() error
}
type UserServiceImpl struct {
	userRepository db.UserRepository 
}

func NewUserService(_userRepository db.UserRepository) UserService {
	return &UserServiceImpl{
		userRepository: _userRepository,
	}
}
func (u *UserServiceImpl) GetUserById(id string) (*models.User, error) {
	fmt.Println("Fetching user in UserService")
	user, err := u.userRepository.GetByID(id)
	if err != nil {
		fmt.Println("Error fetching user:", err)
		return nil, err
	}
	return user, nil
}
func (u *UserServiceImpl) CreateUser() error{
	pwd:="abx123"
	hashpwd,herr:=utils.Hashedpasswords(pwd)
	if herr != nil {
		fmt.Println("Error while creating the user")
		return herr
	}
	u.userRepository.Create("Yahoo","yahoo@gmail.com",hashpwd)
	return nil
}
