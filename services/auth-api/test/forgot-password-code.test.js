import faker from "faker";
import { close } from "../../../libs/connection";
import * as forgotPasswordCode from "../forgot-password-code";
faker.locale = "pt_BR";

describe("Auth API - Forgot Password Code", () => {
  afterAll(() => {
    close();
  });
  test("Should fail without codeurl", async () => {
    let res = await forgotPasswordCode.handler({ body: JSON.stringify({}) });
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Dados inválidos!");
  });

  test("Should fail if codeurl is not UUID", async () => {
    const res = await forgotPasswordCode.handler({
      body: JSON.stringify({ codeurl: faker.datatype.number() }),
    });
    const body = JSON.parse(res.body);
     expect(res.statusCode).toEqual(500);
    expect(body.message).toBe("operator does not exist: uuid = integer");
  });

  test("Should fail if codeurl is not found", async () => {
    const res = await forgotPasswordCode.handler({
      body: JSON.stringify({ codeurl: faker.datatype.uuid() }),
    });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Código não encontrado!");
  });

  test("Should success", async () => {
    const res = await forgotPasswordCode.handler({
      body: JSON.stringify({ codeurl: "31c5502a-56de-443f-9e67-9aa1be26b294" }),
    });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(200);
    expect(body.code).toBe(9876);
  });

  test("Should return error wihtout database", async () => {
    close();
    const res = await forgotPasswordCode.handler({
      body: JSON.stringify({ codeurl: "da549802-a6be-4b87-ba8c-e46632135acf" }),
    });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(500);
    expect(body.message).toBe(
      "ConnectionManager.getConnection was called after the connection manager was closed!"
    );
  });
});
