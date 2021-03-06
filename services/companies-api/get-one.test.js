import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";

const companyID = "a7f307fe-84ed-41c2-8295-9150919d68b1";

describe("Companies API - Get One", () => {
  afterAll(() => { close() });

  test("Should fail without ID", async () => {
    const res = await handler(await createEvent(LambdaTypes.GetOne, {}, Tokens.Valid, {}));
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid ID", async () => {
    const res = await handler(await createEvent(LambdaTypes.GetOne, {}, Tokens.Valid, {id: 'dbdcad44-09d4-43ed-be42-72ab11665458'}));
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
  });

  test("Should success", async () => {
    const res = await handler(await createEvent(LambdaTypes.GetOne, {}, Tokens.Valid, {id: companyID}));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).body.phone).toBe("(47) 99999-9999");
  });

  test("Should return database error", async () => {
    const { Companies } = await database();
    const mock = jest.spyOn(Companies, 'findOne').mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(await createEvent(LambdaTypes.GetOne, {}, Tokens.Valid, {id: companyID}));
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
