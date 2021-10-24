"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "plans",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          autoIncrement: false,
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        preapprovalPlanId: { type: DataTypes.TEXT, allowNull: false },
        collectorId: { type: DataTypes.BIGINT, allowNull: false },
        applicationId: { type: DataTypes.BIGINT, allowNull: false },
        reason: { type: DataTypes.TEXT, allowNull: false },
        status: { type: DataTypes.TEXT, allowNull: false },
        initPoint: { type: DataTypes.TEXT, allowNull: false },
        frequency: { type: DataTypes.INTEGER, allowNull: false },
        frequencyType: { type: DataTypes.TEXT, allowNull: false },
        transactionAmount: { type: DataTypes.DOUBLE, allowNull: false },
        currencyId: { type: DataTypes.TEXT, allowNull: false },
        type: { type: DataTypes.TEXT, allowNull: false },
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
    await queryInterface.dropTable("plans");
  },
};
