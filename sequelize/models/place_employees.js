import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class place_employees extends Model {
    static associate(models) {}
  }
  place_employees.init(
    {
      userId: DataTypes.UUID,
      placeId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "place_employees",
    }
  );
  return place_employees;
};
