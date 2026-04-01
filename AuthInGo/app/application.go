package app

import (
	config "AuthInGo/config/env"
	"AuthInGo/controllers"
	repo "AuthInGo/db/repositories"
	"AuthInGo/router"
	"AuthInGo/services"
	"fmt"
	"net/http"
	"time"
	dbConfig "AuthInGo/config/db"
)

type Config struct {
	Addr string
}
type Application struct {
	Config Config
	Store  repo.Storage
}

func NewConfig()Config{
	port:=config.GetString("PORT",":8080")
	return Config{
		Addr: port,
	}
}
func NewApplication(cfg Config) *Application{
	return &Application{
		Config: cfg,
		Store: *repo.NewStorage(),
	}
}

func (app *Application) Run() error {

	db,err:=dbConfig.SetUpDB()
	if err!=nil{
		fmt.Println("Error while setting up the db",err)
		return err
	}

	ur:=repo.NewUserRepository(db)
	us:=services.NewUserService(ur)
	uc:=controllers.NewUserController(us)
	uRouter:=router.NewUserRouter(uc)
	server := &http.Server{
		Addr:app.Config.Addr,
		Handler:router.SetUpRouter(uRouter),
		ReadTimeout:10*time.Second,
		WriteTimeout:10*time.Second,
	}
	fmt.Println("Starting the server at",app.Config.Addr)
	return server.ListenAndServe()
}
