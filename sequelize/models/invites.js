import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Invites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invites.init(
    {
      name: DataTypes.TEXT,
      email: DataTypes.TEXT,
      code: DataTypes.INTEGER,
      userId: DataTypes.UUID,
      tenantId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "invites",
    }
  );
  return Invites;
};
