import jwt from "jsonwebtoken";
import config from "../jwt-config";
import { handler } from "../../services/auth-api/verify";

export const Tokens = { NotFound: 'NotFound', Expired: 'Expired', Valid: 'Valid' };

export const createEvent = async (type, data, token, parameters, userID) => {
  let event;
  // someText.replace(/(\r\n|\n|\r)/gm,"");
  if (data && data.hasOwnProperty("_streams")) {
    const streams = data._streams
                    .filter(d => typeof d === 'string')
                    .map(e => {
                      if (!e.includes("\r\n")) e = e + "\r\n";
                      return e;
                    });
    streams.push(`--${data.getBoundary()}--\r\n`);
    event = { headers: data.getHeaders(),  body: streams.join('') };
  } else {
    event = { body: JSON.stringify(data) }
  }
  event.routeKey = type;
  if (token === Tokens.NotFound) event.requestContext = { authorizer: { principalId: (await notFoundToken()).principalId } };
  if (token === Tokens.Expired) event.requestContext = { authorizer: { principalId: (await expiredToken()).principalId } };
  if (token === Tokens.Valid) event.requestContext = { authorizer: { principalId: (await validToken(userID)).principalId } };
  if (parameters) event.pathParameters = parameters;
  return event;
};

const headers = (authorizationToken) => ({ headers: { Authorization: authorizationToken}, methodArn: "b41b1045-f2a0-40b6-8be2-7381e392b94a" });

const notFoundToken = async () => (await handler(headers(
  jwt.sign({ id: "f9d94cdb-3700-4a91-821b-e5f9246a99c4" }, config.jwtSecret, { expiresIn: config.jwtExpiration })
)));

const expiredToken = async () => (await handler(headers(
  jwt.sign({ id: "fd6bc51e-195e-4433-b404-8a9fdfa0f632" }, config.jwtSecret, { expiresIn: "-10s" })
)));

const validToken = async (userID) => (await handler(headers(
  jwt.sign({ id: userID ? userID : "fd6bc51e-195e-4433-b404-8a9fdfa0f632" }, config.jwtSecret, { expiresIn: config.jwtExpiration })
)));
