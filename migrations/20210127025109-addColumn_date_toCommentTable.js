'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Comments',
        'date',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Comments', 'date')
    ]);
  }
};
