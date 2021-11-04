'use strict';
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('place_employees', {
      userId: { 
        type: DataTypes.UUID, 
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false
      },
      placeId: { 
        type: DataTypes.UUID, 
        references: {
          model: 'places',
          key: 'id'
        },
        allowNull: false
      },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('place_employees');
  }
};