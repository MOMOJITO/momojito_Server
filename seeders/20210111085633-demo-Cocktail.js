'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cocktails', [{
      name: 'old Fashioned',
      koName: '올드패션드',
      avrRate: 3.2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cocktails', null, {});
  }
};
