import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default (sequelize, DataTypes) => {
  class ForgotPassword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ForgotPassword.init(
    {
      email: DataTypes.TEXT,
      code: DataTypes.INTEGER,
      codeurl: DataTypes.UUID,
      expiryDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "forgot_passwords",
    }
  );
  ForgotPassword.beforeCreate((forgotPassword) => {
    forgotPassword.id = uuidv4();
  });
  return ForgotPassword;
};
