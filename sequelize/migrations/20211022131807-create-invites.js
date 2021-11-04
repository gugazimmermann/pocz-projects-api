"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("invites", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        autoIncrement: false,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      name: { type: DataTypes.TEXT, allowNull: false },
      email: { type: DataTypes.TEXT, allowNull: false },
      code: { type: DataTypes.INTEGER, allowNull: false },
      userId: { 
        type: DataTypes.UUID, 
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false
      },
      tenantId: { type: DataTypes.UUID, allowNull: false },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("invites");
  },
};
