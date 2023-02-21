'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('conversation_messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      conversation_id: {
        type: Sequelize.STRING
      },
      conversation_message_id: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      delivered_as: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.TEXT
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      author_id: {
        type: Sequelize.STRING
      },
      author_type: {
        type: Sequelize.STRING
      },
      author_name: {
        type: Sequelize.STRING
      },
      author_email: {
        type: Sequelize.STRING
      },
      contact_id: {
        type: Sequelize.STRING
      },
      atttachments_id: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      json_data: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('conversation_messages');
  }
};