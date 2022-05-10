import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";

const userID = "8febd3ee-e9f3-4a7c-aecf-4cdd043b9fd3";
const inviteID = "7bf7eae9-472f-4f31-85c5-d760b1c93e2a";

describe("Members API - Get One", () => {
  afterAll(() => { close() });

  test("Should fail without id", async () => {
    const res = await handler(await createEvent(LambdaTypes.InvitesDelete, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid id", async () => {
    const res = await handler(await createEvent(LambdaTypes.InvitesDelete, {}, Tokens.Valid, '32e95deb-f8e8-4ad8-997a-84950b57b098'));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
  });

  test("Should fail with different tentant id ", async () => {
    const res = await handler(await createEvent(LambdaTypes.InvitesDelete, {}, Tokens.Valid, inviteID));
    expect(res.statusCode).toEqual(401);
    expect(JSON.parse(res.body).message).toBe("Sem permissão!");
  });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.InvitesDelete, {}, Tokens.Valid, inviteID, userID));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).message).toBe("Registro excluido com sucesso!");
  });

  test("Should return database error", async () => {
    const { Invites } = await database();
    const mock = jest.spyOn(Invites, 'findByPk').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.InvitesDelete, {}, Tokens.Valid, inviteID, userID));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
