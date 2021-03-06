import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";

describe("Persons API - Handler", () => {

  test("Should fail without lambda type", async () => {
    const res = await handler(await createEvent(null, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(500);
    expect((JSON.parse(res.body)).message).toBe('No Event Type!');
  });

  test("Should fail with wrong lambda type", async () => {
    const res = await handler(await createEvent('a', {}, Tokens.Valid));
    expect(res.statusCode).toEqual(500);
    expect((JSON.parse(res.body)).message).toBe('No Event Type!');
  });

  test("Should fail without authorizer", async () => {
    const res = await handler(await createEvent(LambdaTypes.GetAll, {}));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Autorização não encontrada!");
  });

  test("Should fail with user not found", async () => {
    const res = await handler(await createEvent(LambdaTypes.GetAll, {}, Tokens.NotFound));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Usuário não encontrado!");
  });

  test("Should fail with expired token", async () => {
    const res = await handler(await createEvent(LambdaTypes.GetAll, {}, Tokens.Expired));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Autorização não encontrada!");
  });

});
