import faker from "@faker-js/faker";
import database, { close } from "../../libs/connection";
import * as email from "../../libs/emails/forgot-password";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";
faker.locale = "pt_BR";

const validEmail = "gugazimmermann@gmail.com";
const inactiveEmail = "test@test.com.br";
const forgot = { email: faker.internet.email() };
let mockEmail;

describe("Auth API - Forgot Password", () => {
  beforeEach(() => { 
    mockEmail = jest.spyOn(email, 'sendForgotPasswordEmail').mockResolvedValueOnce({ 
      ResponseMetadata: { RequestId: "eda54736" }, MessageId: "0000000"
    });
  });
  afterEach(() => { mockEmail.mockRestore() });
  afterAll(() => { 
    close();
    mockEmail.mockRestore();
  });

  test("Should fail without email", async () => {
    const res = await handler(await createEvent(LambdaTypes.ForgotPassword, { ...forgot, email: null }, Tokens.Valid));
    expect(email.sendForgotPasswordEmail).toHaveBeenCalledTimes(0);
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid email", async () => {
    const res = await handler(await createEvent(LambdaTypes.ForgotPassword, { ...forgot, email: 'a' }, Tokens.Valid));
    expect(email.sendForgotPasswordEmail).toHaveBeenCalledTimes(0);
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail if user not found", async () => {
    const res = await handler(await createEvent(LambdaTypes.ForgotPassword, forgot, Tokens.Valid));
    expect(email.sendForgotPasswordEmail).toHaveBeenCalledTimes(0);
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Usuário não encontrado!");
  });

  test("Should fail if user is inactive", async () => {
    const res = await handler(await createEvent(LambdaTypes.ForgotPassword, { ...forgot, email: inactiveEmail}, Tokens.Valid));
    expect(email.sendForgotPasswordEmail).toHaveBeenCalledTimes(0);
    expect(res.statusCode).toEqual(401);
    expect(JSON.parse(res.body).message).toBe("Cadastro Inativo!");
  });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.ForgotPassword, { ...forgot, email: validEmail}, Tokens.Valid));
    expect(email.sendForgotPasswordEmail).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).email).toBe(validEmail);
  });

  test("Should return database error", async () => {
    const { Users } = await database();
    const mock = jest.spyOn(Users, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.ForgotPassword, forgot, Tokens.Valid));
    expect(email.sendForgotPasswordEmail).toHaveBeenCalledTimes(0);
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
