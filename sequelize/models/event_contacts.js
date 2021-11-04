import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class event_contacts extends Model {
    static associate(models) {
    }
  };
  event_contacts.init({
    eventId: DataTypes.UUID,
    personId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'event_contacts',
  });
  return event_contacts;
};