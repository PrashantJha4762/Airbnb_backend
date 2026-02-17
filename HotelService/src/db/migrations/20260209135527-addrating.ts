import { QueryInterface } from "sequelize"

  module.exports={
    async up (queryInterface:QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE HOTELS
      ADD COLUMN rating_count INT DEFAULT NULL;
      `)
    } ,

      async down (queryInterface:QueryInterface) {
        await queryInterface.sequelize.query(`
          ALTER TABLE HOTELS
          DROP COLUMN rating,
          DROP COLUMN rating_count;
          `)
     }

  }
