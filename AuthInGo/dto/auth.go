package dto

type LoginUserRequestDTO struct{
	Email string `json:"email" validate="required,email"`
	Password string
}