import database from "../../libs/connection";
import CreateResponse from "../../libs/response";

export const creditCards = async ({ id: userId }) => {
  try {
    const { CreditCards } = await database();
    const data = await CreditCards.findAll({ where: { userId } });
    return CreateResponse(200, { data });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
