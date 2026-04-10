package main

import (
	"AuthInGo/app"
	"log"
)

func main() {
	cfg := app.NewConfig()
	application := app.NewApplication(cfg)

	if err := application.Run(); err != nil {
		log.Fatalf("server stopped: %v", err)
	}
}
