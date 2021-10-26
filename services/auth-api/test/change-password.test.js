import faker from "faker";
import { close } from "../../../libs/connection";
import * as changePassword from "../change-password";
faker.locale = "pt_BR";

describe("Auth API - Change Password", () => {
  afterAll(() => {
    close();
  });
  test("Should fail without code or password", async () => {
    let res = await changePassword.handler({
      body: JSON.stringify({
        code: faker.datatype.number(),
      }),
    });
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");

    res = await changePassword.handler({
      body: JSON.stringify({
        password: faker.internet.password(),
      }),
    });
    body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");
  });

  test("Should fail if code not found", async () => {
    const res = await changePassword.handler({
      body: JSON.stringify({
        code: faker.datatype.number(),
        password: faker.internet.password(),
      }),
    });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Código não encontrado!");
  });

  test("Should fail if user not found", async () => {
    const res = await changePassword.handler({
      body: JSON.stringify({
        code: "5678",
        password: faker.internet.password(),
      }),
    });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Usuário não encontrado!");
  });

  test("Should fail if expired code", async () => {
    const res = await changePassword.handler({
      body: JSON.stringify({
        code: "0000",
        password: faker.internet.password(),
      }),
    });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(401);
    expect(body.message).toBe("Código expirado!");
  });

  test("Should success", async () => {
    const res = await changePassword.handler({
      body: JSON.stringify({
        code: "1234",
        password: "12345",
      }),
    });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(200);
    expect(body.message).toBe("Password changed successfully!");
  });

  test("Should return error wihtout database", async () => {
    close();
    const res = await changePassword.handler({
      body: JSON.stringify({
        code: "1234",
        password: "12345",
      }),
    });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(500);
    expect(body.message).toBe(
      "ConnectionManager.getConnection was called after the connection manager was closed!"
    );
  });
});
