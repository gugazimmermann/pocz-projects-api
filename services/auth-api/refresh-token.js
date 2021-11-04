import jwt from "jsonwebtoken";
import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import config from "../../libs/jwt-config";

export const handler = async (event, context) => {
  const { refreshToken } = JSON.parse(event?.body);
  if (!refreshToken)
    return CreateResponse(400, { message: "Dados inválidos!" });
  try {
    const { RefreshToken } = await database();
    const resultData = await RefreshToken.findOne({
      where: { token: refreshToken },
    });
    if (!resultData)
      return CreateResponse(404, { message: "Refresh token não encontrado!" });
    const verifyExpiration =
      resultData.expiryDate.getTime() < new Date().getTime();
    if (verifyExpiration) {
      await RefreshToken.destroy({ where: { id: resultData.id } });
      return CreateResponse(403, {
        message: "Refresh token está expirado. Faça Login novamente.",
      });
    }
    const userId = await resultData.get("userId");
    const newAccessToken = jwt.sign({ id: userId }, config.jwtSecret, {
      expiresIn: config.jwtExpiration,
    });
    return CreateResponse(200, {
      body: {
        accessToken: newAccessToken,
        refreshToken: resultData.token,
      },
    });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
