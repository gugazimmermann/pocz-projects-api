"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('place_clients', {
      placeId: { 
        type: DataTypes.UUID, 
        references: {
          model: 'places',
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
    await queryInterface.dropTable('place_clients');
  }
};