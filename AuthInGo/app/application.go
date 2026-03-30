package app

import (
	config "AuthInGo/config/env"
	db "AuthInGo/db/repositories"
	"AuthInGo/router"
	"fmt"
	"net/http"
	"time"
)

type Config struct {
	Addr string
}
type Application struct {
	Config Config
	Store  db.Storage
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
		Store: *db.NewStorage(),
	}
}

func (app *Application) Run() error {
	server := &http.Server{
		Addr:app.Config.Addr,
		Handler:router.SetUpRouter(),
		ReadTimeout:10*time.Second,
		WriteTimeout:10*time.Second,
	}
	fmt.Println("Staring the server at",app.Config.Addr)
	return server.ListenAndServe()
}
