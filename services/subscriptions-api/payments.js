import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";

export const handler = async (event, context) => {
  try {
    const user = await DecodedId(event);
    if (user instanceof Error) return CreateResponse( user.statusCode, { message: user.message });
    const { Payments } = await database();
    const data = await Payments.findAll({
      where: { userId: user.id },
      order: [["paidDate", "DESC"]],
    });
    return CreateResponse(200, { data });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
