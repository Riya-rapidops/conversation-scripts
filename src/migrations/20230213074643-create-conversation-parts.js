'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('conversation_parts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      conversation_id: {
        type: Sequelize.STRING
      },
      conversation_parts_id: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      part_type: {
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
      notified_at: {
        type: Sequelize.DATE
      },
      assigned_to_id: {
        type: Sequelize.STRING
      },
      assigned_to_type: {
        type: Sequelize.STRING
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
      external_id: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('conversation_parts');
  }
};