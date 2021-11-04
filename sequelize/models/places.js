import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default (sequelize, DataTypes) => {
  class Places extends Model {
    static associate(models) {
      Places.belongsToMany(models.Users, {
        as: "managersPlace",
        through: { model: "place_managers" },
      });
      Places.belongsToMany(models.Users, {
        as: "employeesPlace",
        through: { model: "place_employees" },
      });
      Places.belongsToMany(models.Persons, {
        as: "clientsPlace",
        through: { model: "place_clients" },
      });
      Places.belongsToMany(models.Persons, {
        as: "supliersPlace",
        through: { model: "place_supliers" },
      });
      Places.belongsToMany(models.Persons, {
        as: "contactsPlace",
        through: { model: "place_contacts" },
      });
      Places.hasMany(models.Events);
    }
  }
  Places.init(
    {
      name: DataTypes.TEXT,
      phone: DataTypes.TEXT,
      email: DataTypes.TEXT,
      zip: DataTypes.TEXT,
      address: DataTypes.TEXT,
      number: DataTypes.TEXT,
      complement: DataTypes.TEXT,
      neighborhood: DataTypes.TEXT,
      city: DataTypes.TEXT,
      state: DataTypes.TEXT,
      active: DataTypes.BOOLEAN,
      tenantId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "places",
    }
  );
  Places.beforeCreate((place) => {
    place.id = uuidv4();
  });
  return Places;
};
