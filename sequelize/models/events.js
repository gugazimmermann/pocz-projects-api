import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default (sequelize, DataTypes) => {
  class Events extends Model {
    static associate(models) {
      Events.belongsToMany(models.Persons, {
        through: { model: "event_contacts" },
      });
    }
  }
  Events.init(
    {
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      fullDay: DataTypes.BOOLEAN,
      color: DataTypes.TEXT,
      title: DataTypes.TEXT,
      description: DataTypes.TEXT,
      userId: DataTypes.UUID,
      placeId: DataTypes.UUID,
      tenantId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "events",
    }
  );
  Events.beforeCreate((event) => {
    event.id = uuidv4();
  });
  return Events;
};
