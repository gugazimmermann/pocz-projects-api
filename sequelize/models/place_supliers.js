import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class place_supliers extends Model {
    static associate(models) {}
  }
  place_supliers.init(
    {
      placeId: DataTypes.UUID,
      personId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "place_supliers",
    }
  );
  return place_supliers;
};
