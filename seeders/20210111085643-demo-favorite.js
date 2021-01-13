'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Favorites', [{
      userId: 1,
      cocktailId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      cocktailId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Favorites', null, {});
  }
};
