"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_roles', {
      userId: { 
        type: DataTypes.UUID, 
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false
      },
      roleId: { 
        type: DataTypes.UUID, 
        references: {
          model: 'roles',
          key: 'id'
        },
        allowNull: false
      },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_roles');
  }
};