import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";

const types = ["Clientes","Contatos","Fornecedores"]

describe("Persons API - Get All", () => {
  afterAll(() => { close() });

  test("Should fail without type", async () => {
    const res = await handler(await createEvent(LambdaTypes.GetAll, {}, Tokens.Valid, {}));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test(`Should success with type ${types[0]}`, async () => {
    const res = await handler(await createEvent(LambdaTypes.GetAll, {}, Tokens.Valid, {type: types[0]}));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).data.length).toBeGreaterThanOrEqual(1);
  });

  test(`Should success with type ${types[1]}`, async () => {
    const res = await handler(await createEvent(LambdaTypes.GetAll, {}, Tokens.Valid, {type: types[1]}));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).data.length).toBeGreaterThanOrEqual(1);
  });

  test(`Should success with type ${types[2]}`, async () => {
    const res = await handler(await createEvent(LambdaTypes.GetAll, {}, Tokens.Valid, {type: types[2]}));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).data.length).toBeGreaterThanOrEqual(1);
  });

  test("Should return database error", async () => {
    const { Persons } = await database();
    const mock = jest.spyOn(Persons, 'findAll').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.GetAll, {}, Tokens.Valid, {type: types[0]}));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
