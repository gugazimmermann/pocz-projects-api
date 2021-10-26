import { close } from "../../../libs/connection";
import {
  expiredToken,
  userNotFoundToken,
  validToken,
} from "../../../libs/test-utils";
import * as me from "../me";

describe("Auth API - Me", () => {
  afterAll(() => {
    close();
  });

  test("Should fail without authorizationToken", async () => {
    let res = await me.handler({});
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(400);
    expect(body.message).toBe("Autorização não encontrada!");
  });

  test("Should fail with invalid token", async () => {
    let res = await me.handler({
      headers: {
        Authorization: expiredToken(),
      },
    });
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(401);
    expect(body.message).toBe("Não Autorizado!");
  });

  test("Should fail with user not found", async () => {
    let res = await me.handler({
      headers: {
        Authorization: userNotFoundToken(),
      },
    });
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe("Usuário não encontrado!");
  });

  test("Should pass with valid token and user", async () => {
    const user = {
      userId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
      email: "gugazimmermann@gmail.com",
      active: true,
    };
    let res = await me.handler({
      headers: {
        Authorization: validToken(),
      },
    });
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(200);
    expect(body.email).toBe(user.email);
    expect(body.active).toBe(user.active);
  });

  test("Should return error wihtout database", async () => {
    close();
    let res = await me.handler({
      headers: {
        Authorization: validToken(),
      },
    });
    let body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(500);
    expect(body.message).toBe(
      "ConnectionManager.getConnection was called after the connection manager was closed!"
    );
  });
});
