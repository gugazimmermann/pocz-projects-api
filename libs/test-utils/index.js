import jwt from "jsonwebtoken";
import config from "../jwt-config";
import { handler } from "../../services/auth-api/verify";

const headers = (authorizationToken) => ({ authorizationToken, methodArn: "b41b1045-f2a0-40b6-8be2-7381e392b94a" });

export const userNotFoundToken = async () => (await handler(headers(
  jwt.sign({ id: "f9d94cdb-3700-4a91-821b-e5f9246a99c4" }, config.jwtSecret, { expiresIn: config.jwtExpiration })
)));

export const expiredToken = async () => (await handler(headers(
  jwt.sign({ id: "fd6bc51e-195e-4433-b404-8a9fdfa0f632" }, config.jwtSecret, { expiresIn: "-10s" })
)));

export const validToken = async (userID) => (await handler(headers(
  jwt.sign({ id: userID ? userID : "fd6bc51e-195e-4433-b404-8a9fdfa0f632" }, config.jwtSecret, { expiresIn: config.jwtExpiration })
)));
