import { close } from "../../../libs/connection";
import {
  expiredToken,
  userNotFoundToken,
  validToken,
} from "../../../libs/test-utils";
import * as subscriptions from "../subscriptions";

describe("Subscriptions API - Subscriptions", () => {
  afterAll(() => {
    close();
  });

  test("Should fail without authorizationToken", async () => {
    let res = await subscriptions.handler({});
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Autorização não encontrada!");
  });

  test("Should fail with invalid token", async () => {
    let res = await subscriptions.handler({
      headers: {
        Authorization: `Bearer ${expiredToken()}`,
      },
    });
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(401);
    expect(body.message).toBe("Não Autorizado!");
  });

  test("Should fail if subscription not found", async () => {
    let res = await subscriptions.handler({
      headers: {
        Authorization: `Bearer ${userNotFoundToken()}`,
      },
    });
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Assinatura não encontrada!");
  });

  test("Should pass with valid token and user", async () => {
    let res = await subscriptions.handler({
      headers: {
        Authorization: `Bearer ${validToken()}`,
      },
    });
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(200);
    expect(body.subscription.id).toBe("458a4fbf-beae-4311-a2f9-81a77aad4adf");
  });

  test("Should return error wihtout database", async () => {
    close();
    let res = await subscriptions.handler({
      headers: {
        Authorization: `Bearer ${validToken()}`,
      },
    });
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(500);
    expect(body.message).toBe(
      "ConnectionManager.getConnection was called after the connection manager was closed!"
    );
  });
});
