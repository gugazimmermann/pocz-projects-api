import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class user_supliers extends Model {
    static associate(models) {}
  }
  user_supliers.init(
    {
      userId: DataTypes.UUID,
      personId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "user_supliers",
    }
  );
  return user_supliers;
};
