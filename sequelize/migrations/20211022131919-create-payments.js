"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "payments",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          autoIncrement: false,
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        currency: { type: DataTypes.TEXT, allowNull: false },
        transactionAmount: { type: DataTypes.DOUBLE, allowNull: false },
        status: { type: DataTypes.TEXT, allowNull: false },
        paidDate: { type: DataTypes.DATE, allowNull: false },
        subscriptionId: { 
          type: DataTypes.UUID, 
          references: {
            model: 'subscriptions',
            key: 'id'
          },
          allowNull: false
        },
        creditCardId: { 
          type: DataTypes.UUID, 
          references: {
            model: 'credit_cards',
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
    await queryInterface.dropTable("payments");
  },
};
