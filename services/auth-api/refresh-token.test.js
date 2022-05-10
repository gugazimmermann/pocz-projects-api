import faker from "@faker-js/faker";
import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";
faker.locale = "pt_BR";

const validRefreshToken = { refreshToken: "fa5adb0e-21ec-4ab1-b717-6d1e2a573e17" };
const expiredRefreshToken = { refreshToken: "8e0b583f-d795-4e92-a536-be7aca304846" };

describe("Auth API - Refresh Token", () => {
  afterAll(() => { close() });

  test("Should fail without refreshToken", async () => {
    const res = await handler(await createEvent(LambdaTypes.RefreshToken, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail if refreshToken not found", async () => {
    const res = await handler(await createEvent(LambdaTypes.RefreshToken, { refreshToken: faker.datatype.uuid() }, Tokens.Valid));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Refresh token não encontrado!");
  });

  test("Should fail if refreshToken is expired", async () => {
    const res = await handler(await createEvent(LambdaTypes.RefreshToken, expiredRefreshToken, Tokens.Valid));
    expect(res.statusCode).toEqual(403);
    expect(JSON.parse(res.body).message).toBe("Refresh token está expirado. Faça Login novamente.");
  });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.RefreshToken, validRefreshToken, Tokens.Valid));
    expect(res.statusCode).toEqual(200);
  });

  test("Should return database error", async () => {
    const { RefreshToken } = await database();
    const mock = jest.spyOn(RefreshToken, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.RefreshToken, validRefreshToken, Tokens.Valid));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
