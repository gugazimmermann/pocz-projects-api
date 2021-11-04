"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('event_contacts', {
      eventId: { 
        type: DataTypes.UUID, 
        references: {
          model: 'events',
          key: 'id'
        },
        allowNull: false
      },
      personId: { 
        type: DataTypes.UUID, 
        references: {
          model: 'persons',
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('event_contacts');
  }
};