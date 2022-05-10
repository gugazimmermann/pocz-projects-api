import faker from "@faker-js/faker";
import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";
faker.locale = "pt_BR";

const companyID = "c9d299cd-8138-4469-ace8-b7d9022274cf";

describe("Companies API - Delete", () => {
  afterAll(() => { close() });

  test("Should fail without ID", async () => {
    const res = await handler(await createEvent(LambdaTypes.Delete, {}, Tokens.Valid));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid ID", async () => {
    const res = await handler(await createEvent(LambdaTypes.Delete, {}, Tokens.Valid, 'dbdcad44-09d4-43ed-be42-72ab11665458'));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
  });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.Delete, {}, Tokens.Valid, companyID));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).message).toBe("Registro excluido com sucesso!");
  });

  test("Should return database error", async () => {
    const { Companies } = await database();
    const mock = jest.spyOn(Companies, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.Delete, {}, Tokens.Valid, companyID));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
