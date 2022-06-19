import database from "../../libs/connection";
import CreateResponse from "../../libs/response";

export const count = async (tenantId) => {
  try {
    const { Places } = await database();
    const body = await Places.count({ where: { tenantId, active: true } });
    return CreateResponse(200, { body });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
