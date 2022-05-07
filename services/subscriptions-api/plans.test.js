import database, { close } from "../../libs/connection";
import * as plans from "./plans";

describe("Subscriptions API - Plans", () => {
  afterAll(() => { close() });

  test("Should pass with valid token and user", async () => {
    const res = await plans.handler();
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(200);
    expect(body.plans.length).toBe(7);
  });

  test("Should fail if database error", async () => {
    const { Plans } = await database();
    Plans.findAll = jest.fn(() => Promise.reject(new Error("DB ERROR!")));
    const res = await plans.handler();
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(401);
    expect(body.message).toBe("Não Autorizado!");
    jest.clearAllMocks();
  });
});
