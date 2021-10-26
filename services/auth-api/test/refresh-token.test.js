import faker from "faker";
import { close } from "../../../libs/connection";
import * as refreshToken from "../refresh-token";
faker.locale = "pt_BR";

describe("Auth API - Refresh Token", () => {
  afterAll(() => {
    close();
  });
  test("Should fail without refreshToken", async () => {
    let res = await refreshToken.handler({
      body: JSON.stringify({}),
    });
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");
  });

  test("Should fail if refreshToken not found", async () => {
    const res = await refreshToken.handler({
      body: JSON.stringify({
        refreshToken: faker.datatype.uuid(),
      }),
    });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Refresh token não encontrado!");
  });

  test("Should fail if refreshToken is expired", async () => {
    const res = await refreshToken.handler({
      body: JSON.stringify({
        refreshToken: "8e0b583f-d795-4e92-a536-be7aca304846",
      }),
    });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(403);
    expect(body.message).toBe(
      "Refresh token está expirado. Faça Login novamente."
    );
  });

  test("Should success", async () => {
    const res = await refreshToken.handler({
      body: JSON.stringify({
        refreshToken: "fa5adb0e-21ec-4ab1-b717-6d1e2a573e17",
      }),
    });
    expect(res.statusCode).toEqual(200);
  });

  test("Should return error wihtout database", async () => {
    close();
    const res = await refreshToken.handler({
      body: JSON.stringify({
        refreshToken: "fa5adb0e-21ec-4ab1-b717-6d1e2a573e17",
      }),
    });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(500);
    expect(body.message).toBe(
      "ConnectionManager.getConnection was called after the connection manager was closed!"
    );
  });
});
