'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attachments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  attachments.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    type: DataTypes.STRING,
    content_type: DataTypes.STRING,
    filesize: DataTypes.BIGINT,
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'attachments',
  });
  return attachments;
};