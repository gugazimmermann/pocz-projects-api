"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "subscriptions",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          autoIncrement: false,
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        reason: { type: DataTypes.TEXT, allowNull: false },
        frequency: { type: DataTypes.INTEGER, allowNull: false },
        frequencyType: { type: DataTypes.TEXT, allowNull: false },
        transactionAmount: { type: DataTypes.DOUBLE, allowNull: false },
        type: { type: DataTypes.TEXT, allowNull: false },
        status: { type: DataTypes.BOOLEAN, allowNull: false },
        planId: { type: DataTypes.UUID, allowNull: false },
        userId: { type: DataTypes.UUID, allowNull: false },
        createdAt: { type: Sequelize.DATE, allowNull: false },
        updatedAt: { type: Sequelize.DATE, allowNull: false },
        deletedAt: { type: Sequelize.DATE, allowNull: true },
      },
      {
        paranoid: true,
        timestamps: true,
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("subscriptions");
  },
};
