import faker from "@faker-js/faker";
import database, { close } from "../../libs/connection";
import * as email from "../../libs/emails/invite";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";
import * as utils from "../shared/profiles-utils";
faker.locale = "pt_BR";

const inviteId = "165d90a3-356e-4c55-b86b-31d75ab8cd07";
let mockEmail;

describe("Members API - Create", () => {
  beforeEach(() => {
    mockEmail = jest.spyOn(email, 'sendInviteEmail').mockResolvedValueOnce({ 
      ResponseMetadata: { RequestId: "eda54736" }, MessageId: "0000000"
    });
  });
  afterEach(() => { mockEmail.mockRestore() });
  afterAll(() => { 
    close();
    mockEmail.mockRestore();
  });

  test("Should fail without id", async () => {
    const res = await handler(await createEvent(LambdaTypes.InvitesSend, {}, Tokens.Valid, {}));
    expect(email.sendInviteEmail).toHaveBeenCalledTimes(0);
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid user", async () => {
    const mock = jest.spyOn(utils, 'findOne').mockResolvedValueOnce(null);
    const res = await handler(await createEvent(LambdaTypes.InvitesSend, {}, Tokens.Valid, {id: inviteId}));
    expect(email.sendInviteEmail).toHaveBeenCalledTimes(0);
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
    mock.mockRestore();
  });

  test("Should fail with invalid id", async () => {
    const res = await handler(await createEvent(LambdaTypes.InvitesSend, {}, Tokens.Valid, {id: '10b7110d-e0dd-49ae-af44-a4c17e9e31e5'}));
    expect(email.sendInviteEmail).toHaveBeenCalledTimes(0);
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
  });

  test("Should fail if user already accept", async () => {
    const { Profiles } = await database();
    const mock = jest.spyOn(Profiles, 'findOne').mockResolvedValueOnce({});
    const res = await handler(await createEvent(LambdaTypes.InvitesSend, {}, Tokens.Valid, {id: inviteId}));
    expect(email.sendInviteEmail).toHaveBeenCalledTimes(0);
    expect(res.statusCode).toEqual(403);
    expect(JSON.parse(res.body).message).toBe("Convite já foi aceito!");
    mock.mockRestore();
  });
  
  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.InvitesSend, {}, Tokens.Valid, {id: inviteId}));
    expect(mockEmail).toHaveBeenCalledTimes(1);
    expect(email.sendInviteEmail).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toEqual(202);
    expect(JSON.parse(res.body).message).toBe("Convite Enviado!");
  });

  test("Should return database error", async () => {
    const { Invites } = await database();
    const mock = jest.spyOn(Invites, 'findByPk').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.InvitesSend, {}, Tokens.Valid, {id: inviteId}));
    expect(email.sendInviteEmail).toHaveBeenCalledTimes(0);
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
