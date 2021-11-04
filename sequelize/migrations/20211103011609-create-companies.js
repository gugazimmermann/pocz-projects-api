"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "companies",
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
        site: { type: DataTypes.TEXT, allowNull: true },
        email: { type: DataTypes.TEXT, allowNull: true },
        phone: { type: DataTypes.TEXT, allowNull: true },
        zip: { type: DataTypes.TEXT, allowNull: true },
        address: { type: DataTypes.TEXT, allowNull: true },
        number: { type: DataTypes.TEXT, allowNull: true },
        complement: { type: DataTypes.TEXT, allowNull: true },
        neighborhood: { type: DataTypes.TEXT, allowNull: true },
        city: { type: DataTypes.TEXT, allowNull: true },
        state: { type: DataTypes.TEXT, allowNull: true },
        comments: { type: DataTypes.TEXT, allowNull: true },
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
    await queryInterface.dropTable("companies");
  },
};
