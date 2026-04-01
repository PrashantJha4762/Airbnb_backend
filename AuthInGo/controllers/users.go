package controllers

import (
	"AuthInGo/services"
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

func (uc *UserController) RegisterUser(w http.ResponseWriter, r *http.Request) {
	_, _ = uc.UserService.GetUserById("")
	w.Write([]byte("User fetching endpoint"))
}
