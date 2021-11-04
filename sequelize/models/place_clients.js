import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class place_clients extends Model {
    static associate(models) {}
  }
  place_clients.init(
    {
      placeId: DataTypes.UUID,
      personId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "place_clients",
    }
  );
  return place_clients;
};
