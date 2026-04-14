package services

import (
	env "AuthInGo/config/env"
	db "AuthInGo/db/repositories"
	"AuthInGo/dto"
	"AuthInGo/models"
	"AuthInGo/utils"
	"fmt"

	"github.com/golang-jwt/jwt/v5"
)

type UserService interface {
	GetUserById(id string) (*models.User, error)
	CreateUser(payload *dto.CreateUserDto) error
	LoginUser(payload *dto.LoginUserRequestDTO) (string,error)
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
func (u *UserServiceImpl) CreateUser(payload *dto.CreateUserDto) error{
	hashpwd,herr:=utils.Hashedpasswords(payload.Password)
	if herr != nil {
		fmt.Println("Error while creating the user")
		return herr
	}
	u.userRepository.Create(payload.Username,payload.Email,hashpwd)
	return nil
}
func (u *UserServiceImpl)LoginUser(payload *dto.LoginUserRequestDTO) (string,error){
	fmt.Println("Login user in UserService")
	email:=payload.Email
	passwd:=payload.Password
	user,err:=u.userRepository.GetByEmail(email)
	if err!=nil{
		fmt.Println("Error fetching the details with the email")
		return "", fmt.Errorf("No user found with the email:%s",email)
	}
	if user==nil{
		fmt.Println("No user found with the corresponding email")
	}
	if !utils.Comparepasswords(passwd,user.Password){
		fmt.Println("Invalid password")
		return "", fmt.Errorf("Invalid password for the email : %s",email)
	}
	jwtpayload:=jwt.MapClaims{
		"email":user.Email,
		"id":user.Id,
	}
	token:=jwt.NewWithClaims(jwt.SigningMethodHS256,jwtpayload)

	tokenstring,tokenerr:=token.SignedString([]byte(env.GetString("JWT_SECRET","TOKEN")))
	if tokenerr!=nil{
		fmt.Println("Error signing token",tokenerr)
		return "",tokenerr
	}
	return tokenstring,nil;
}
