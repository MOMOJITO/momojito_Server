'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Cocktail, { foreignKey: 'cocktailId'});
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  };
  Favorite.init({
    userId: {
      type : DataTypes.INTEGER(100),
      allowNull : false
    },
    cocktailId: {
      type : DataTypes.INTEGER(20),
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};