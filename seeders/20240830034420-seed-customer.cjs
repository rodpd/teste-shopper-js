module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('Customers', [{
    customer_code: '0'
   }, {
    customer_code: '1'
   }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Customers', null, {});
  }
};
