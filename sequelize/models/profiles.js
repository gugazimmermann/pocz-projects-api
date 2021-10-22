import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profiles.init(
    {
      avatar: DataTypes.TEXT,
      name: DataTypes.TEXT,
      phone: DataTypes.TEXT,
      email: DataTypes.TEXT,
      zip: DataTypes.TEXT,
      address: DataTypes.TEXT,
      number: DataTypes.TEXT,
      complement: DataTypes.TEXT,
      neighborhood: DataTypes.TEXT,
      city: DataTypes.TEXT,
      state: DataTypes.TEXT,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "profiles",
    }
  );
  return Profiles;
};
