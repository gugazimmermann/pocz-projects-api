import jwt from "jsonwebtoken";
import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import config from "../../libs/jwt-config";

export const handler = async (event, context) => {
  const authorization = event.headers.Authorization;
  if (!authorization) {
    return CreateResponse(400, { message: "Autorização não encontrada!" });
  }
  const token = authorization.replace("Bearer ", "");
  const decoded = jwt.verify(token, config.jwtSecret);
  if (!decoded || !decoded.id) {
    return CreateResponse(401, { message: "Não Autorizado!" });
  }
  try {
    const { CreditCards } = await database();
    const creditCards = await CreditCards.findOne({
      where: { userId: decoded.id },
    });
    return CreateResponse(200, { body: creditCards });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, err.message);
  }
};
