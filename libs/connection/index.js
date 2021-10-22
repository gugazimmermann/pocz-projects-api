import { Sequelize } from "sequelize";
import pg from "pg";
import PlansModel from "../../sequelize/models/plans";

const env = process.env.NODE_ENV || "development";

const database = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: 5432,
    dialect: "postgres",
    dialectModule: pg
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: `${process.env.POSTGRES_DB}_test`,
    host: process.env.POSTGRES_HOST,
    port: 5432,
    dialect: "postgres",
    dialectModule: pg
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: 5432,
    dialect: "postgres",
    dialectModule: pg
  },
};

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
