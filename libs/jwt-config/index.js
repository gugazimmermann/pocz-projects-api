import dotenv from "dotenv";
const env = process.env.NODE_ENV || "development";
const configPath =
  env === "development" || env === "test"
    ? `.env.development`
    : `.env.production`;
dotenv.config({ path: configPath });

const config = {
  jwtSecret: process.env.JWT_SECRET,
  // jwtExpiration: 60,
  // jwtRefreshExpiration: 120,
  jwtExpiration: (1 * 60 * 60),
  jwtRefreshExpiration: (24 * 60 * 60),
};

export default config;