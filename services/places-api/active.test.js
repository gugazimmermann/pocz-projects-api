import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";

const placeId = "099330a1-ddb2-402b-8560-a95848b69033";

describe("Places API - Active", () => {
  afterAll(() => { close() });

  test("Should fail without id", async () => {
    const res = await handler(await createEvent(LambdaTypes.Active, {active: true}, Tokens.Valid, null));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without active", async () => {
    const res = await handler(await createEvent(LambdaTypes.Active, {}, Tokens.Valid, placeId));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with active not boolean", async () => {
    const res = await handler(await createEvent(LambdaTypes.Active, {active: 'a'}, Tokens.Valid, placeId));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid ID", async () => {
    const res = await handler(await createEvent(LambdaTypes.Active, {active: true}, Tokens.Valid, 'a51d821d-59e8-498d-91b7-567b0b509c67'));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
  });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.Active, {active: true}, Tokens.Valid, placeId));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).data.id).toBe(placeId);
    expect(JSON.parse(res.body).data.active).toBe(true);
  });

  test("Should return database error", async () => {
    const { Places } = await database();
    const mock = jest.spyOn(Places, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.Active, {active: true}, Tokens.Valid, placeId));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
