'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tags.init({
    tag_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    applied_at: DataTypes.DATE,
    applied_by_id: DataTypes.INTEGER,
    applied_by_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tags',
  });
  return tags;
};