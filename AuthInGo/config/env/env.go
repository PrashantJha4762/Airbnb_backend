package config

import (
	"fmt"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

func load() {
	err:=godotenv.Load();
	if err!=nil{
		fmt.Println("Error while loading the env file")
	}
}

//it is the fn which is going to return us the string based environment variable 
func GetString(key string,fallback string) string{
	load()
	value,ok:=os.LookupEnv(key)
	if !ok{
		return fallback
	}
	return value
}

func GetInt(key string ,fallback int) int{
	load()
	value,ok:=os.LookupEnv(key);
	if !ok{
		return fallback
	}
	intval,err:=strconv.Atoi(value)

	if err!=nil{
		fmt.Println("Unable to do the type conversion from string to integer")
	}
	return intval
}

func GetBool(key string ,fallback bool) bool{
	load()
	value,ok:=os.LookupEnv(key);
	if !ok{
		return fallback
	}
	boolval,err:=strconv.ParseBool(value)

	if err!=nil{
		fmt.Println("Unable to do the type conversion from string to boolean")
	}
	return boolval
}