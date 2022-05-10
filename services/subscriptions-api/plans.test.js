import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";

describe("Subscriptions API - Plans", () => {
  afterAll(() => { close() });
  
  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.Plans, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).data.length).toBe(7);
  });

  test("Should return database error", async () => {
    const { Plans } = await database();
    const mock = jest.spyOn(Plans, 'findAll').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.Plans, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
