import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class place_contacts extends Model {
    static associate(models) {}
  }
  place_contacts.init(
    {
      placeId: DataTypes.UUID,
      personId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "place_contacts",
    }
  );
  return place_contacts;
};
