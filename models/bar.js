'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Cocktail, {foreignKey: 'cocktailId'});
    }
  };
  Bar.init({
    photoURL: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    cocktailId: {
      type : DataTypes.INTEGER(20),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Bar',
  });
  return Bar;
};