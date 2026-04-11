package controllers

import (
	"AuthInGo/services"
	"fmt"
	"net/http"
)

type UserController struct {
	UserService services.UserService
}

func NewUserController(_userService services.UserService) *UserController{
	return &UserController{
		UserService: _userService,
	}
}

func (uc *UserController) GetUserById(w http.ResponseWriter, r *http.Request) {
	_, _ = uc.UserService.GetUserById("")
	w.Write([]byte("User fetching endpoint"))
}
func (uc *UserController) CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("User Creating endpoint"))
	uc.UserService.CreateUser()
}
func (uc *UserController) LoginUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Login User Service is called")
	uc.UserService.LoginUser()
	w.Write([]byte("Login endpoint Done "))
}