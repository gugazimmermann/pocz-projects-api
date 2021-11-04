import database from "../../libs/connection";
import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";

export const handler = async (event, context) => {
  try {
    const user = await DecodedId(event);
    const { Places } = await database();
    const data = await Places.count({
      where: { tenantId: user.tenant, active: true },
    });
    return CreateResponse(200, { data });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
