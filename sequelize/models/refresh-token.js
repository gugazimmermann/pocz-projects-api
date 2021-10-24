import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RefreshToken.init(
    {
      token: DataTypes.UUID,
      expiryDate: DataTypes.DATE,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "refresh_tokens",
    }
  );
  RefreshToken.beforeCreate((refreshToken) => {
    refreshToken.id = uuidv4();
  });
  return RefreshToken;
};
