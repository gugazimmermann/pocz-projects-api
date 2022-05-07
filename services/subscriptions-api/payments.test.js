import database, { close } from "../../libs/connection";
import { userNotFoundToken, validToken } from "../../libs/test-utils";
import * as payments from "./payments";

describe("Subscriptions API - Payments", () => {
  afterAll(() => { close() });

  test("Should fail with user not found", async () => {
    const event = { requestContext: { authorizer: { principalId: (await userNotFoundToken()).principalId } }}
    const res = await payments.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Usuário não encontrado!");
  });

  test("Should pass with valid token and user", async () => {
    const event = { requestContext: { authorizer: { principalId: (await validToken()).principalId } }}
    const res = await payments.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(200);
    expect(body.data.length).toBe(3);
  });

  test("Should fail if database error", async () => {
    const { Payments } = await database();
    const mock = jest.spyOn(Payments, 'findAll').mockRejectedValueOnce(new Error("DB ERROR!"));
    const event = { requestContext: { authorizer: { principalId: (await validToken()).principalId } }}
    const res = await payments.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(500);
    expect(body.message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
