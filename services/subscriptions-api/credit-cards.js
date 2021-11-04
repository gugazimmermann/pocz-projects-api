import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";

export const handler = async (event, context) => {
  try {
    const user = await DecodedId(event);
    const { CreditCards } = await database();
    const data = await CreditCards.findAll({
      where: { userId: user.id },
    });
    return CreateResponse(200, { data });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
