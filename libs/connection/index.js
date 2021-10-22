import { Sequelize } from "sequelize";
import PlansModel from "../../sequelize/models/plans";
import database from "../../sequelize/config/database";
const env = process.env.NODE_ENV || "development";
const config = database[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const Plans = PlansModel(sequelize, Sequelize);
const Models = { Plans };
const connection = {};

async function connectToDatabase() {
  if (connection.isConnected) {
    console.log("=> Using existing connection.");
    return Models;
  }

  // await sequelize.sync();
  await sequelize.authenticate();
  connection.isConnected = true;
  console.log("=> Created a new connection.");
  return Models;
}

export default connectToDatabase;
