"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "events",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          autoIncrement: false,
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        startDate: { type: DataTypes.DATE, allowNull: false },
        endDate: { type: DataTypes.DATE, allowNull: true },
        fullDay: { type: DataTypes.BOOLEAN, allowNull: true },
        color: { type: DataTypes.TEXT, allowNull: true },
        title: { type: DataTypes.TEXT, allowNull: true },
        description: { type: DataTypes.TEXT, allowNull: true },
        userId: { type: DataTypes.UUID, allowNull: true },
        placeId: { type: DataTypes.UUID, allowNull: true },
        tenantId: { type: DataTypes.UUID, allowNull: true },
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
    await queryInterface.dropTable("events");
  },
};
