import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default (sequelize, DataTypes) => {
  class Companies extends Model {
    static associate(models) {
    }
  }
  Companies.init(
    {
      name: DataTypes.TEXT,
      site: DataTypes.TEXT,
      email: DataTypes.TEXT,
      phone: DataTypes.TEXT,
      zip: DataTypes.TEXT,
      address: DataTypes.TEXT,
      number: DataTypes.TEXT,
      complement: DataTypes.TEXT,
      neighborhood: DataTypes.TEXT,
      city: DataTypes.TEXT,
      state: DataTypes.TEXT,
      comments: DataTypes.TEXT,
      tenantId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "companies",
    }
  );
  Companies.beforeCreate((company) => {
    company.id = uuidv4();
  });
  return Companies;
};
