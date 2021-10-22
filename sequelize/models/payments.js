import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payments.init(
    {
      transactionAmount: DataTypes.DOUBLE,
      status: DataTypes.TEXT,
      paidDate: DataTypes.DATE,
      subscriptionId: DataTypes.UUID,
      creditcardId: DataTypes.UUID,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "payments",
    }
  );
  return Payments;
};
