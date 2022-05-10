import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";

const placeID = "099330a1-ddb2-402b-8560-a95848b69033";

describe("Places API - Get One", () => {
  afterAll(() => { close() });

  test("Should fail without ID", async () => {
    const res = await handler(await createEvent(LambdaTypes.GetOne, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid ID", async () => {
    const res = await handler(await createEvent(LambdaTypes.GetOne, {}, Tokens.Valid, '82e10854-3a72-43f1-9a34-dde7baeac682'));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
  });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.GetOne, {}, Tokens.Valid, placeID));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).data.id).toBe(placeID);
  });

  test("Should return database error", async () => {
    const { Places } = await database();
    const mock = jest.spyOn(Places, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.GetOne, {}, Tokens.Valid, placeID));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
