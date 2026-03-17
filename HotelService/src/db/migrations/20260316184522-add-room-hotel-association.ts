import { QueryInterface} from "sequelize"
module.exports = {
  async up (queryInterface:QueryInterface) {
    await queryInterface.addConstraint('rooms',{
      type:'foreign key',
      name:'foreign-key-constraints',
      fields:['hotel_id'],
      references:{
        table:'hotel',
        field:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    })
  },

  async down (queryInterface:QueryInterface) {
      await queryInterface.removeConstraint('rooms','foreign-key-constraints')
  }
};
