import CreateResponse from "../../libs/response";
import { findAllInvites, invitesResultToData } from "./utils";

export const invites = async (tenantId) => {
  try {
    const resultData = await findAllInvites(tenantId);
    const data = [];
    resultData.forEach((d) => data.push(invitesResultToData(d)));
    return CreateResponse(200, { data });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
