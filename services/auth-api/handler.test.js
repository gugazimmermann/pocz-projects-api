import { createEvent } from "../../libs/test-utils";
import { handler } from "./index";

describe("Auth API - Handler", () => {
  test("Should fail without lambda type", async () => {
    const res = await handler(await createEvent(null, {}));
    expect(res.statusCode).toEqual(500);
    expect((JSON.parse(res.body)).message).toBe('No Event Type!');
  });

  test("Should fail with wrong lambda type", async () => {
    const res = await handler(await createEvent('a', {}));
    expect(res.statusCode).toEqual(500);
    expect((JSON.parse(res.body)).message).toBe('No Event Type!');
  });

});
