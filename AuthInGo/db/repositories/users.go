package db

import (
	"AuthInGo/models"
	"database/sql"
	"fmt"
)

type UserRepository interface {
	GetByID(id string) (*models.User, error)
	Create()(*models.User, error)
}

type UserRepositoryImpl struct {
	db *sql.DB
}
func (u *UserRepositoryImpl) Create()(*models.User, error){
	query:="INSERT INTO users(username,email,password) VALUES(?,?,?)"
	result,err:=u.db.Exec(query,"testuser","test@gmail.com","password123")
	if err!=nil{
		fmt.Println("Error inserting user",err)
		return nil, err
	}
	rowAffected,rowError:=result.RowsAffected()
	if rowError!=nil{
		fmt.Println("Error getting rows effected",rowError)
		return nil,rowError
	}
	if rowAffected==0{
		fmt.Println("No rows were effected")
		return nil,nil
	}
	fmt.Println("Users created successfully",rowAffected)
	return nil,nil
}

func (u *UserRepositoryImpl) GetByID(id string) (*models.User, error) {
	fmt.Println("Fetching user in UserRepository")

	// Step 1: Prepare the query
	query := "SELECT id, username, email, created_at, updated_at FROM users WHERE id = ?"

	// Step 2: Execute the query
	row := u.db.QueryRow(query, id)

	// Step 3: Process the result
	user := &models.User{}

	err := row.Scan(&user.Id, &user.Username, &user.Email, &user.CreatedAt, &user.UpdatedAt)

	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("No user found with the given ID")
			return nil, err
		} else {
			fmt.Println("Error scanning user:", err)
			return nil, err
		}
	}

	// Step 4: Print the user details
	fmt.Println("User fetched successfully:", user)

	return user, nil
}
func NewUserRepository(_db *sql.DB) UserRepository {
	return &UserRepositoryImpl{
		db: _db,
	}
}