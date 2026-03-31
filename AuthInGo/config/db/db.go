package config

import (
	env "AuthInGo/config/env"
	"database/sql"
	"fmt"

	"github.com/go-sql-driver/mysql"
)

func SetUpDB() (*sql.DB,error) {
	cfg := mysql.NewConfig()

	cfg.User=env.GetString("DB_USER","root")
	cfg.Passwd=env.GetString("DB_PASSWORD","root")
	cfg.Net=env.GetString("DB_NET","tcp")
	cfg.DBName=env.GetString("DB_NAME","root")
	cfg.Addr=env.GetString("DB_ADDR","127.0.0.1:3306")

	fmt.Println("Connecting to the database")

	db,err:=sql.Open("mysql",cfg.FormatDSN())
	if err!=nil {
		fmt.Println("Error while connecting to the database")
		return nil,err
	}
	fmt.Println("Trying to connect to the db")
	pingErr:=db.Ping()
	if pingErr!=nil{
		fmt.Println("Not able to connect to the db")
		return nil,pingErr
	}
	fmt.Println("Successfully connected to the db",cfg.DBName)
	return db,nil
}