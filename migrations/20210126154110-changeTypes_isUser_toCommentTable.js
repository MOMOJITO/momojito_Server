'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Comments', 'isUser', {
          type: Sequelize.STRING,
          allowNull: false,
      })
  ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Comments', 'isUser', {
          type: Sequelize.BOOLEAN,
          allowNull: true
      })
  ])
  }
};
