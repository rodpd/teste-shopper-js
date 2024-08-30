'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Measures', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      measure_datetime: {
        type: Sequelize.DATEONLY
      },
      measure_type: {
        type: Sequelize.STRING
      },
      has_confirmed: {
        type: Sequelize.BOOLEAN
      },
      measure_value: {
        type: Sequelize.INTEGER
      },
      image_url: {
        type: Sequelize.STRING
      },
      CustomerId: {
        type: Sequelize.STRING,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Measures');
  }
};