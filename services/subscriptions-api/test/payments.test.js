import { close } from "../../../libs/connection";
import {
  expiredToken,
  userNotFoundToken,
  validToken,
} from "../../../libs/test-utils";
import * as payments from "../payments";

describe("Subscriptions API - Payments", () => {
  afterAll(() => {
    close();
  });

  test("Should fail without authorizationToken", async () => {
    let res = await payments.handler({});
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Autorização não encontrada!");
  });

  test("Should fail with invalid token", async () => {
    let res = await payments.handler({
      headers: {
        Authorization: `Bearer ${expiredToken()}`,
      },
    });
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(401);
    expect(body.message).toBe("Não Autorizado!");
  });

  test("Should fail with user not found", async () => {
    let res = await payments.handler({
      headers: {
        Authorization: `Bearer ${userNotFoundToken()}`,
      },
    });
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(200);
    expect(body.payments.length).toBe(0);
  });

  test("Should pass with valid token and user", async () => {
    let res = await payments.handler({
      headers: {
        Authorization: `Bearer ${validToken()}`,
      },
    });
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(200);
    expect(body.payments.length).toBe(3);
  });

  test("Should return error wihtout database", async () => {
    close();
    let res = await payments.handler({
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
