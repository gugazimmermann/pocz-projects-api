"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("refresh_tokens", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        autoIncrement: false,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      token: { type: DataTypes.UUID, allowNull: false },
      expiryDate: { type: DataTypes.DATE, allowNull: false },
      userId: { 
        type: DataTypes.UUID, 
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false
      },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("refresh_tokens");
  },
};
