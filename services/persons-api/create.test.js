import faker from "@faker-js/faker";
import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";
faker.locale = "pt_BR";

const person = { 
  name: faker.name.firstName(), 
  type: 'contacts', 
  email: faker.internet.email(), 
  phone: ""
};

describe("Persons API - Create", () => {
  afterAll(() => { close() });

  test("Should fail without type", async () => {
    const res = await handler(await createEvent(LambdaTypes.Create, {...person, type: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without name", async () => {
    const res = await handler(await createEvent(LambdaTypes.Create, {...person, name: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid email", async () => {
    const res = await handler(await createEvent(LambdaTypes.Create, {...person, email: 'a'}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.Create, person, Tokens.Valid));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).body.name).toBe(person.name);
  });

  test("Should return database error", async () => {
    const { Persons } = await database();
    const mock = jest.spyOn(Persons, 'create').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.Create, person, Tokens.Valid));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
