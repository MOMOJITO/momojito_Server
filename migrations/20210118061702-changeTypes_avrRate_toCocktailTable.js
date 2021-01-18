'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Cocktails', 'avrRate', {
          type: Sequelize.DECIMAL(10,1),
          allowNull: false,
          defaultValue: 0
      })
  ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Cocktails', 'avrRate', {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
      })
  ])
  }
};
