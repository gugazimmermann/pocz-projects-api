import faker from "@faker-js/faker";
import database, { close } from "../../libs/connection";
import * as forgotPassword from "./forgot-password";
import * as email from "../../libs/emails/forgot-password";
faker.locale = "pt_BR";

const validEmail = "gugazimmermann@gmail.com";

describe("Auth API - Forgot Password", () => {
  beforeEach(() => { 
    email.sendForgotPasswordEmail = jest.fn(() => Promise.resolve({ 
      ResponseMetadata: { RequestId: "eda54736" }, MessageId: "0000000"
    }));
  });
  afterEach(() => { jest.clearAllMocks() });
  afterAll(() => { close() });

  test("Should fail without email or invalid email", async () => {
    let event = { body: JSON.stringify({}) };
    let res = await forgotPassword.handler(event);
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");

    event = { body: JSON.stringify({ email: faker.name.firstName() }) };
    res = await forgotPassword.handler(event);
    body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");
  });

  test("Should fail if user not found", async () => {
    const event = { body: JSON.stringify({ email: faker.internet.email() }) };
    const res = await forgotPassword.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Usuário não encontrado!");
  });

  test("Should fail if user is inactive", async () => {
    const event = { body: JSON.stringify({ email: "test@test.com.br" }) };
    const res = await forgotPassword.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(401);
    expect(body.message).toBe("Cadastro Inativo!");
  });

  test("Should success", async () => {
    const event = { body: JSON.stringify({ email: validEmail }) };
    const res = await forgotPassword.handler(event);
    const body = JSON.parse(res.body);
    expect(email.sendForgotPasswordEmail).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toEqual(200);
    expect(body.email).toBe(validEmail);
  });

  test("Should return database error", async () => {
    const { Users } = await database();
    Users.findOne = jest.fn(() => Promise.reject(new Error("DB ERROR!")));
    const event = { body: JSON.stringify({ email: validEmail }) };
    const res = await forgotPassword.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(500);
    expect(body.message).toBe("DB ERROR!");
    jest.clearAllMocks();
  });
});
