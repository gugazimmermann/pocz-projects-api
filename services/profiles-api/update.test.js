import FormData from "form-data";
import faker from "@faker-js/faker";
import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";
faker.locale = "pt_BR";

const profileData = {
  name: "Guga",
  email: "gugazimmermann@gmail.com",
  address: faker.address.streetName(),
  neighborhood: faker.address.streetName(),
  city: faker.address.city(),
  state: faker.address.state(),
  phone: faker.phone.phoneNumber(),
  zip: faker.address.zipCode(),
};

describe("Profiles API - Update", () => {
  afterAll(() => {
    close();
  });

  test("Should fail without name", async () => {
    const data = new FormData();
    Object.entries(profileData).forEach(([key, value]) => { if (key !== "name") data.append(key, value); });
    const res = await handler(await createEvent(LambdaTypes.Update, data, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without email", async () => {
    const data = new FormData();
    Object.entries(profileData).forEach(([key, value]) => { if (key !== "email") data.append(key, value); });
    const res = await handler(await createEvent(LambdaTypes.Update, data, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid email", async () => {
    const data = new FormData();
    Object.entries(profileData).forEach(([key, value]) => { 
      if (key !== "email") data.append(key, value);
      else data.append(key, "a");
    });
    const res = await handler(await createEvent(LambdaTypes.Update, data, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without address", async () => {
    const data = new FormData();
    Object.entries(profileData).forEach(([key, value]) => { if (key !== "address") data.append(key, value); });
    const res = await handler(await createEvent(LambdaTypes.Update, data, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without city", async () => {
    const data = new FormData();
    Object.entries(profileData).forEach(([key, value]) => { if (key !== "city") data.append(key, value); });
    const res = await handler(await createEvent(LambdaTypes.Update, data, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without state", async () => {
    const data = new FormData();
    Object.entries(profileData).forEach(([key, value]) => { if (key !== "state") data.append(key, value); });
    const res = await handler(await createEvent(LambdaTypes.Update, data, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without phone", async () => {
    const data = new FormData();
    Object.entries(profileData).forEach(([key, value]) => { if (key !== "phone") data.append(key, value); });
    const res = await handler(await createEvent(LambdaTypes.Update, data, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without zip", async () => {
    const data = new FormData();
    Object.entries(profileData).forEach(([key, value]) => { if (key !== "zip") data.append(key, value); });
    const res = await handler(await createEvent(LambdaTypes.Update, data, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should success", async () => {
    const data = new FormData();
    Object.entries(profileData).forEach(([key, value]) => data.append(key, value));
    const res = await handler(await createEvent(LambdaTypes.Update, data, Tokens.Valid));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).body.address).toBe(profileData.address);
  });

  test("Should fail profile not found", async () => {
    const { Profiles } = await database();
    const mock = jest.spyOn(Profiles, "findOne").mockResolvedValueOnce(null);
    const data = new FormData();
    Object.entries(profileData).forEach(([key, value]) => data.append(key, value));
    const res = await handler(await createEvent(LambdaTypes.Update, data, Tokens.Valid));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
    mock.mockRestore();
  });

  test("Should return database error", async () => {
    const { Profiles } = await database();
    const mock = jest.spyOn(Profiles, "findOne").mockRejectedValueOnce(new Error("DB ERROR!"));
    const data = new FormData();
    Object.entries(profileData).forEach(([key, value]) => data.append(key, value));
    const res = await handler(await createEvent(LambdaTypes.Update, data, Tokens.Valid));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
