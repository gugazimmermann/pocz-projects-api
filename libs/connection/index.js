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
import ForgotPasswordModel from "../../sequelize/models/forgot-password";
import PlacesModel from "../../sequelize/models/places";
import PersonsModel from "../../sequelize/models/persons";
import EventsModel from "../../sequelize/models/events";
import CompaniesModel from "../../sequelize/models/companies";
import AttachmentsModel from "../../sequelize/models/attachments";
import NotesModel from "../../sequelize/models/notes";
import InvitesModel from "../../sequelize/models/invites";

const env = process.env.NODE_ENV || "development";
const configPath =
  env === "development" || env === "test"
    ? `.env.development`
    : `.env.production`;
dotenv.config({ path: configPath });

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
    port: 5430,
    dialect: "postgres",
    dialectModule: pg,
    logging: false
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

const sequelize = new Sequelize(config.database, config.username, config.password, config );

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
  ForgotPassword: ForgotPasswordModel(sequelize, Sequelize),
  Places: PlacesModel(sequelize, Sequelize),
  Persons: PersonsModel(sequelize, Sequelize),
  Events: EventsModel(sequelize, Sequelize),
  Companies: CompaniesModel(sequelize, Sequelize),
  Attachments: AttachmentsModel(sequelize, Sequelize),
  Notes: NotesModel(sequelize, Sequelize),
  Invites: InvitesModel(sequelize, Sequelize),
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

db.Users.belongsToMany(db.Places, { as: "placeManagers", through: { model: "place_managers" }});
db.Places.belongsToMany(db.Users, { as: "managersPlace", through: { model: "place_managers" }});
db.Users.belongsToMany(db.Places, { as: "placeEmployees", through: { model: "place_employees" }});
db.Places.belongsToMany(db.Users, { as: "employeesPlace", through: { model: "place_employees" }});

db.Persons.belongsToMany(db.Places, { as: "placeClients", through: { model: "place_clients" }});
db.Places.belongsToMany(db.Persons, { as: "clientsPlace", through: { model: "place_clients" }});
db.Persons.belongsToMany(db.Places, { as: "placeSupliers", through: { model: "place_supliers" }});
db.Places.belongsToMany(db.Persons, { as: "supliersPlace", through: { model: "place_supliers" }});
db.Persons.belongsToMany(db.Places, { as: "placeContacts", through: { model: "place_contacts" }});
db.Places.belongsToMany(db.Persons, { as: "contactsPlace", through: { model: "place_contacts" }});

db.Persons.belongsToMany(db.Users, { as: "userClients", through: { model: "user_clients" }});
db.Users.belongsToMany(db.Persons, { as: "clientsUser", through: { model: "user_clients" }});
db.Persons.belongsToMany(db.Users, { as: "userSupliers", through: { model: "user_supliers" }});
db.Users.belongsToMany(db.Persons, { as: "supliersUser", through: { model: "user_supliers" }});
db.Persons.belongsToMany(db.Users, { as: "userContacts", through: { model: "user_contacts" }});
db.Users.belongsToMany(db.Persons, { as: "contactsUser", through: { model: "user_contacts" }});

db.Persons.belongsTo(db.Companies);
db.Persons.hasMany(db.Attachments);
db.Persons.hasMany(db.Notes);

db.Users.hasMany(db.Events);
db.Places.hasMany(db.Events);
db.Events.belongsToMany(db.Persons, { through: { model: "event_contacts", paranoid: true }});
db.Persons.belongsToMany(db.Events, { through: { model: "event_contacts", paranoid: true }});

const connection = {};

export async function close() {
  connection.isConnected = false;
  db.Sequelize.close();
}

async function database() {
  if (connection.isConnected) return db;
  await sequelize.authenticate();
  connection.isConnected = true;
  return db;
}

export default database;
