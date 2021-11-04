import CreateResponse from "../../libs/response";
import DecodedId from "../../libs/decoded-id";
import { findAllInvites, invitesResultToData } from "./utils";

export const handler = async (event, context) => {
  try {
    const user = await DecodedId(event);
    const resultData = await findAllInvites(user.tenant);
    const data = [];
    if (resultData.length > 0)
      resultData.forEach((d) => data.push(invitesResultToData(d)));
    return CreateResponse(200, { data });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
