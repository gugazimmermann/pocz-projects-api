import faker from "faker";
import { close } from "../../../libs/connection";
import * as forgotPassword from "../forgot-password";
import * as emailService from "../send-email";
faker.locale = "pt_BR";

describe("Auth API - Forgot Password", () => {
  beforeEach(() => {
    emailService.sendEmail = jest.fn(() =>
      Promise.resolve({
        ResponseMetadata: { RequestId: "eda54736" },
        MessageId: "0000000",
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    close();
  });
  test("Should fail without email or invalid email", async () => {
    let res = await forgotPassword.handler({ body: JSON.stringify({}) });
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");

    res = await forgotPassword.handler({
      body: JSON.stringify({ email: faker.name.firstName() }),
    });
    body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");
  });

  test("Should fail if user not found", async () => {
    const res = await forgotPassword.handler({
      body: JSON.stringify({ email: faker.internet.email() }),
    });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Usuário não encontrado!");
  });

  test("Should fail if user is inactive", async () => {
    const res = await forgotPassword.handler({
      body: JSON.stringify({ email: "test@test.com.br" }),
    });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(401);
    expect(body.message).toBe("Cadastro Inativo!");
  });

  test("Should success", async () => {
    const email = "gugazimmermann@gmail.com";
    const res = await forgotPassword.handler({
      body: JSON.stringify({ email }),
    });
    const body = JSON.parse(res.body);
    expect(emailService.sendEmail).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toEqual(200);
    expect(body.email).toBe(email);
  });

  test("Should return error wihtout database", async () => {
    const email = "gugazimmermann@gmail.com";
    close();
    const res = await forgotPassword.handler({
      body: JSON.stringify({ email }),
    });
    const body = JSON.parse(res.body);
    expect(emailService.sendEmail).toHaveBeenCalledTimes(0);
    expect(res.statusCode).toEqual(500);
    expect(body.message).toBe(
      "ConnectionManager.getConnection was called after the connection manager was closed!"
    );
  });
});
