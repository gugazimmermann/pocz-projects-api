import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";

const owners = [
  { type: 'person', id: 'fd6bc51e-195e-4433-b404-8a9fdfa0f632' },
  { type: 'place', id: '099330a1-ddb2-402b-8560-a95848b69033' }
];
const personClient = {id: "e59e2b6b-a6c6-48db-8620-d97acd49b6c0", owners};
const personContact = {id: "b5bb4789-e609-4923-918b-2207aa61e8ea", owners};
const personSuplier = {id: "4e8c09c1-8f7b-417c-8ac4-69ed3e3f3feb", owners};

describe("Persons API - Change Owner", () => {
  afterAll(() => { close() });

  test("Should fail without ID", async () => {
    const res = await handler(await createEvent(LambdaTypes.ChangeOwner, {...personClient, id: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid ID", async () => {
    const res = await handler(await createEvent(LambdaTypes.ChangeOwner, {...personClient, id: '7c2fa5a2-0e87-494e-a178-fb5e78965880'}, Tokens.Valid));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
  });

  test("Should success with person client", async () => {
    const res = await handler(await createEvent(LambdaTypes.ChangeOwner, personClient, Tokens.Valid));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).data.id).toBe(personClient.id);
  });

  test("Should success with person contact", async () => {
    const res = await handler(await createEvent(LambdaTypes.ChangeOwner, personContact, Tokens.Valid));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).data.id).toBe(personContact.id);
  });

  test("Should success with person suplier", async () => {
    const res = await handler(await createEvent(LambdaTypes.ChangeOwner, personSuplier, Tokens.Valid));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).data.id).toBe(personSuplier.id);
  });

  test("Should return database error", async () => {
    const { Persons } = await database();
    const mock = jest.spyOn(Persons, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.ChangeOwner, personClient, Tokens.Valid));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
