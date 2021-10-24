import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default (sequelize, DataTypes) => {
  class CreditCards extends Model {
    static associate(models) {
      CreditCards.hasMany(models.Payments);
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
  CreditCards.beforeCreate((creditCard) => {
    creditCard.id = uuidv4();
  });
  return CreditCards;
};
