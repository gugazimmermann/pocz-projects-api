import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Plans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
