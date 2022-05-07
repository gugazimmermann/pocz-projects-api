import database, { close } from "../../libs/connection";
import { userNotFoundToken, expiredToken, validToken } from "../../libs/test-utils";
import * as me from "./me";

const user = { userId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632", email: "gugazimmermann@gmail.com", active: true };

describe("Auth API - Me", () => {
  afterAll(() => { close() });

  test("Should fail with user not found", async () => {
    const event = { requestContext: { authorizer: { principalId: (await userNotFoundToken()).principalId } }}
    const res = await me.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Usuário não encontrado!");
  });

  test("Should fail with expired token", async () => {
    const event = { requestContext: { authorizer: { principalId: (await expiredToken()).principalId } }}
    const res = await me.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Autorização não encontrada!");
  });

  test("Should pass with valid token and user", async () => {
    const event = { requestContext: { authorizer: { principalId: (await validToken()).principalId } }}
    const res = await me.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(200);
    expect(body.email).toBe(user.email);
    expect(body.active).toBe(user.active);
  });

  test("Should fail if database error", async () => {
    const { Users } = await database();
    const mock = jest.spyOn(Users, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const event = { requestContext: { authorizer: { principalId: (await validToken()).principalId } }}
    const res = await me.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(401);
    expect(body.message).toBe("Não Autorizado!");
    mock.mockRestore();
  });
});
