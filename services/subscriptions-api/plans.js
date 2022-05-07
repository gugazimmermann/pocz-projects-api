import database from "../../libs/connection";
import CreateResponse from "../../libs/response";

export const handler = async (event, context) => {
  try {
    const { Plans } = await database();
    const data = await Plans.findAll();
    return CreateResponse(200, { data });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
