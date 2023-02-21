'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class conversation_parts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  conversation_parts.init({
    conversation_id: DataTypes.STRING,
    conversation_parts_id: DataTypes.STRING,
    type: DataTypes.STRING,
    part_type: DataTypes.STRING,
    body: DataTypes.TEXT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    notified_at: DataTypes.DATE,
    assigned_to_id: DataTypes.STRING,
    assigned_to_type: DataTypes.STRING,
    author_id: DataTypes.STRING,
    author_type: DataTypes.STRING,
    author_name: DataTypes.STRING,
    author_email: DataTypes.STRING,
    contact_id: DataTypes.STRING,
    atttachments_id: DataTypes.STRING,
    images: DataTypes.STRING,
    external_id: DataTypes.INTEGER,
    json_data: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'conversation_parts',
  });
  return conversation_parts;
};