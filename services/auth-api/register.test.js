import faker from "@faker-js/faker";
import { close } from "../../libs/connection";
import * as register from "./register";
faker.locale = "pt_BR";

describe("Auth API - Register", () => {
  afterAll(() => { close() });

  test("Should fail without name, email, password, planId or invalid email", async () => {
    let user = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    let res = await register.handler({ body: JSON.stringify(user) });
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");

    user = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      planId: "babeaa81-e4f0-4528-91df-1d48d273466c",
    };
    res = await register.handler({ body: JSON.stringify(user) });
    body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");

    user = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      planId: "269a27f2-6006-445d-af03-b9c524556c9a",
    };
    res = await register.handler({ body: JSON.stringify(user) });
    body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");

    user = {
      name: faker.name.firstName(),
      password: faker.internet.password(),
      planId: "269a27f2-6006-445d-af03-b9c524556c9a",
    };
    res = await register.handler({ body: JSON.stringify(user) });
    body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");

    user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      planId: "269a27f2-6006-445d-af03-b9c524556c9a",
    };
    res = await register.handler({ body: JSON.stringify(user) });
    body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");

    user = {
      name: faker.name.firstName(),
      email: faker.name.firstName(),
      password: faker.internet.password(),
      planId: "269a27f2-6006-445d-af03-b9c524556c9a",
    };
    res = await register.handler({ body: JSON.stringify(user) });
    body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");
  });

  test("Should fail if email already exists", async () => {
    const user = {
      name: faker.name.firstName(),
      email: "gugazimmermann@gmail.com",
      password: faker.internet.password(),
      planId: "269a27f2-6006-445d-af03-b9c524556c9a",
    };
    const res = await register.handler({ body: JSON.stringify(user) });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body).toBe("Email já está cadastrado!");
  });

  test("Should fail transactionAmount > 0 and no card Info", async () => {
    const user = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      planId: "ea4a6bb7-fa4c-4003-bfa7-350b89ccf51f",
    };
    const res = await register.handler({ body: JSON.stringify(user) });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body).toBe("Dados inválidos!");
  });

  test("Should create user with free plan and without card info", async () => {
    const user = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      planId: "269a27f2-6006-445d-af03-b9c524556c9a",
    };
    const res = await register.handler({ body: JSON.stringify(user) });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(201);
    expect(body.message).toBe("Usuário cadastrado com sucesso!");
  });

  test("Should create user with paid plan and with card info", async () => {
    const user = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      planId: "ea4a6bb7-fa4c-4003-bfa7-350b89ccf51f",
      cardInfo: {
        name: faker.name.firstName(),
        firstSixDigits: "123456",
        lastFourDigits: "1234",
        expirationMonth: "01",
        expirationYear: "21",
      },
    };
    const res = await register.handler({ body: JSON.stringify(user) });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(201);
    expect(body.message).toBe("Usuário cadastrado com sucesso!");
  });
});
