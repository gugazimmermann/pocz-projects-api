import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";

const placeID = "d55a5d33-5744-46fa-9aa4-26ea3da9a625";

describe("Places API - Delete", () => {
  afterAll(() => { close() });

  test("Should fail without ID", async () => {
    const res = await handler(await createEvent(LambdaTypes.Delete, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid ID", async () => {
    const res = await handler(await createEvent(LambdaTypes.Delete, {}, Tokens.Valid, '6c7984c0-c4d4-441b-a25c-2d6d49cf24a0'));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
  });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.Delete, {}, Tokens.Valid, placeID));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).message).toBe("Registro excluido com sucesso!");
  });

  test("Should return database error", async () => {
    const { Places } = await database();
    const mock = jest.spyOn(Places, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.Delete, {}, Tokens.Valid, placeID));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
