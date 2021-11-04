import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default (sequelize, DataTypes) => {
  class Notes extends Model {
    static associate(models) {
    }
  }
  Notes.init(
    {
      title: DataTypes.TEXT,
      content: DataTypes.TEXT,
      personId: DataTypes.UUID, 
    },
    {
      sequelize,
      modelName: "notes",
    }
  );
  Notes.beforeCreate((note) => {
    note.id = uuidv4();
  });
  return Notes;
};
