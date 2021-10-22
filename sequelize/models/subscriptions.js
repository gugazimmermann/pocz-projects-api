import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Subscriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
  return Subscriptions;
};
