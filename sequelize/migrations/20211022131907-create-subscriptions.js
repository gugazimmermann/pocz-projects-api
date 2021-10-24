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
        planId: { 
          type: DataTypes.UUID, 
          references: {
            model: 'plans',
            key: 'id'
          },
          allowNull: false
        },
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
    await queryInterface.dropTable("subscriptions");
  },
};
