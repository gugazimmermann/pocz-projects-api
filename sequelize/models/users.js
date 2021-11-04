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
      Users.belongsToMany(models.Places, {
        as: "placeManagers",
        through: { model: "place_managers" },
      });
      Users.belongsToMany(models.Places, {
        as: "placeEmployees",
        through: { model: "place_employees" },
      });
      Users.belongsToMany(models.Persons, {
        as: "clientsUser",
        through: { model: "user_clients" },
      });
      Users.belongsToMany(models.Persons, {
        as: "supliersUser",
        through: { model: "user_supliers" },
      });
      Users.belongsToMany(models.Persons, {
        as: "contactsUser",
        through: { model: "user_contacts" },
      });
      Users.hasMany(models.Events);
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
