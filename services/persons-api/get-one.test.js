import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";

const personID = "b5bb4789-e609-4923-918b-2207aa61e8ea";

describe("Persons API - Get One", () => {
  afterAll(() => { close() });

  test("Should fail without ID", async () => {
    const res = await handler(await createEvent(LambdaTypes.GetOne, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid ID", async () => {
    const res = await handler(await createEvent(LambdaTypes.GetOne, {}, Tokens.Valid, '63444ba7-8c94-4a1e-b371-3bb07d9b15d0'));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
  });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.GetOne, {}, Tokens.Valid, personID));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).data.type).toBe("Contatos");
  });

  test("Should return database error", async () => {
    const { Persons } = await database();
    const mock = jest.spyOn(Persons, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.GetOne, {}, Tokens.Valid, personID));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
