import faker from "@faker-js/faker";
import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";
faker.locale = "pt_BR";

const forgot = { codeurl: faker.datatype.uuid() };

describe("Auth API - Forgot Password Code", () => {
  afterAll(() => { close() });

  test("Should fail without codeurl", async () => {
    const res = await handler(await createEvent(LambdaTypes.ForgotPasswordCode, { ...forgot, codeurl: null }, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail if codeurl is not UUID", async () => {
    const res = await handler(await createEvent(LambdaTypes.ForgotPasswordCode, { ...forgot, codeurl: faker.datatype.number() }, Tokens.Valid));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("operator does not exist: uuid = integer");
  });

  test("Should fail if codeurl is not found", async () => {
    const res = await handler(await createEvent(LambdaTypes.ForgotPasswordCode, forgot, Tokens.Valid));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Código não encontrado!");
  });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.ForgotPasswordCode, { ...forgot, codeurl: "31c5502a-56de-443f-9e67-9aa1be26b294" }, Tokens.Valid));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).code).toBe(9876);
  });

  test("Should return database error", async () => {
    const { ForgotPassword } = await database();
    const mock = jest.spyOn(ForgotPassword, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.ForgotPasswordCode, forgot, Tokens.Valid));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
