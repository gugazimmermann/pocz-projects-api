import faker from "@faker-js/faker";
import database, { close } from "../../libs/connection";
import * as forgotPasswordCode from "./forgot-password-code";
faker.locale = "pt_BR";

describe("Auth API - Forgot Password Code", () => {
  afterAll(() => { close() });

  test("Should fail without codeurl", async () => {
    const event = { body: JSON.stringify({}) };
    const res = await forgotPasswordCode.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");
  });

  test("Should fail if codeurl is not UUID", async () => {
    const event = { body: JSON.stringify({ codeurl: faker.datatype.number() }) };
    const res = await forgotPasswordCode.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(500);
    expect(body.message).toBe("operator does not exist: uuid = integer");
  });

  test("Should fail if codeurl is not found", async () => {
    const event = { body: JSON.stringify({ codeurl: faker.datatype.uuid() }) };
    const res = await forgotPasswordCode.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Código não encontrado!");
  });

  test("Should success", async () => {
    const event = { body: JSON.stringify({ codeurl: "31c5502a-56de-443f-9e67-9aa1be26b294" }) };
    const res = await forgotPasswordCode.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(200);
    expect(body.code).toBe(9876);
  });

  test("Should return database error", async () => {
    const { ForgotPassword } = await database();
    ForgotPassword.findOne = jest.fn(() => Promise.reject(new Error("DB ERROR!")));
    const event = { body: JSON.stringify({ codeurl: "31c5502a-56de-443f-9e67-9aa1be26b294" }) };
    const res = await forgotPasswordCode.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(500);
    expect(body.message).toBe("DB ERROR!");
    jest.clearAllMocks();
  });
});
