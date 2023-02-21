'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('conversations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      conversation_id: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      waiting_since: {
        type: Sequelize.STRING
      },
      snoozed_until: {
        type: Sequelize.STRING
      },
      open: {
        type: Sequelize.BOOLEAN
      },
      state: {
        type: Sequelize.STRING
      },
      conversation_read: {
        type: Sequelize.BOOLEAN
      },
      tags_id: {
        type: Sequelize.STRING
      },
      assignee_id: {
        type: Sequelize.INTEGER
      },
      assignee_type: {
        type: Sequelize.STRING
      },
      customer_first_reply_created_at: {
        type: Sequelize.DATE
      },
      customer_first_reply_type: {
        type: Sequelize.STRING
      },
      customer_first_reply_url: {
        type: Sequelize.STRING
      },
      conversation_rating: {
        type: Sequelize.STRING
      },
      conversation_rating_remark: {
        type: Sequelize.STRING
      },
      conversation_rating_created_at: {
        type: Sequelize.DATE
      },
      customers_id: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      user_type: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('conversations');
  }
};