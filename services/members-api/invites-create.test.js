import faker from "@faker-js/faker";
import database, { close } from "../../libs/connection";
import * as email from "../../libs/emails/invite";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";
import * as utils from "../shared/profiles-utils";
faker.locale = "pt_BR";

let invite;
let mockEmail;

describe("Members API - Create", () => {
  beforeEach(() => {
    invite = { name: faker.name.firstName(), email: faker.internet.email() };
    mockEmail = jest.spyOn(email, 'sendInviteEmail').mockResolvedValueOnce({ 
      ResponseMetadata: { RequestId: "eda54736" }, MessageId: "0000000"
    });
  });
  afterEach(() => { mockEmail.mockRestore() });
  afterAll(() => { 
    close();
    mockEmail.mockRestore();
  });

  test("Should fail without name", async () => {
    const res = await handler(await createEvent(LambdaTypes.InvitesCreate, {...invite, name: null}, Tokens.Valid));
    expect(email.sendInviteEmail).toHaveBeenCalledTimes(0);
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without email", async () => {
    const res = await handler(await createEvent(LambdaTypes.InvitesCreate, {...invite, email: null}, Tokens.Valid));
    expect(email.sendInviteEmail).toHaveBeenCalledTimes(0);
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid email", async () => {
    const res = await handler(await createEvent(LambdaTypes.InvitesCreate, {...invite, email: 'a'}, Tokens.Valid));
    expect(email.sendInviteEmail).toHaveBeenCalledTimes(0);
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid user", async () => {
    const mock = jest.spyOn(utils, 'findOne').mockResolvedValueOnce(null);
    const res = await handler(await createEvent(LambdaTypes.InvitesCreate, invite, Tokens.Valid));
    expect(email.sendInviteEmail).toHaveBeenCalledTimes(0);
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
    mock.mockRestore();
  });

  test("Should fail with already used email", async () => {
    const res = await handler(await createEvent(LambdaTypes.InvitesCreate, {...invite, email: 'guga@grr.la'}, Tokens.Valid));
    expect(email.sendInviteEmail).toHaveBeenCalledTimes(0);
    expect(res.statusCode).toEqual(401);
    expect(JSON.parse(res.body).message).toBe("Convite já criado, tente enviar novamente!");
  });

  test("Should fail with basic plan and invite pending", async () => {
    const res = await handler(await createEvent(LambdaTypes.InvitesCreate, invite, Tokens.Valid, null, '8febd3ee-e9f3-4a7c-aecf-4cdd043b9fd3'));
    expect(email.sendInviteEmail).toHaveBeenCalledTimes(0);
    expect(res.statusCode).toEqual(401);
    expect(JSON.parse(res.body).message).toBe("Plano sem permissão!");
  });

  test("Should fail with basic plan and user already registered", async () => {
    const res = await handler(await createEvent(LambdaTypes.InvitesCreate, invite, Tokens.Valid, null, 'b5ad793e-798f-4f55-8c7f-e3ac4a89e8b0'));
    expect(email.sendInviteEmail).toHaveBeenCalledTimes(0);
    expect(res.statusCode).toEqual(401);
    expect(JSON.parse(res.body).message).toBe("Plano sem permissão!");
  });

  test("Should success with basic plan", async () => {
    const res = await handler(await createEvent(LambdaTypes.InvitesCreate, invite, Tokens.Valid, null, '0772b5bd-a385-40bb-99b6-6c41838167cc'));
    expect(email.sendInviteEmail).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).data.name).toBe(invite.name);
  });
  
  test("Should success with profissional plan", async () => {
    const res = await handler(await createEvent(LambdaTypes.InvitesCreate, invite, Tokens.Valid));
    expect(mockEmail).toHaveBeenCalledTimes(1);
    expect(email.sendInviteEmail).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).data.name).toBe(invite.name);
  });

  test("Should return database error", async () => {
    const { Invites } = await database();
    const mock = jest.spyOn(Invites, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.InvitesCreate, invite, Tokens.Valid));
    expect(email.sendInviteEmail).toHaveBeenCalledTimes(0);
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
