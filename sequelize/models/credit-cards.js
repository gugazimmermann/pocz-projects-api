"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CreditCards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CreditCards.init(
    {
      name: DataTypes.TEXT,
      firstSixDigits: DataTypes.TEXT,
      lastFourDigits: DataTypes.TEXT,
      expirationMonth: DataTypes.TEXT,
      expirationYear: DataTypes.TEXT,
      status: DataTypes.BOOLEAN,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "credit_cards",
    }
  );
  return CreditCards;
};
