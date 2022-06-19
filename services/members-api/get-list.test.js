import { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";
import * as utils from "../shared/profiles-utils";

describe("Members API - Get List", () => {
  afterAll(() => { close() });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.GetList, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).body.length).toBeGreaterThanOrEqual(1);
  });

  test("Should return database error", async () => {
    const mock = jest.spyOn(utils, 'findAll').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.GetList, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
