'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Favorite, {foreignKey: 'userId'});
      this.hasMany(models.Rating, {foreignKey: 'userId'});
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING(100),
      allowNull : true
    },
    password: {
      type : DataTypes.STRING(20),
      allowNull: true
    },
    nickname: {
      type : DataTypes.STRING(100),
      allowNull: true
    },
    profile: {
      type : DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};