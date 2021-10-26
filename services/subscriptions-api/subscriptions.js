import jwt from "jsonwebtoken";
import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import config from "../../libs/jwt-config";

export const handler = async (event, context) => {
  const authorization = event?.headers?.Authorization;
  if (!authorization) {
    return CreateResponse(400, { message: "Autorização não encontrada!" });
  }
  const token = authorization.replace("Bearer ", "");
  let decoded;
  try {
    decoded = jwt.verify(token, config.jwtSecret);
  } catch (err) {
    return CreateResponse(401, { message: "Não Autorizado!" });
  }
  try {
    const { Subscriptions } = await database();
    const subscription = await Subscriptions.findOne({
      where: { userId: decoded.id },
    });
    if (!subscription) {
      return CreateResponse(404, { message: "Assinatura não encontrada!" });
    }
    return CreateResponse(200, { subscription });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
