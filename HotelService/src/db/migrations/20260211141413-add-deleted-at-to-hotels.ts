import { DataTypes, QueryInterface } from "sequelize"

//we have made this migration to introduce the concept of soft delete in our application.
//soft delete means that instead of deleting the record from the database, we will mark it as deleted by setting the deletedAt field to the current date and time. This way we can keep the record in the database and also we can restore it if needed.

//there is support for soft delete in sequelize by using the paranoid option in the model definition. When we set paranoid to true, sequelize will automatically add a deletedAt field to the model and will not return the records that have deletedAt set to a non-null value in the queries.

//but we are manually doing it

  module.exports= {
    async up (queryInterface:QueryInterface) {
    await queryInterface.addColumn('hotels','deletedAt',{
        type:DataTypes.DATE,
        allowNull:true,
        defaultValue:null
    })
  },

  async down (queryInterface:QueryInterface) {
    await queryInterface.removeColumn('hotels','deletedAt');
  }
};
