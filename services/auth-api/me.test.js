import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";

const validUser = { userId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632", email: "gugazimmermann@gmail.com", active: true };

describe("Auth API - Me", () => {
  afterAll(() => { close() });

  test("Should fail without authorizer", async () => {
    const res = await handler(await createEvent(LambdaTypes.Me, {}));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Autorização não encontrada!");
  });

  test("Should fail with user not found", async () => {
    const res = await handler(await createEvent(LambdaTypes.Me, {}, Tokens.NotFound));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Usuário não encontrado!");
  });

  test("Should fail with expired token", async () => {
    const res = await handler(await createEvent(LambdaTypes.Me, {}, Tokens.Expired));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Autorização não encontrada!");
  });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.Me, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(200);
    const body = JSON.parse(res.body);
    expect(body.userId).toBe(validUser.userId);
    expect(body.email).toBe(validUser.email);
    expect(body.active).toBe(validUser.active);
  });

  test("Should fail with database error", async () => {
    const { Users } = await database();
    const mock = jest.spyOn(Users, 'findByPk').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.Me, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(401);
    expect(JSON.parse(res.body).message).toBe('Não Autorizado!');
    mock.mockRestore();
  });
});
