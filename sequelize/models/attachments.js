import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default (sequelize, DataTypes) => {
  class Attachments extends Model {
    static associate(models) {
    }
  }
  Attachments.init(
    {
      name: DataTypes.TEXT,
      link: DataTypes.TEXT,
      personId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "attachments",
    }
  );
  Attachments.beforeCreate((attachment) => {
    attachment.id = uuidv4();
  });
  return Attachments;
};
