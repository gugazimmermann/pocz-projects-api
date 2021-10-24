import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsToMany(models.Roles, {
        through: { model: "user_roles" },
      });
      Users.hasOne(models.Profiles);
      Users.hasOne(models.RefreshToken);
      Users.hasOne(models.Subscriptions);
      Users.hasMany(models.CreditCards);
      Users.hasMany(models.Payments);
    }
  }
  Users.init(
    {
      email: DataTypes.TEXT,
      password: DataTypes.TEXT,
      tenant: DataTypes.UUID,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  Users.beforeCreate((user) => {
    user.id = uuidv4();
  });
  return Users;
};
