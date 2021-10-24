import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Plans extends Model {
    static associate(models) {
      Plans.hasMany(models.Subscriptions);
    }
  }
  Plans.init(
    {
      preapprovalPlanId: DataTypes.TEXT,
      collectorId: DataTypes.BIGINT,
      applicationId: DataTypes.BIGINT,
      reason: DataTypes.TEXT,
      status: DataTypes.TEXT,
      initPoint: DataTypes.TEXT,
      frequency: DataTypes.INTEGER,
      frequencyType: DataTypes.TEXT,
      transactionAmount: DataTypes.DOUBLE,
      currencyId: DataTypes.TEXT,
      type: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "plans",
    }
  );
  return Plans;
};
