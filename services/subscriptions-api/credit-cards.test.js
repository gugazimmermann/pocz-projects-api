import database, { close } from "../../libs/connection";
import { userNotFoundToken, validToken } from "../../libs/test-utils";
import * as creditCards from "./credit-cards";

describe("Subscriptions API - Credit Cards", () => {
  afterAll(() => { close() });

  test("Should fail with user not found", async () => {
    const event = { requestContext: { authorizer: { principalId: (await userNotFoundToken()).principalId } }}
    const res = await creditCards.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Usuário não encontrado!");
  });

  test("Should pass with valid token and user", async () => {
    const event = { requestContext: { authorizer: { principalId: (await validToken()).principalId } }}
    const res = await creditCards.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(200);
    expect(body.creditCards.length).toBe(1);
  });

  test("Should fail if database error", async () => {
    const { CreditCards } = await database();
    CreditCards.findAll = jest.fn(() => Promise.reject(new Error("DB ERROR!")));
    const event = { requestContext: { authorizer: { principalId: (await validToken()).principalId } }}
    const res = await creditCards.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(401);
    expect(body.message).toBe("Não Autorizado!");
    jest.clearAllMocks();
  });
});
