import jwt from "jsonwebtoken";
import config from "../../../libs/jwt-config";
import * as verify from "../verify";

const userId = "fd6bc51e-195e-4433-b404-8a9fdfa0f632";

describe("Auth API - Verify", () => {
  test("Should fail without authorizationToken, methodArn, token or wrong token", async () => {
    const expiredToken = jwt.sign({ id: userId }, config.jwtSecret, {
      expiresIn: "-10s",
    });
    const deny = {
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          { Action: "execute-api:Invoke", Effect: "Deny", Resource: "*" },
        ],
      },
    };

    let res = await verify.handler({
      authorizationToken: "b41b1045-f2a0-40b6-8be2-7381e392b94a",
    });
    expect(res).toStrictEqual({ principalId: undefined, policyDocument: null });

    res = await verify.handler({
      methodArn: "b41b1045-f2a0-40b6-8be2-7381e392b94a",
    });
    expect(res).toStrictEqual({
      principalId: undefined,
      policyDocument: deny.policyDocument,
    });

    res = await verify.handler({
      authorizationToken: "Bearer ",
      methodArn: "b41b1045-f2a0-40b6-8be2-7381e392b94a",
    });
    expect(res).toStrictEqual({
      principalId: undefined,
      policyDocument: deny.policyDocument,
    });

    res = await verify.handler({
      authorizationToken: "Bearer b41b1045-f2a0-40b6-8be2-7381e392b94a",
      methodArn: "b41b1045-f2a0-40b6-8be2-7381e392b94a",
    });
    expect(res).toStrictEqual({
      principalId: undefined,
      policyDocument: deny.policyDocument,
    });

    res = await verify.handler({
      authorizationToken: `Bearer ${expiredToken}`,
      methodArn: "b41b1045-f2a0-40b6-8be2-7381e392b94a",
    });
    expect(res).toStrictEqual({
      principalId: undefined,
      policyDocument: deny.policyDocument,
    });
  });

  test("Should pass with valid JWT", async () => {
    const validToken = jwt.sign({ id: userId }, config.jwtSecret, {
      expiresIn: config.jwtExpiration,
    });
    const allow = {
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          { Action: "execute-api:Invoke", Effect: "Allow", Resource: "*" },
        ],
      },
    };
    const res = await verify.handler({
      authorizationToken: `Bearer ${validToken}`,
      methodArn: "b41b1045-f2a0-40b6-8be2-7381e392b94a",
    });
    expect(res).toStrictEqual({
      principalId: userId,
      policyDocument: allow.policyDocument,
    });
  });
});
