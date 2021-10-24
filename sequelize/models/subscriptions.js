import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default (sequelize, DataTypes) => {
  class Subscriptions extends Model {
    static associate(models) {
      Subscriptions.hasMany(models.Payments);
    }
  }
  Subscriptions.init(
    {
      reason: DataTypes.TEXT,
      frequency: DataTypes.INTEGER,
      frequencyType: DataTypes.TEXT,
      transactionAmount: DataTypes.DOUBLE,
      type: DataTypes.TEXT,
      status: DataTypes.BOOLEAN,
      planId: DataTypes.UUID,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "subscriptions",
    }
  );
  Subscriptions.beforeCreate((subscription) => {
    subscription.id = uuidv4();
  });
  return Subscriptions;
};
