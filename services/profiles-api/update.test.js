import faker from "@faker-js/faker";
import database, { close } from "../../libs/connection";
import { userNotFoundToken, validToken } from "../../libs/test-utils";
import * as update from "./update";

describe("Profiles API - Update", () => {
  afterAll(() => { close() });
  
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

  test("Should fail with invalid data", async () => {
    const event = { 
      requestContext: { authorizer: { principalId: (await validToken()).principalId } },
      body: JSON.stringify({ name: faker.name.firstName() })
    };
    const res = await update.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");
  });

  test("Should fail with user not found", async () => {
    const event = { 
      requestContext: { authorizer: { principalId: (await userNotFoundToken()).principalId } },
      body: JSON.stringify(data)
    };
    const res = await update.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Usuário não encontrado!");
  });

  test("Should pass with valid token and user", async () => {
    const event = { 
      requestContext: { authorizer: { principalId: (await validToken()).principalId } },
      body: JSON.stringify(data)
    };
    const res = await update.handler(event);
    console.log(res)
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(200);
    expect(body.data.address).toBe(data.address);
  });

  test("Should not find user profile", async () => {
    const { Profiles } = await database();
    const mock = jest.spyOn(Profiles, 'findOne').mockResolvedValueOnce();
    const event = { 
      requestContext: { authorizer: { principalId: (await validToken()).principalId } },
      body: JSON.stringify(data)
    };
    const res = await update.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Registro não encontrado!");
    mock.mockRestore();
  });


  test("Should fail if database error", async () => {
    const { Profiles } = await database();
    const mock = jest.spyOn(Profiles, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const event = { 
      requestContext: { authorizer: { principalId: (await validToken()).principalId } },
      body: JSON.stringify(data)
    };
    const res = await update.handler(event);
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(500);
    expect(body.message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
