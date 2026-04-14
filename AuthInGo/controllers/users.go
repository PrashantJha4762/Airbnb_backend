package controllers

import (
	"AuthInGo/dto"
	"AuthInGo/services"
	"AuthInGo/utils"
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
	var payload dto.CreateUserDto
	uc.UserService.CreateUser(&payload)
}
func (uc *UserController) LoginUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Login User Service is called")
	var payload dto.LoginUserRequestDTO

	jsonerr:=utils.ReadJsonBody(r,&payload)

	if jsonerr!=nil{
		w.Write([]byte("Something went wrong"))
		return
	}
	validationerr:=utils.Validator.Struct(payload)
	if validationerr!=nil{
		w.Write([]byte("Invalid Payload"))
		return
	}

	token,err:=uc.UserService.LoginUser(&payload)
	if err!=nil{
		w.Write([]byte("Something went wrong "))
	}
	response:=map[string]any{
		"message":"User Logged In Successfully",
		"data":token,
		"success":true,
		"error":nil,
	}
	utils.WriteJsonResponse(w,http.StatusOK,response);

}