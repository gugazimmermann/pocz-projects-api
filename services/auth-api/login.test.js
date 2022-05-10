import faker from "@faker-js/faker";
import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";
faker.locale = "pt_BR";

const login = { email: faker.internet.email(), password: faker.internet.password() };

describe("Auth API - Login", () => {
  afterAll(() => { close() });

    test("Should fail without email", async () => {
      const res = await handler(await createEvent(LambdaTypes.Login, { ...login, email: null }, Tokens.Valid));
      expect(res.statusCode).toEqual(400);
      expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
    });

    test("Should fail without password", async () => {
      const res = await handler(await createEvent(LambdaTypes.Login, { ...login, password: null }, Tokens.Valid));
      expect(res.statusCode).toEqual(400);
      expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
    });

    test("Should fail with invalid email", async () => {
      const res = await handler(await createEvent(LambdaTypes.Login, { ...login, email: 'a' }, Tokens.Valid));
      expect(res.statusCode).toEqual(400);
      expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
    });
  
    test("Should fail if email not found", async () => {
      const res = await handler(await createEvent(LambdaTypes.Login, login, Tokens.Valid));
      expect(res.statusCode).toEqual(404);
      expect(JSON.parse(res.body).message).toBe("Email ou senha inválidos!");
    });
  
    test("Should fail if user is not active", async () => {
      const res = await handler(await createEvent(LambdaTypes.Login, { ...login, email: 'test@test.com.br' }, Tokens.Valid));
      expect(res.statusCode).toEqual(401);
      expect(JSON.parse(res.body).message).toBe("Cadastro Inativo!");
    });
  
    test("Should fail if password is wrong", async () => {
      const res = await handler(await createEvent(LambdaTypes.Login, { ...login, email: 'gugazimmermann@gmail.com' }, Tokens.Valid));
      expect(res.statusCode).toEqual(404);
      expect(JSON.parse(res.body).message).toBe("Email ou senha inválidos!");
    });
  
    test("Should fail if user does not have subscription", async () => {
      const res = await handler(await createEvent(LambdaTypes.Login, { ...login, email: 'test2@test.com.br', password: "12345" }, Tokens.Valid));
      expect(res.statusCode).toEqual(404);
      expect(JSON.parse(res.body).message).toBe("Assinatura não encontrada!");
    });
  
    test("Should success", async () => {
      const res = await handler(await createEvent(LambdaTypes.Login, { ...login, email: 'gugazimmermann@gmail.com', password: "12345" }, Tokens.Valid));
      const body = JSON.parse(res.body);
      expect(res.statusCode).toEqual(200);
      expect(body.auth).toBe(true);
      expect(body.status).toBe("SUCCESS");
      expect(body.tenant).toBe("fd6bc51e-195e-4433-b404-8a9fdfa0f632");
    });
  
    test("Should return database error", async () => {
      const { Users } = await database();
      const mock = jest.spyOn(Users, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
      const res = await handler(await createEvent(LambdaTypes.Login, { ...login, email: 'gugazimmermann@gmail.com', password: "12345" }));
      expect(res.statusCode).toEqual(500);
      expect(JSON.parse(res.body).message).toBe("DB ERROR!");
      mock.mockRestore();
    });
});
