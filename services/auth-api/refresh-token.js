import jwt from "jsonwebtoken";
import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import config from "./config";

export const handler = async (event, context) => {
  const body = JSON.parse(event.body);
  if (!body.refreshToken) {
    return CreateResponse(400, { message: "Dados inválidos!" });
  }
  try {
    const { RefreshToken } = await database();
    const refreshToken = await RefreshToken.findOne({
      where: { token: body.refreshToken },
    });
    if (!refreshToken) {
      return CreateResponse(404, { message: "Refresh token não encontrado!" });
    }
    const verifyExpiration = refreshToken.expiryDate.getTime() < new Date().getTime();
    if (verifyExpiration) {
      await RefreshToken.destroy({ where: { id: refreshToken.id } });
      return CreateResponse(403, {
        message: "Refresh token está expirado. Faça Login novamente.",
      });
    }
    const userId = await refreshToken.get("userId");
    const newAccessToken = jwt.sign({ id: userId }, config.jwtSecret, {
      expiresIn: config.jwtExpiration,
    });
    return CreateResponse(200, {
      body: {
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
      },
    });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, err.message);
  }
};
