import faker from "@faker-js/faker";
import database, { close } from "../../libs/connection";
import * as refreshToken from "./refresh-token";
faker.locale = "pt_BR";

describe("Auth API - Refresh Token", () => {
  afterAll(() => { close() });

  test("Should fail without refreshToken", async () => {
    const event = { body: JSON.stringify({})};
    const res = await refreshToken.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");
  });

  test("Should fail if refreshToken not found", async () => {
    const event = { body: JSON.stringify({ refreshToken: faker.datatype.uuid() }) };
    const res = await refreshToken.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Refresh token não encontrado!");
  });

  test("Should fail if refreshToken is expired", async () => {
    const event = { body: JSON.stringify({ refreshToken: "8e0b583f-d795-4e92-a536-be7aca304846" }) };
    const res = await refreshToken.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(403);
    expect(body.message).toBe("Refresh token está expirado. Faça Login novamente.");
  });

  test("Should success", async () => {
    const event = { body: JSON.stringify({ refreshToken: "fa5adb0e-21ec-4ab1-b717-6d1e2a573e17" }) };
    const res = await refreshToken.handler(event);
    expect(res.statusCode).toEqual(200);
  });

  test("Should return database error", async () => {
    const { RefreshToken } = await database();
    const mock = jest.spyOn(RefreshToken, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const event = { body: JSON.stringify({ refreshToken: "fa5adb0e-21ec-4ab1-b717-6d1e2a573e17" }) };
    const res = await refreshToken.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(500);
    expect(body.message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
