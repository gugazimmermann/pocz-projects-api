import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";

const code = 651685;

describe("Members API - Invites Code", () => {
  afterAll(() => { close() });

  test("Should fail without code", async () => {
    const res = await handler(await createEvent(LambdaTypes.InvitesCode, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid code", async () => {
    const res = await handler(await createEvent(LambdaTypes.InvitesCode, {}, Tokens.Valid, 111111));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
  });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.InvitesCode, {}, Tokens.Valid, code));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).data.id).toBe("2c8d0893-642f-4c45-89fd-49ab9e15f72a");
  });

  test("Should return database error", async () => {
    const { Invites } = await database();
    const mock = jest.spyOn(Invites, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.InvitesCode, {}, Tokens.Valid, code));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
