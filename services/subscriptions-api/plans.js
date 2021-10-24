import database from "../../libs/connection";
import CreateResponse from "../../libs/response";

export const handler = async (event, context) => {
  try {
    const { Plans } = await database();
    const plans = await Plans.findAll();
    return CreateResponse(200, { body: plans });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, err.message);
  }
};
