import { close } from "../../libs/connection";
import { userNotFoundToken, validToken } from "../../libs/test-utils";
import * as utils from "./utils";
import * as get from "./get";

describe("Profiles API - Get", () => {
  afterAll(() => { close() });

  test("Should fail with user not found", async () => {
    const event = { requestContext: { authorizer: { principalId: (await userNotFoundToken()).principalId } }}
    const res = await get.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Usuário não encontrado!");
  });

  test("Should pass with valid token and user", async () => {
    const event = { requestContext: { authorizer: { principalId: (await validToken()).principalId } }}
    const res = await get.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(200);
    expect(body.data.name).toBe('Guga');
  });

  test("Should not find user profile", async () => {
    const mock = jest.spyOn(utils, 'findOne').mockResolvedValueOnce();
    const event = { requestContext: { authorizer: { principalId: (await validToken()).principalId } }}
    const res = await get.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Registro não encontrado!");
    mock.mockRestore();
  });

  test("Should fail if database error", async () => {
    const mock = jest.spyOn(utils, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const event = { requestContext: { authorizer: { principalId: (await validToken()).principalId } }}
    const res = await get.handler(event);
    console.log(res);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(500);
    expect(body.message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
