"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("forgot_passwords", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        autoIncrement: false,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      email: { type: DataTypes.TEXT, allowNull: false },
      code: { type: DataTypes.INTEGER, allowNull: false },
      codeurl: { type: DataTypes.UUID, allowNull: false },
      expiryDate: { type: DataTypes.DATE, allowNull: false },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("forgot_passwords");
  },
};
