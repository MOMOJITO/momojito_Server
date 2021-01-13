'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Bars',
        'name',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Bars', 'name')
    ]);
  }
};
