import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";

export const handler = async (event, context) => {
  try {
    const user = await DecodedId(event);
    const { Subscriptions } = await database();
    const data = await Subscriptions.findOne({
      where: { userId: user.id },
    });
    if (!data)
      return CreateResponse(404, { message: "Assinatura não encontrada!" });
    return CreateResponse(200, { data });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
