'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: 'userId'});
    }
  };
  Comment.init({
    userId: {
      type : DataTypes.INTEGER(200),
      allowNull : true,
    },
    nickname: {
      type : DataTypes.STRING(255),
      allowNull : true,
    },
    text: {
      type : DataTypes.STRING,
    },
    contents: {
      type : DataTypes.STRING
    },
    isUser: {
      type : DataTypes.STRING
    },
    profile: {
      type : DataTypes.STRING,
      allowNull : true
    },
    date : {
      type : DataTypes.STRING,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};