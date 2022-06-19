import CreateResponse from "../../libs/response";
import { findAllInvites, invitesResultToData } from "./utils";

export const invites = async (tenantId) => {
  try {
    const resultData = await findAllInvites(tenantId);
    const body = [];
    resultData.forEach((d) => body.push(invitesResultToData(d)));
    return CreateResponse(200, { body });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
