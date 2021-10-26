import { close } from "../../../libs/connection";
import * as plans from "../plans";

describe("Subscriptions API - Plans", () => {
  afterAll(() => {
    close();
  });
  
  test("Should pass", async () => {
    let res = await plans.handler({});
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(200);
    expect(body.plans.length).toBe(7);
  });

  test("Should return error wihtout database", async () => {
    close();
    let res = await plans.handler({});
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(500);
    expect(body.message).toBe(
      "ConnectionManager.getConnection was called after the connection manager was closed!"
    );
  });
});
