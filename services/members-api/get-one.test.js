import { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";
import * as utils from "../shared/profiles-utils";

const memberID = "a5109879-c5c0-48d2-9f9b-f17450b89c7d";

describe("Members API - Get One", () => {
  afterAll(() => { close() });

  test("Should fail without ID", async () => {
    const res = await handler(await createEvent(LambdaTypes.GetOne, {}, Tokens.Valid, {}));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid ID", async () => {
    const res = await handler(await createEvent(LambdaTypes.GetOne, {}, Tokens.Valid, {id: '83e392cf-550e-47d6-b874-5dae7dd417df'}));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
  });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.GetOne, {}, Tokens.Valid, {id: memberID}));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).data.id).toBe(memberID);
  });

  test("Should return database error", async () => {
    const mock = jest.spyOn(utils, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.GetOne, {}, Tokens.Valid, {id: memberID}));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
