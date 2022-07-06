import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default (sequelize, DataTypes) => {
  class Payments extends Model {
    static associate(models) {
    }
  }
  Payments.init(
    {
      currency: DataTypes.TEXT,
      transactionAmount: DataTypes.DOUBLE,
      status: DataTypes.TEXT,
      paidDate: DataTypes.DATE,
      subscriptionId: DataTypes.UUID,
      creditCardId: DataTypes.UUID,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "payments",
    }
  );
  Payments.beforeCreate((payment) => {
    payment.id = uuidv4();
  });
  return Payments;
};
