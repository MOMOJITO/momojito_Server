'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cocktail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Bar, { foreignKey: 'cocktailId'});
      this.hasMany(models.Rating, { foreignKey: 'cocktailId'});
      this.hasMany(models.Favorite, { foreignKey: 'cocktailId'});
    }
  };
  Cocktail.init({
    name: {
      type : DataTypes.STRING(100),
      allowNull: false
    },
    avrRate: DataTypes.INTEGER(20),
    allowNull: false,
    defaultValue: 0
  }, {
    sequelize,
    modelName: 'Cocktail',
  });
  return Cocktail;
};