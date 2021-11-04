import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default (sequelize, DataTypes) => {
  class Invites extends Model {
    static associate(models) {
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
  Invites.beforeCreate((invite) => {
    invite.id = uuidv4();
  });
  return Invites;
};
