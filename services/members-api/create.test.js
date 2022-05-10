import faker from "@faker-js/faker";
import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";
import * as utils from "../shared/profiles-utils";
faker.locale = "pt_BR";

const member = { 
  code: 640245, 
  password: faker.internet.password(), 
};

describe("Members API - Create", () => {
  afterAll(() => { close() });

  test("Should fail without code", async () => {
    const res = await handler(await createEvent(LambdaTypes.Create, {...member, code: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without password", async () => {
    const res = await handler(await createEvent(LambdaTypes.Create, {...member, password: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid code", async () => {
    const res = await handler(await createEvent(LambdaTypes.Create, {...member, code: 111111}, Tokens.Valid));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
  });

  test("Should fail with invalid user", async () => {
    const mock = jest.spyOn(utils, 'findOne').mockResolvedValueOnce(null);
    const res = await handler(await createEvent(LambdaTypes.Create, member, Tokens.Valid));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
    mock.mockRestore();
  });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.Create, member, Tokens.Valid));
    expect(res.statusCode).toEqual(201);
    expect(JSON.parse(res.body).message).toBe("Usuário cadastrado com sucesso!");
  });

  test("Should return database error", async () => {
    const { Invites } = await database();
    const mock = jest.spyOn(Invites, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.Create, member, Tokens.Valid));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
