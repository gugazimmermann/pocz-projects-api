import database from "../../libs/connection";
import CreateResponse from "../../libs/response";

export const plans = async () => {
  try {
    const { Plans } = await database();
    const body = await Plans.findAll();
    return CreateResponse(200, { body });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
