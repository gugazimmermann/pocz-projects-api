import faker from "@faker-js/faker";
import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";
faker.locale = "pt_BR";

const registerPaidPlan = {
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

const registerFreePlan = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  planId: "269a27f2-6006-445d-af03-b9c524556c9a",
};

describe("Auth API - Register", () => {
  afterAll(() => { close() });

  test("Should fail without name", async () => {
    const res = await handler(await createEvent(LambdaTypes.Register, { ...registerPaidPlan, name: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without email", async () => {
    const res = await handler(await createEvent(LambdaTypes.Register, { ...registerPaidPlan, email: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid email", async () => {
    const res = await handler(await createEvent(LambdaTypes.Register, { ...registerPaidPlan, email: 'a'}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail if email already exists", async () => {
    const res = await handler(await createEvent(LambdaTypes.Register, { ...registerPaidPlan, email: 'gugazimmermann@gmail.com'}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Email já está cadastrado!");
  });

  test("Should fail without password", async () => {
    const res = await handler(await createEvent(LambdaTypes.Register, { ...registerPaidPlan, password: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without planId", async () => {
    const res = await handler(await createEvent(LambdaTypes.Register, { ...registerPaidPlan, planId: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid planId", async () => {
    const res = await handler(await createEvent(LambdaTypes.Register, { ...registerPaidPlan, planId: 'eda55c96-7733-4c85-887b-34c4a2818b76'}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail transactionAmount > 0 and no card Info", async () => {
    const res = await handler(await createEvent(LambdaTypes.Register, { ...registerPaidPlan, cardInfo: null}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should create user with free plan and without card info", async () => {
    const res = await handler(await createEvent(LambdaTypes.Register, registerFreePlan, Tokens.Valid));
    expect(res.statusCode).toEqual(201);
    expect(JSON.parse(res.body).message).toBe("Usuário cadastrado com sucesso!");
  });

  test("Should create user with paid plan and with card info", async () => {
    const res = await handler(await createEvent(LambdaTypes.Register, { ...registerPaidPlan, email: faker.internet.email() }, Tokens.Valid));
    expect(res.statusCode).toEqual(201);
    expect(JSON.parse(res.body).message).toBe("Usuário cadastrado com sucesso!");
  });
 
  test("Should return database error", async () => {
    const { Plans } = await database();
    const mock = jest.spyOn(Plans, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.Register, registerPaidPlan, Tokens.Valid));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
