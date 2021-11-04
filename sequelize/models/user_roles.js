import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class user_roles extends Model {
    static associate(models) {}
  }
  user_roles.init(
    {
      userId: DataTypes.UUID,
      roleId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "user_roles",
    }
  );
  return user_roles;
};
