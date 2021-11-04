import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class user_contacts extends Model {
    static associate(models) {}
  }
  user_contacts.init(
    {
      userId: DataTypes.UUID,
      personId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "user_contacts",
    }
  );
  return user_contacts;
};
