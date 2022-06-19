import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";

describe("Places API - Active", () => {
  afterAll(() => { close() });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.Count, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(200);
    expect(typeof JSON.parse(res.body).body).toBe("number");
  });

  test("Should return database error", async () => {
    const { Places } = await database();
    const mock = jest.spyOn(Places, 'count').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.Count, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
