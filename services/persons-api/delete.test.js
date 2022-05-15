import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";

const personID = "6c832536-c713-4fe0-92a0-84693f4a2392";

describe("Persons API - Delete", () => {
  afterAll(() => { close() });

  test("Should fail without ID", async () => {
    const res = await handler(await createEvent(LambdaTypes.Delete, {}, Tokens.Valid, {}));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid ID", async () => {
    const res = await handler(await createEvent(LambdaTypes.Delete, {}, Tokens.Valid, {id: '53ba167d-48eb-49f8-a881-b6984132116a'}));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
  });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.Delete, {}, Tokens.Valid, {id: personID}));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).message).toBe("Registro excluido com sucesso!");
  });

  test("Should return database error", async () => {
    const { Persons } = await database();
    const mock = jest.spyOn(Persons, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.Delete, {}, Tokens.Valid, {id: personID}));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
