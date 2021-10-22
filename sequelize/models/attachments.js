import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Attachments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Attachments.init(
    {
      name: DataTypes.TEXT,
      link: DataTypes.TEXT,
      ownerId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "attachments",
    }
  );
  return Attachments;
};
