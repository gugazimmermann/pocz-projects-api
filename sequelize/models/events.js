import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
  return Events;
};
