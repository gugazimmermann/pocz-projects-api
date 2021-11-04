import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class user_clients extends Model {
    static associate(models) {}
  }
  user_clients.init(
    {
      userId: DataTypes.UUID,
      personId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "user_clients",
    }
  );
  return user_clients;
};
