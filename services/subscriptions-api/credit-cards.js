import database from "../../libs/connection";
import CreateResponse from "../../libs/response";

export const creditCards = async (userId) => {
  try {
    const { CreditCards } = await database();
    const body = await CreditCards.findAll({ where: { userId } });
    return CreateResponse(200, { body });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
