"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_roles extends Model {
    static associate(models) {}
  }
  user_roles.init(
    {
      userId: { type: DataTypes.UUID, allowNull: false },
      roleId: { type: DataTypes.UUID, allowNull: false },
    },
    {
      sequelize,
      modelName: "user_roles",
    }
  );
  return user_roles;
};
