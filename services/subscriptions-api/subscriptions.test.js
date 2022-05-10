import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";

describe("Subscriptions API - Subscriptions", () => {
  afterAll(() => { close() });
  
  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.Subscriptions, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).data.id).toBe("458a4fbf-beae-4311-a2f9-81a77aad4adf");
  });

  test("Should fail if subscription not found", async () => {
    const { Subscriptions } = await database();
    const mock = jest.spyOn(Subscriptions, 'findOne').mockResolvedValueOnce(null);
    const res = await handler(await createEvent(LambdaTypes.Subscriptions, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Assinatura não encontrada!");
    mock.mockRestore();
  });

  test("Should return database error", async () => {
    const { Subscriptions } = await database();
    const mock = jest.spyOn(Subscriptions, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.Subscriptions, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
