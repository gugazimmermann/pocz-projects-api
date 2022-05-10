import faker from "@faker-js/faker";
import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";
faker.locale = "pt_BR";

const company = { 
  name: faker.name.firstName(), 
  type: 'Contatos', 
  email: faker.internet.email(), 
  phone: ""
};

describe("Companies API - Create", () => {
  afterAll(() => { close() });

  test("Should fail without type", async () => {
    const res = await handler(await createEvent(LambdaTypes.Create, {...company, type: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without name", async () => {
    const res = await handler(await createEvent(LambdaTypes.Create, {...company, name: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid email", async () => {
    const res = await handler(await createEvent(LambdaTypes.Create, {...company, email: 'a'}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.Create, company, Tokens.Valid));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).data.name).toBe(company.name);
  });

  test("Should return database error", async () => {
    const { Companies } = await database();
    const mock = jest.spyOn(Companies, 'create').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.Create, company, Tokens.Valid));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
