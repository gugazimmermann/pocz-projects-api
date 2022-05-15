import faker from "@faker-js/faker";
import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";
faker.locale = "pt_BR";

const placeId = "099330a1-ddb2-402b-8560-a95848b69033";
const place = { 
  name: "JR Advocacia",
  email: "contato@jr.adv.br",
  address: faker.address.streetName(),
  neighborhood: faker.address.streetName(),
  city: faker.address.city(),
  state: faker.address.state(),
  zip: faker.address.zipCode(),
};

describe("Places API - Update", () => {
  afterAll(() => { close() });

  test("Should fail without id", async () => {
    const res = await handler(await createEvent(LambdaTypes.Update, place, Tokens.Valid, {}));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without name", async () => {
    const res = await handler(await createEvent(LambdaTypes.Update, {...place, name: null}, Tokens.Valid, { id: placeId }));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without zip", async () => {
    const res = await handler(await createEvent(LambdaTypes.Update, {...place, zip: null}, Tokens.Valid, { id: placeId }));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without address", async () => {
    const res = await handler(await createEvent(LambdaTypes.Update, {...place, address: null}, Tokens.Valid, { id: placeId }));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without city", async () => {
    const res = await handler(await createEvent(LambdaTypes.Update, {...place, city: null}, Tokens.Valid, { id: placeId }));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without state", async () => {
    const res = await handler(await createEvent(LambdaTypes.Update, {...place, state: null}, Tokens.Valid, { id: placeId }));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid email", async () => {
    const res = await handler(await createEvent(LambdaTypes.Update, {...place, email: 'a'}, Tokens.Valid, { id: placeId }));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid id", async () => {
    const res = await handler(await createEvent(LambdaTypes.Update,place, Tokens.Valid, { id: "2e830d10-2205-4e3d-ae15-e6c96e1a297e" }));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
  });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.Update, place, Tokens.Valid, { id: placeId }));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).data.name).toBe("JR Advocacia");
    expect(JSON.parse(res.body).data.address).toBe(place.address);
  });

  test("Should return database error", async () => {
    const { Places } = await database();
    const mock = jest.spyOn(Places, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.Update, place, Tokens.Valid, { id: placeId }));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
