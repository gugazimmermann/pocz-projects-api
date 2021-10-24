import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
      Roles.belongsToMany(models.Users, {
        through: { model: "user_roles" },
      });
    }
  }
  Roles.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "roles",
    }
  );
  return Roles;
};
