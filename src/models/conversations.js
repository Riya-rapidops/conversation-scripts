'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class conversations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  conversations.init({
    conversation_id: DataTypes.STRING,
    type: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    waiting_since: DataTypes.STRING,
    snoozed_until: DataTypes.STRING,
    open: DataTypes.BOOLEAN,
    state: DataTypes.STRING,
    conversation_read: DataTypes.BOOLEAN,
    tags_id: DataTypes.STRING,
    assignee_id: DataTypes.INTEGER,
    assignee_type: DataTypes.STRING,
    customer_first_reply_created_at: DataTypes.DATE,
    customer_first_reply_type: DataTypes.STRING,
    customer_first_reply_url: DataTypes.STRING,
    conversation_rating: DataTypes.STRING,
    conversation_rating_remark: DataTypes.STRING,
    conversation_rating_created_at: DataTypes.DATE,
    customers_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
    user_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'conversations',
  });
  return conversations;
};