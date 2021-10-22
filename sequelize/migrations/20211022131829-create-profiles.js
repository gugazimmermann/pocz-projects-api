"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "profiles",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          autoIncrement: false,
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        avatar: { type: DataTypes.TEXT, allowNull: true },
        name: { type: DataTypes.TEXT, allowNull: false },
        phone: { type: DataTypes.TEXT, allowNull: true },
        email: { type: DataTypes.TEXT, allowNull: false },
        zip: { type: DataTypes.TEXT, allowNull: true },
        address: { type: DataTypes.TEXT, allowNull: true },
        number: { type: DataTypes.TEXT, allowNull: true },
        complement: { type: DataTypes.TEXT, allowNull: true },
        neighborhood: { type: DataTypes.TEXT, allowNull: true },
        city: { type: DataTypes.TEXT, allowNull: true },
        state: { type: DataTypes.TEXT, allowNull: true },
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
    await queryInterface.dropTable("profiles");
  },
};
