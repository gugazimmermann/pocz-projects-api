import database from "../../libs/connection";
import CreateResponse from "../../libs/response";

export const subscriptions = async (userId) => {
  try {
    const { Subscriptions } = await database();
    const data = await Subscriptions.findOne({ where: { userId } });
    if (!data) return CreateResponse(404, { message: "Assinatura não encontrada!" });
    return CreateResponse(200, { data });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
