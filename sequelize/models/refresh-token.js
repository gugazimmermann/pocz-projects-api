"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RefreshToken.init(
    {
      token: DataTypes.UUID,
      expiryDate: DataTypes.DATE,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "refresh_tokens",
    }
  );
  return RefreshToken;
};
