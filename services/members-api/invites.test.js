import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";

describe("Members API - Invites Code", () => {
  afterAll(() => { close() });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.Invites, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).data.length).toBeGreaterThanOrEqual(1);
  });

  test("Should return database error", async () => {
    const { Invites } = await database();
    const mock = jest.spyOn(Invites, 'findAll').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.Invites, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
