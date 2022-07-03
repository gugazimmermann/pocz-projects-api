import database, { close } from "../../libs/connection";
import { Tokens, createEvent } from "../../libs/test-utils";
import { LambdaTypes, handler } from "./index";

const placeID = "099330a1-ddb2-402b-8560-a95848b69033";
const clientsList = [
  { id: "c2d40490-e098-404b-9e90-f333f9d14121" },
  { id: "d3e2320d-2da8-44ff-8cc7-65be5a2a5d63" },
  { id: "e59e2b6b-a6c6-48db-8620-d97acd49b6c0" },
  { id: "4e8c09c1-8f7b-417c-8ac4-69ed3e3f3feb" },
  { id: "b5bb4789-e609-4923-918b-2207aa61e8ea" },
];

describe("Places API - Clients", () => {
  afterAll(() => {
    close();
  });

  test("Should fail without ID", async () => {
    const res = await handler(
      await createEvent(
        LambdaTypes.Clients,
        { clientsList },
        Tokens.Valid,
        {}
      )
    );
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail without body", async () => {
    const res = await handler(
      await createEvent(LambdaTypes.Clients, {}, Tokens.Valid, { id: placeID })
    );
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.body).message).toBe("Dados inválidos!");
  });

  test("Should fail with invalid ID", async () => {
    const res = await handler(
      await createEvent(LambdaTypes.Clients, { clientsList }, Tokens.Valid, {
        id: "ae4e262e-545c-4165-ad6c-068a28008c59",
      })
    );
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res.body).message).toBe("Registro não encontrado!");
  });

  test("Should success", async () => {
    const res = await handler(
      await createEvent(LambdaTypes.Clients, { clientsList }, Tokens.Valid, {
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
      await createEvent(LambdaTypes.Clients, { clientsList }, Tokens.Valid, {
        id: placeID,
      })
    );
    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body).message).toBe("DB ERROR!");
    mock.mockRestore();
  });
});
