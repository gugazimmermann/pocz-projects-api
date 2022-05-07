import database, { close } from "../../libs/connection";
import * as plans from "./plans";

describe("Subscriptions API - Plans", () => {
  afterAll(() => { close() });

  test("Should pass with valid token and user", async () => {
    const res = await plans.handler();
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(200);
    expect(body.data.length).toBe(7);
  });

  test("Should fail if database error", async () => {
    const { Plans } = await database();
    const mock = jest.spyOn(Plans, 'findAll').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await plans.handler();
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(500);
    expect(body.message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
