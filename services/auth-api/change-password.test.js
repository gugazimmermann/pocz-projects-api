import faker from "@faker-js/faker";
import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";
faker.locale = "pt_BR";

const change = { code: faker.datatype.number(), password: faker.internet.password() };

describe("Auth API - Change Password", () => {
  afterAll(() => { close() });

  test("Should fail without code", async () => {
    const res = await handler(await createEvent(LambdaTypes.ChangePassword, { ...change, code: null }, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without password", async () => {
    const res = await handler(await createEvent(LambdaTypes.ChangePassword, { ...change, password: null }, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail if code not found", async () => {
    const res = await handler(await createEvent(LambdaTypes.ChangePassword, change, Tokens.Valid));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Código não encontrado!");
  });

  test("Should fail if user not found", async () => {
    const res = await handler(await createEvent(LambdaTypes.ChangePassword, { ...change, code: '5678'}, Tokens.Valid));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Usuário não encontrado!");
  });

  test("Should fail if expired code", async () => {
    const res = await handler(await createEvent(LambdaTypes.ChangePassword, { ...change, code: '0000'}, Tokens.Valid));
    expect(res.statusCode).toEqual(401);
    expect(JSON.parse(res.body).message).toBe("Código expirado!");
  });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.ChangePassword, { ...change, code: '1234', password: '12345'}, Tokens.Valid));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).message).toBe("Password changed successfully!");
  });

  test("Should return database error", async () => {
    const { ForgotPassword } = await database();
    const mock = jest.spyOn(ForgotPassword, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.ChangePassword, change, Tokens.Valid));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
