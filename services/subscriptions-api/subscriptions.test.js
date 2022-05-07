import database, { close } from "../../libs/connection";
import { userNotFoundToken, validToken } from "../../libs/test-utils";
import * as subscriptions from "./subscriptions";

describe("Subscriptions API - Subscriptions", () => {
  afterAll(() => { close() });

  test("Should fail with user not found", async () => {
    const event = { requestContext: { authorizer: { principalId: (await userNotFoundToken()).principalId } }}
    const res = await subscriptions.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Usuário não encontrado!");
  });

  test("Should not find a subscription", async () => {
    const event = { requestContext: { authorizer: { principalId: (await validToken("eb07ecc2-fd14-480a-a9a8-354b1918ef93")).principalId } }}
    const res = await subscriptions.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Assinatura não encontrada!");
  });

  test("Should pass with valid token and user", async () => {
    const event = { requestContext: { authorizer: { principalId: (await validToken()).principalId } }}
    const res = await subscriptions.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(200);
    expect(body.subscription.id).toBe("458a4fbf-beae-4311-a2f9-81a77aad4adf");
  });

  test("Should fail if database error", async () => {
    const { Subscriptions } = await database();
    Subscriptions.findAll = jest.fn(() => Promise.reject(new Error("DB ERROR!")));
    const event = { requestContext: { authorizer: { principalId: (await validToken()).principalId } }}
    const res = await subscriptions.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(401);
    expect(body.message).toBe("Não Autorizado!");
    jest.clearAllMocks();
  });
});
