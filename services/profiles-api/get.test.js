import { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";
import * as utils from "../shared/profiles-utils";

const validId = 'fd6bc51e-195e-4433-b404-8a9fdfa0f632';

describe("Profiles API - Get", () => {
  afterAll(() => { close() });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.Get, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).body.id).toBe(validId);
  });

  test("Should fail user not found", async () => {
    const mock = jest.spyOn(utils, 'findOne').mockResolvedValueOnce(null);
    const res = await handler(await createEvent(LambdaTypes.Get, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
    mock.mockRestore();
  });

  test("Should return database error", async () => {
    const mock = jest.spyOn(utils, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.Get, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });

});
