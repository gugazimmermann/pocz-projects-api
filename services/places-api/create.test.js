import faker from "@faker-js/faker";
import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";
faker.locale = "pt_BR";

const place = { 
  name: faker.name.firstName(),
  email: faker.internet.email(),
  address: faker.address.streetName(),
  neighborhood: faker.address.streetName(),
  city: faker.address.city(),
  state: faker.address.state(),
  zip: faker.address.zipCode(),
};

describe("Places API - Create", () => {
  afterAll(() => { close() });

  test("Should fail without name", async () => {
    const res = await handler(await createEvent(LambdaTypes.Create, {...place, name: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without zip", async () => {
    const res = await handler(await createEvent(LambdaTypes.Create, {...place, zip: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without address", async () => {
    const res = await handler(await createEvent(LambdaTypes.Create, {...place, address: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without city", async () => {
    const res = await handler(await createEvent(LambdaTypes.Create, {...place, city: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without state", async () => {
    const res = await handler(await createEvent(LambdaTypes.Create, {...place, state: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid email", async () => {
    const res = await handler(await createEvent(LambdaTypes.Create, {...place, email: 'a'}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.Create, place, Tokens.Valid));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).body.name).toBe(place.name);
  });

  test("Should return database error", async () => {
    const { Places } = await database();
    const mock = jest.spyOn(Places, 'create').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.Create, place, Tokens.Valid));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
