module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('Measures', [{
    uuid: 'c3efff24-a9a4-4a1f-8027-d57fd84d17b2',
    measure_datetime: '2024-06-01',
    measure_type: 'WATER',
    has_confirmed: true,
    measure_value: 123,
    image_url: 'https://google.com',
    CustomerId: 0
   }, {
    uuid: '25e892c2-4fb8-4aba-8031-5f99275bd8b3',
    measure_datetime: '2024-07-01',
    measure_type: 'GAS',
    has_confirmed: true,
    measure_value: 456,
    image_url: 'https://google.com',
    CustomerId: 0
   }, {
    uuid: 'cae7583c-4f8c-4308-9cd4-e3c6163d6b6a',
    measure_datetime: '2024-08-01',
    measure_type: 'WATER',
    has_confirmed: true,
    measure_value: 789,
    image_url: 'https://google.com',
    CustomerId: 0
   }, {
    uuid: 'ba7da6c2-94b2-41c1-8366-b0dabf27862d',
    measure_datetime: '2024-05-01',
    measure_type: 'WATER',
    has_confirmed: true,
    measure_value: 12345,
    image_url: 'https://google.com',
    CustomerId: 1
   }, {
    uuid: '8e2ecb12-dc33-41ec-aed7-771cebe090b1',
    measure_datetime: '2024-04-01',
    measure_type: 'WATER',
    has_confirmed: true,
    measure_value: 67890,
    image_url: 'https://google.com',
    CustomerId: 1
   }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Measures', null, {});
  }
};
