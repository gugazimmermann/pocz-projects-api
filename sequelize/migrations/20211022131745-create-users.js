"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "users",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          autoIncrement: false,
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        email: { type: DataTypes.TEXT, allowNull: false },
        password: { type: DataTypes.TEXT, allowNull: false },
        tenant: { type: DataTypes.UUID, allowNull: true },
        active: { type: DataTypes.BOOLEAN, allowNull: false },
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
    await queryInterface.dropTable("users");
  },
};
