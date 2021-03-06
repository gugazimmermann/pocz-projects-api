"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "credit_cards",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          autoIncrement: false,
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        name: { type: DataTypes.TEXT, allowNull: false },
        firstSixDigits: { type: DataTypes.TEXT, allowNull: false },
        lastFourDigits: { type: DataTypes.TEXT, allowNull: false },
        expirationMonth: { type: DataTypes.TEXT, allowNull: false },
        expirationYear: { type: DataTypes.TEXT, allowNull: false },
        status: { type: DataTypes.BOOLEAN, allowNull: false },
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
        deletedAt: { type: DataTypes.DATE, allowNull: true },
      },
      {
        paranoid: true,
        timestamps: true,
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("credit_cards");
  },
};
