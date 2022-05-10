import faker from "@faker-js/faker";
import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";
faker.locale = "pt_BR";

const data = {
  name: "Guga",
  email: "gugazimmermann@gmail.com",
  address: faker.address.streetName(),
  neighborhood: faker.address.streetName(),
  city: faker.address.city(),
  state: faker.address.state(),
  phone: faker.phone.phoneNumber(),
  zip: faker.address.zipCode(),
}

describe("Profiles API - Update", () => {
  afterAll(() => { close() });

  test("Should fail without name", async () => {
    const res = await handler(await createEvent(LambdaTypes.Update, {...data, name: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without email", async () => {
    const res = await handler(await createEvent(LambdaTypes.Update, {...data, email: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid email", async () => {
    const res = await handler(await createEvent(LambdaTypes.Update, {...data, email: 'a'}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without address", async () => {
    const res = await handler(await createEvent(LambdaTypes.Update, {...data, address: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without city", async () => {
    const res = await handler(await createEvent(LambdaTypes.Update, {...data, city: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without state", async () => {
    const res = await handler(await createEvent(LambdaTypes.Update, {...data, state: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without phone", async () => {
    const res = await handler(await createEvent(LambdaTypes.Update, {...data, phone: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without zip", async () => {
    const res = await handler(await createEvent(LambdaTypes.Update, {...data, zip: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.Update, data, Tokens.Valid));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).data.address).toBe(data.address);
  });

  test("Should fail profile not found", async () => {
    const { Profiles } = await database();
    const mock = jest.spyOn(Profiles, 'findOne').mockResolvedValueOnce(null);
    const res = await handler(await createEvent(LambdaTypes.Update, data, Tokens.Valid));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
    mock.mockRestore();
  });

  test("Should return database error", async () => {
    const { Profiles } = await database();
    const mock = jest.spyOn(Profiles, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.Update, data, Tokens.Valid));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
