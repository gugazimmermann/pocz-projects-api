import jwt from "jsonwebtoken";
import config from "../../libs/jwt-config";
import * as verify from "./verify";

const userId = "fd6bc51e-195e-4433-b404-8a9fdfa0f632";
const deny = { 
  Version: "2012-10-17", 
  Statement: [{ Action: "execute-api:Invoke", Effect: "Deny", Resource: "*" }]
};
const allow = {
  Version: "2012-10-17",
  Statement: [{ Action: "execute-api:Invoke", Effect: "Allow", Resource: "*" }],
};

describe("Auth API - Verify", () => {
  test("Should fail without authorizationToken, methodArn, token or wrong token", async () => {
    let res = await verify.handler({ authorizationToken: "b41b1045-f2a0-40b6-8be2-7381e392b94a", });
    expect(res).toStrictEqual({ principalId: undefined, policyDocument: null });
    res = await verify.handler({ methodArn: "b41b1045-f2a0-40b6-8be2-7381e392b94a" });
    expect(res).toStrictEqual({ principalId: undefined, policyDocument: deny });
    res = await verify.handler({ authorizationToken: "Bearer ", methodArn: "b41b1045-f2a0-40b6-8be2-7381e392b94a" });
    expect(res).toStrictEqual({ principalId: undefined, policyDocument: deny });
    res = await verify.handler({ authorizationToken: "Bearer b41b1045-f2a0-40b6-8be2-7381e392b94a", methodArn: "b41b1045-f2a0-40b6-8be2-7381e392b94a" });
    expect(res).toStrictEqual({ principalId: undefined, policyDocument: deny });
    res = await verify.handler({ authorizationToken: `Bearer ${jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: "-10s", })}`, methodArn: "b41b1045-f2a0-40b6-8be2-7381e392b94a"} );
    expect(res).toStrictEqual({ principalId: undefined, policyDocument: deny });
  });

  test("Should pass with valid JWT", async () => {
    const validToken = jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: config.jwtExpiration });
    const res = await verify.handler({ authorizationToken: `Bearer ${validToken}`, methodArn: "b41b1045-f2a0-40b6-8be2-7381e392b94a" } );
    expect(res).toStrictEqual({ principalId: userId, policyDocument: allow });
  });
});
