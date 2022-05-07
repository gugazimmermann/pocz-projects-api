import faker from "@faker-js/faker";
import database, { close } from "../../libs/connection";
import * as changePassword from "./change-password";
faker.locale = "pt_BR";

describe("Auth API - Change Password", () => {
  afterAll(() => { close() });

  test("Should fail without code or password", async () => {
    let event = { body: JSON.stringify({ code: faker.datatype.number() }) };
    let res = await changePassword.handler(event);
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");

    event = { body: JSON.stringify({ password: faker.internet.password() }) };
    res = await changePassword.handler(event);
    body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");
  });

  test("Should fail if code not found", async () => {
    const event = { body: JSON.stringify({ code: faker.datatype.number(), password: faker.internet.password() }) };
    const res = await changePassword.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Código não encontrado!");
  });

  test("Should fail if user not found", async () => {
    const event = { body: JSON.stringify({ code: "5678", password: faker.internet.password() }) };
    const res = await changePassword.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Usuário não encontrado!");
  });

  test("Should fail if expired code", async () => {
    const event = { body: JSON.stringify({ code: "0000", password: faker.internet.password() }) };
    const res = await changePassword.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(401);
    expect(body.message).toBe("Código expirado!");
  });

  test("Should success", async () => {
    const event = { body: JSON.stringify({ code: "1234", password: "12345" }) };
    const res = await changePassword.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(200);
    expect(body.message).toBe("Password changed successfully!");
  });

  test("Should return database error", async () => {
    const { ForgotPassword } = await database();
    const mock = jest.spyOn(ForgotPassword, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const event = { body: JSON.stringify({ code: "1234", password: "12345" }) };
    const res = await changePassword.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(500);
    expect(body.message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
