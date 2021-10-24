import { Sequelize } from "sequelize";
import pg from "pg";
import dotenv from "dotenv";
import UsersModel from "../../sequelize/models/users";
import PlansModel from "../../sequelize/models/plans";
import RolesModel from "../../sequelize/models/roles";
import ProfilesModel from "../../sequelize/models/profiles";
import SubscriptionsModel from "../../sequelize/models/subscriptions";
import CreditCardsModel from "../../sequelize/models/credit-cards";
import PaymentsModel from "../../sequelize/models/payments";
import RefreshTokenModel from "../../sequelize/models/refresh-token";

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `../../.env.${env}` });

const databaseConfig = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: 5432,
    dialect: "postgres",
    dialectModule: pg,
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: `${process.env.POSTGRES_DB}_test`,
    host: process.env.POSTGRES_HOST,
    port: 5432,
    dialect: "postgres",
    dialectModule: pg,
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: 5432,
    dialect: "postgres",
    dialectModule: pg,
  },
};

const config = databaseConfig[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {
  Sequelize: sequelize,
  Users: UsersModel(sequelize, Sequelize),
  Plans: PlansModel(sequelize, Sequelize),
  Roles: RolesModel(sequelize, Sequelize),
  Profiles: ProfilesModel(sequelize, Sequelize),
  Subscriptions: SubscriptionsModel(sequelize, Sequelize),
  CreditCards: CreditCardsModel(sequelize, Sequelize),
  Payments: PaymentsModel(sequelize, Sequelize),
  RefreshToken: RefreshTokenModel(sequelize, Sequelize),
};

db.Users.belongsToMany(db.Roles, { through: { model: "user_roles" } });
db.Roles.belongsToMany(db.Users, { through: { model: "user_roles" } });
db.Users.hasOne(db.Profiles);
db.Users.hasOne(db.RefreshToken);
db.Plans.hasMany(db.Subscriptions);
db.Subscriptions.hasMany(db.Payments);
db.Users.hasOne(db.Subscriptions);
db.Users.hasMany(db.CreditCards);
db.CreditCards.hasMany(db.Payments);
db.Users.hasMany(db.Payments);

const connection = {};

async function database() {
  if (connection.isConnected) {
    console.log("=> Using existing connection.");
    return db;
  }
  // await sequelize.sync();
  await sequelize.authenticate();
  connection.isConnected = true;
  console.log("=> Created a new connection.");
  return db;
}

export default database;
