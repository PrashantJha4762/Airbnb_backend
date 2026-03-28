package Config

import (
	"fmt"
	"os"

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