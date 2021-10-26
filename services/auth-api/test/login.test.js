import faker from "faker";
import { close } from "../../../libs/connection";
import * as login from "../login";
faker.locale = "pt_BR";

describe("Auth API - Login", () => {
  afterAll(() => {
    close();
  });
  test("Should fail without email, password or invalid email", async () => {
    let user = {
      email: faker.internet.email(),
    };
    let res = await login.handler({ body: JSON.stringify(user) });
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");

    user = {
      password: faker.internet.password(),
    };
    res = await login.handler({ body: JSON.stringify(user) });
    body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");

    user = {
      email: faker.name.firstName(),
      password: faker.internet.password(),
      planId: "269a27f2-6006-445d-af03-b9c524556c9a",
    };
    res = await login.handler({ body: JSON.stringify(user) });
    body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");
  });

  test("Should if email not found", async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const res = await login.handler({ body: JSON.stringify(user) });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Email ou senha inválidos!");
  });

  test("Should if user is not active", async () => {
    const user = {
      email: "test@test.com.br",
      password: faker.internet.password(),
    };
    const res = await login.handler({ body: JSON.stringify(user) });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(401);
    expect(body.message).toBe("Cadastro Inativo!");
  });

  test("Should if password is wrong", async () => {
    const user = {
      email: "gugazimmermann@gmail.com",
      password: faker.internet.password(),
    };
    const res = await login.handler({ body: JSON.stringify(user) });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Email ou senha inválidos!");
  });

  test("Should if user does not have subscription", async () => {
    const user = {
      email: "test2@test.com.br",
      password: "12345",
    };
    const res = await login.handler({ body: JSON.stringify(user) });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Assinatura não encontrada!");
  });

  test("Should login", async () => {
    const user = {
      email: "gugazimmermann@gmail.com",
      password: "12345",
    };
    const res = await login.handler({ body: JSON.stringify(user) });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(200);
    expect(body.auth).toBe(true);
    expect(body.status).toBe("SUCCESS");
    expect(body.tenant).toBe("fd6bc51e-195e-4433-b404-8a9fdfa0f632");
  });

  test("Should return error wihtout database", async () => {
    const user = {
      email: "gugazimmermann@gmail.com",
      password: "12345",
    };
    close();
    const res = await login.handler({ body: JSON.stringify(user) });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(500);
    expect(body.message).toBe(
      "ConnectionManager.getConnection was called after the connection manager was closed!"
    );
  });
});
