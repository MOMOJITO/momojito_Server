'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Ratings', [{
      userId: 1,
      cocktailId: 1,
      rate: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
   {
     userId: 1,
     cocktailId: 2,
     rate: 4,
     createdAt: new Date(),
     updatedAt: new Date()
   }
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Ratings', null, {});
  }
};
