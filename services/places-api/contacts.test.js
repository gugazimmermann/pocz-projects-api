import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";

const placeID = "099330a1-ddb2-402b-8560-a95848b69033";
const contactsList = [{ id: "70183427-d5e4-4a1e-97ba-ee434403bb80" }];

describe("Places API - Contacts", () => {
  afterAll(() => {
    close();
  });

  test("Should fail without ID", async () => {
    const res = await handler(
      await createEvent(
        LambdaTypes.Contacts,
        { contactsList },
        Tokens.Valid,
        {}
      )
    );
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without body", async () => {
    const res = await handler(
      await createEvent(LambdaTypes.Contacts, {}, Tokens.Valid, { id: placeID })
    );
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid ID", async () => {
    const res = await handler(
      await createEvent(LambdaTypes.Contacts, { contactsList }, Tokens.Valid, {
        id: "ae4e262e-545c-4165-ad6c-068a28008c59",
      })
    );
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
  });

  test("Should success", async () => {
    const res = await handler(
      await createEvent(LambdaTypes.Contacts, { contactsList }, Tokens.Valid, {
        id: placeID,
      })
    );
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body).body.id).toBe(placeID);
  });

  test("Should return database error", async () => {
    const { Places } = await database();
    const mock = jest
      .spyOn(Places, "findOne")
      .mockRejectedValueOnce(new Error("DB ERROR!"));
    const res = await handler(
      await createEvent(LambdaTypes.Contacts, { contactsList }, Tokens.Valid, {
        id: placeID,
      })
    );
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
