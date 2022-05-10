import jwt from "jsonwebtoken";
import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import config from "../../libs/jwt-config";

export const refreshToken = async ({ refreshToken }) => {
  if (!refreshToken) return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const { RefreshToken } = await database();
    const resultData = await RefreshToken.findOne({ where: { token: refreshToken } });
    if (!resultData) return CreateResponse(404, { message: "Refresh token não encontrado!" });
    if (resultData.expiryDate.getTime() < new Date().getTime()) {
      await RefreshToken.destroy({ where: { id: resultData.id } });
      return CreateResponse(403, { message: "Refresh token está expirado. Faça Login novamente." });
    }
    const newAccessToken = jwt.sign({ id: (await resultData.get("userId")) }, config.jwtSecret, { expiresIn: config.jwtExpiration });
    return CreateResponse(200, { body: { accessToken: newAccessToken, refreshToken: resultData.token }});
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
