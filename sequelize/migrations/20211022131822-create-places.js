"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "places",
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
        phone: { type: DataTypes.TEXT, allowNull: true },
        email: { type: DataTypes.TEXT, allowNull: true },
        zip: { type: DataTypes.TEXT, allowNull: false },
        address: { type: DataTypes.TEXT, allowNull: false },
        number: { type: DataTypes.TEXT, allowNull: true },
        complement: { type: DataTypes.TEXT, allowNull: true },
        neighborhood: { type: DataTypes.TEXT, allowNull: false },
        city: { type: DataTypes.TEXT, allowNull: false },
        state: { type: DataTypes.TEXT, allowNull: false },
        active: { type: DataTypes.BOOLEAN, allowNull: false },
        tenantId: { type: DataTypes.UUID, allowNull: false },
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
    await queryInterface.dropTable("places");
  },
};
