import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class place_managers extends Model {
    static associate(models) {}
  }
  place_managers.init(
    {
      userId: DataTypes.UUID,
      placeId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "place_managers",
    }
  );
  return place_managers;
};
