import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";

describe("Subscriptions API - Credit Cards", () => {
  afterAll(() => { close() });
  
  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.CreditCards, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).body.length).toBe(1);
  });

  test("Should return database error", async () => {
    const { CreditCards } = await database();
    const mock = jest.spyOn(CreditCards, 'findAll').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.CreditCards, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
