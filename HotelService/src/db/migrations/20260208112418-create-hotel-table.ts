import { DataTypes, QueryInterface } from "sequelize";

//The up function is used to define the changes to be made to the database when the migration is run, while the down function is used to define how to revert those changes if the migration needs to be undone. In this case, you would typically use the up function to create the hotel table and the down function to drop it.

module.exports = {
  async up (queryInterface:QueryInterface) {       //this function is responsible for creating the hotel table in the database. It uses the queryInterface object to define the structure of the table, including its columns and their data types. The table will have columns for id, name, location, rating, createdAt, and updatedAt.
    await queryInterface.createTable("hotels", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface:QueryInterface) {
    await queryInterface.dropTable('hotels')//this function is responsible for dropping the hotel table from the database. It also uses the queryInterface object to perform this action. If you need to revert the changes made by the up function, you can run the down function to remove the hotel table from the database.
  }
};