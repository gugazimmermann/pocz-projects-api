import CreateResponse from "../../libs/response";
import { findAll } from "../shared/profiles-utils";
import { usersResultToData } from "./utils";

export const getAll = async (tenantId, userId) => {
  try {
    const resultData = await findAll(userId, tenantId);
    const data = [];
    if (resultData.length > 0) resultData.forEach((d) => data.push(usersResultToData(d)));
    return CreateResponse(200, { data });
  } catch (err) {
    return CreateResponse(err.statusCode || 500, { message: err.message });
  }
};
