package db

import (
	"AuthInGo/models"
	"database/sql"
	"fmt"
)

type UserRepository interface {
	GetByID(id string) (*models.User, error)
	Create(username string,email string, password string) error
	GetAll() ([]*models.User, error)
	DeleteById(id int64) error
}

type UserRepositoryImpl struct {
	db *sql.DB
}

func (u *UserRepositoryImpl) Create(username string, email string,hashpwd string) error {
	query := "INSERT INTO users(username,email,password) VALUES(?,?,?)"
	result, err := u.db.Exec(query,username,email,hashpwd)
	if err != nil {
		fmt.Println("Error inserting user", err)
		return err
	}
	rowAffected, rowError := result.RowsAffected()
	if rowError != nil {
		fmt.Println("Error getting rows effected", rowError)
		return rowError
	}
	if rowAffected == 0 {
		fmt.Println("No rows were effected")
		return nil
	}
	fmt.Println("Users created successfully", rowAffected)
	return nil
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

func (u *UserRepositoryImpl) GetAll() ([]*models.User, error) {
	rows, err := u.db.Query("Select id, username,email,created_at,updated_at from users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var allUsers []*models.User

	for rows.Next() {
		user := new(models.User)
		err := rows.Scan(&user.Id, &user.Username, &user.Email, &user.CreatedAt, &user.UpdatedAt)
		if err != nil {
			fmt.Println("Failed to scan user", err)
			return nil, err
		}
		allUsers = append(allUsers, user)
	}
	errr := rows.Err()
	if errr != nil {
		fmt.Println("Got row error", errr)
		return nil, errr
	}
	for _, user := range allUsers {
		fmt.Printf("ID:%d|Username:%s|Email:%s|Created_at:%s|Updated_at:%s\n", user.Id, user.Username, user.Email, user.CreatedAt, user.UpdatedAt)
	}

	return allUsers, nil
}

func (u *UserRepositoryImpl) DeleteById(id int64) error {
	query := "Delete from users where id =?"

	result, err := u.db.Exec(query, id)
	if err != nil {
		fmt.Println("Error deleting the user", err)
		return err
	}
	rowAffected, rowErr := result.RowsAffected()
	if rowErr != nil {
		fmt.Println("Error geting row affected", rowErr)
		return rowErr
	}
	if rowAffected == 0 {
		fmt.Println("No rows were effected and no user deleted")
		return nil
	}
	fmt.Println("User succefully deleted, rows affected:", rowAffected)

	return nil
}
func NewUserRepository(_db *sql.DB) UserRepository {
	return &UserRepositoryImpl{
		db: _db,
	}
}
