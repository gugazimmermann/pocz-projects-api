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
    const { Payments } = await database();
    const payments = await Payments.findOne({
      where: { userId: decoded.id },
      order: [["paidDate", "DESC"]],
    });
    return CreateResponse(200, { body: payments });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, err.message);
  }
};
