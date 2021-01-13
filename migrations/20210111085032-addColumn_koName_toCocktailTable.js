'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Cocktails',
        'koName',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Cocktails', 'koName')
    ]);
  }
};
