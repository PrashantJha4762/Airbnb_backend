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
	LoginUser() error
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
func (u *UserServiceImpl)LoginUser() error{
	fmt.Println("Login user in UserService")
	email:="def@gmail.com"
	passwd:="kyahaalh"
	user,err:=u.userRepository.GetByEmail(email)
	if err!=nil{
		fmt.Println("Error fetching the details with the email")
		return fmt.Errorf("No user found with the email:%s",email)
	}
	if user==nil{
		fmt.Println("No user found with the corresponding email")
	}
	if !utils.Comparepasswords(passwd,user.Password){
		fmt.Println("Invalid password")
		fmt.Errorf("Invalid password for the email : %s",email)
	}
	fmt.Println("User has been found and jwt token will be created")
	return nil;
}
