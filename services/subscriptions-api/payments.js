import database from "../../libs/connection";
import CreateResponse from "../../libs/response";

export const payments = async (userId) => {
  try {
    const { Payments } = await database();
    const body = await Payments.findAll({ where: { userId }, order: [["paidDate", "DESC"]] });
    return CreateResponse(200, { body });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
