import jwt from "jsonwebtoken";
import config from "../jwt-config";

export function expiredToken() {
  const userId = "fd6bc51e-195e-4433-b404-8a9fdfa0f632";
  const token = jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: "-10s",
  });
  return token;
}

export function userNotFoundToken() {
  const userId = "f9d94cdb-3700-4a91-821b-e5f9246a99c4";
  const token = jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });
  return token;
}

export function validToken() {
  const userId = "fd6bc51e-195e-4433-b404-8a9fdfa0f632";
  const token = jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });
  return token;
}