'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER(100),
        allowNull: false,
        references : { model : 'Users', key: 'id'}
      },
      cocktailId: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
        references: { model: 'Cocktails', key: 'id'}
      },
      rate: {
        type: Sequelize.INTEGER(20),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Ratings');
  }
};