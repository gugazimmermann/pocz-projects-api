import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default (sequelize, DataTypes) => {
  class Persons extends Model {
    static associate(models) {
      Persons.belongsToMany(models.Users, {
        as: "userClients",
        through: { model: "user_clients" },
      });
      Persons.belongsToMany(models.Users, {
        as: "userSupliers",
        through: { model: "user_supliers" },
      });
      Persons.belongsToMany(models.Users, {
        as: "userContacts",
        through: { model: "user_contacts" },
      });
      Persons.belongsToMany(models.Places, {
        as: "placeClients",
        through: { model: "place_clients" },
      });
      Persons.belongsToMany(models.Places, {
        as: "placeSupliers",
        through: { model: "place_supliers" },
      });
      Persons.belongsToMany(models.Places, {
        as: "placeContacts",
        through: { model: "place_contacts" },
      });
      Persons.belongsTo(models.Companies);
      Persons.hasMany(models.Attachments);
      Persons.hasMany(models.Notes);
      Persons.belongsToMany(models.Events, {
        through: { model: "event_contacts" },
      });
    }
  }
  Persons.init(
    {
      type: DataTypes.TEXT,
      avatar: DataTypes.TEXT,
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
      comments: DataTypes.TEXT,
      position: DataTypes.TEXT,
      companyId: DataTypes.UUID,
      tenantId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "persons",
    }
  );
  Persons.beforeCreate((person) => {
    person.id = uuidv4();
  });
  return Persons;
};
