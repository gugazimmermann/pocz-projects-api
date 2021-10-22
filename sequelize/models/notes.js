import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notes.init(
    {
      title: DataTypes.TEXT,
      content: DataTypes.TEXT,
      ownerId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "notes",
    }
  );
  return Notes;
};
