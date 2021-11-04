"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_clients', {
      userId: { 
        type: DataTypes.UUID, 
        references: {
          model: 'users',
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
    await queryInterface.dropTable('user_clients');
  }
};