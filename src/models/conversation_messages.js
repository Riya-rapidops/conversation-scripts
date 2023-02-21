'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class conversation_messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  conversation_messages.init({
    conversation_id: DataTypes.STRING,
    conversation_message_id: DataTypes.STRING,
    type: DataTypes.STRING,
    delivered_as: DataTypes.STRING,
    subject: DataTypes.STRING,
    body: DataTypes.TEXT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    author_id: DataTypes.STRING,
    author_type: DataTypes.STRING,
    author_name: DataTypes.STRING,
    author_email: DataTypes.STRING,
    contact_id: DataTypes.STRING,
    atttachments_id: DataTypes.STRING,
    images: DataTypes.STRING,
    url: DataTypes.STRING,
    json_data: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'conversation_messages',
  });
  return conversation_messages;
};