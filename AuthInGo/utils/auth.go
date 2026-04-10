package utils

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func Hashedpasswords(pwd string) (string ,error) {
	hashedpwd,hasherr:=bcrypt.GenerateFromPassword([]byte(pwd),bcrypt.DefaultCost)
	if hasherr!=nil{
		fmt.Println("Error while hashing the password")
	}
	return string(hashedpwd),nil
}